import sys
import json
import re

def main():

    filename1 = sys.argv[1] #crunch yearly
    filename2 = sys.argv[2]
    filename3 = sys.argv[3]
    
    filenames = [filename1,filename2,filename3]

    
    
    #compare to the second line of the file and it gives you the title
    titleFindRegex = re.compile('(.*?)[,](.*)[\n]')
    
    #data file modes are 
    #0 for yearly attendance
    #1 for monthly attendance
    #2 for monthly activities
    #3 for the breakdown thing that hadeel showed
    
    
    ParkName = ""
    
    ENTRYMODE_YEAR = 0;
    ENTRYMODE_MONTHLY = 1;
    ENTRYMODE_VISITORS = 2;
    ENTRYMODE_ACTIVITY = 3;
    
    entryMode = 2;
    
    parkData = {}
    
    for filename in filenames:
        print ("Processing File: " + filename)
        with open (filename, "r") as datafile:
        
            if('Annual' in filename):
                entryMode = 0
            elif ('Recreation' in filename):
                entryMode = 1
            elif ('Summary' in filename):
                entryMode = 2
            
            line = datafile.readline()
            line = datafile.readline()
            
            #get the title of the park
            ParkName = titleFindRegex.split(line)[1]
            ParkName = ParkName.replace(" ","_")
        
            if(entryMode == ENTRYMODE_YEAR):
                #returnPacket['DataHeader'] = dataHeader
                #returnPacket['TotalVisitation'] = totalVisitation
                #returnPacket['YearlyData'] = dataDictionary
                datapack = buildYearlyAttendance(datafile)
                
                parkData['YearlyDataHeader'] = datapack['YearlyDataHeader']
                parkData['SumTotalVisitation'] = datapack['SumTotalVisitation']
                parkData['YearlyData'] =  datapack['YearlyData']
                
            if(entryMode == ENTRYMODE_MONTHLY):
                datapack = buildMonthlyAttendance(datafile)
                
                parkData['MonthlyDataHeader'] = datapack['MonthlyDataHeader']
                parkData['MonthlyData'] = datapack['MonthlyData']
                
            if(entryMode == ENTRYMODE_VISITORS):
            
                datapack = buildMonthlyActivities(datafile)
                
                parkData['ActivityDataHeader'] = datapack['ActivityDataHeader']
                parkData['ActivityData'] = datapack['ActivityData']
                
                
    parkData["ParkName"] = ParkName
    
    #print(parkData)
    #verifyPackage(parkData)
    
    outputFile = open(ParkName+".json","w")
    outputFile.write(json.dumps(parkData))
    outputFile.close()
        
    
def testRegex():

    print ("Testing regex...")
    
    
def buildYearlyAttendance(datafile):

    dataHeader = ["AnnualVisitation"]
    totalVisitation = 0
    
    dataDictionary = {}
    returnPacket = {}
    
    currentYear = ""
    cleanedInput = "" #clean input,  without quotes
    annualAttendance = ""
    totalAttendance = ""
    resultBins = []
    
    #skip past the empty lines, the header lines
    line = datafile.readline()
    line = datafile.readline()
    
    #read lines
    go = True
    while True:
    
        #read the line
        line = datafile.readline()
        
        if(len(line) > 0):
        
            while(len(line) > 0):
            
                quoteMarkIndex = line.find("\"")
                
                if(not(quoteMarkIndex == -1)):
                    cleanedInput += line[:quoteMarkIndex]
                    line = line[quoteMarkIndex+1:]
                    
                    #remove commas from the middle of numbers since they are in numbers for some reason
                    secondQuoteMarkIndex = line.find("\"")
                    interiorString = line[:secondQuoteMarkIndex]
                    
                    cleanedInput += interiorString.replace(",","").replace("\"","")
                    line = line[secondQuoteMarkIndex+1:]
                    
                else:
                    cleanedInput += line
                    line = ""
                    
                    #print(cleanedInput)
        
            #once the file read is done
            else:
                aggregateAnotherMonth = False
                
                resultBins = cleanedInput.split(',')
                
                if(len(resultBins) > 1):

                    for i in range(0,len(resultBins)):
                        if(resultBins[i] == ""):
                            resultBins[i] == 0
                                        
                    currentYear = resultBins[0]
                   
                    annualAttendance = resultBins[1]
                    totalAttendance = resultBins[2]

                    dataDictionary[currentYear] = annualAttendance.strip()
                
                    cleanedInput = ""
                
        else:
            break
            
    returnPacket['YearlyDataHeader'] = dataHeader
    returnPacket['SumTotalVisitation'] = totalAttendance
    returnPacket['YearlyData'] = dataDictionary
    return returnPacket
    
def buildMonthlyAttendance(datafile):

    dataHeader = ["1","2","3","4","5","6","7","8","9","10","11","12","AnuualTotal"]
       #skip past the empty lines, the header lines
    line = datafile.readline()
    line = datafile.readline()
    
    dataDictionary = {}
    returnPacket = {}
    monthlyTotals = []
    cleanedInput = ""
    currentYear = ""
    
    #read lines
    go = True
    while True:
    
        #read the line
        line = datafile.readline()
        
        if(len(line) > 0):
        
            while(len(line) > 0):
            
                quoteMarkIndex = line.find("\"")
                
                if(not(quoteMarkIndex == -1)):
                    cleanedInput += line[:quoteMarkIndex]
                    line = line[quoteMarkIndex+1:]
                    
                    #remove commas from the middle of numbers since they are in numbers for some reason
                    secondQuoteMarkIndex = line.find("\"")
                    interiorString = line[:secondQuoteMarkIndex]
                    
                    cleanedInput += interiorString.replace(",","").replace("\"","")
                    line = line[secondQuoteMarkIndex+1:]
                    
                    
                    
                else:
                    cleanedInput += line
                    line = ""
                    
                    #print(cleanedInput)
        
            #once the file read is done
            else:
                aggregateAnotherMonth = False
                
                resultBins = cleanedInput.split(',')
                
                if(len(resultBins) > 1):

                    for i in range(0,len(resultBins)):
                        if(resultBins[i] == ""):
                            resultBins[i] == 0
                                        
                    currentYear = resultBins[0]

                    dataDictionary[currentYear] = resultBins[1:]
                    cleanedInput = ""
                
        else:
            break
            
    returnPacket['MonthlyDataHeader'] = dataHeader
    returnPacket['MonthlyData'] = dataDictionary
    return returnPacket
    
def buildMonthlyActivities(datafile):

    dataHeader =            ["RecreationVisitors","NonRecreationVisitors","ConcessionLodging","TentCampers","RVCampers","ConcessionCamping","BackcountryCampers","MiscCampers","OvernightStays"]
    #1979       ,January    ,"2,970",0,0        ,35         ,47 ,0      ,5      ,0  ,87
    
    dataDictionary = {}
    returnPacket = {}
    activityPackage = {}
    
    currentYear = ""
    previousYear = ""
    cleanedInput = "" #clean input,  without quotes
    currentMonth = ""
    resultBins = []
    
    #skip past the empty lines, the header lines
    line = datafile.readline()
    line = datafile.readline()
    
    
    #read lines
    go = True
    while True:
    
        #read the line
        line = datafile.readline()
        
        if(len(line) > 0):
        
            while(len(line) > 0):
            
                quoteMarkIndex = line.find("\"")
                
                
                
                if(not(quoteMarkIndex == -1)):
                    cleanedInput += line[:quoteMarkIndex]
                    line = line[quoteMarkIndex+1:]
                    
                    #remove commas from the middle of numbers since they are in numbers for some reason
                    secondQuoteMarkIndex = line.find("\"")
                    interiorString = line[:secondQuoteMarkIndex]
                    
                    cleanedInput += interiorString.replace(",","").replace("\"","")
                    line = line[secondQuoteMarkIndex+1:]
                    
                else:
                    cleanedInput += line
                    line = ""
        
            #once the file read is done
            else:
                aggregateAnotherMonth = False
                
                resultBins = cleanedInput.split(',')
                
                if(len(resultBins) > 1):

                    for i in range(0,len(resultBins)):
                        if(resultBins[i] == ""):
                            resultBins[i] == 0
                                   
                    previousYear = currentYear        
                    currentYear = resultBins[0]
                    
                    #if we changed years, clear the activity package
                    if(not(previousYear == currentYear)): 
                        activityPackage = {}

                    currentMonth = resultBins[1]

                    massagedVisitorCounts = resultBins[2:]
                    massagedVisitorCounts = massagedVisitorCounts[:9]
                    
                    activityPackage[lookupMonthByName(currentMonth)] = massagedVisitorCounts

                    dataDictionary[currentYear] = activityPackage
                
                    cleanedInput = ""
                
        else:
            break

    returnPacket['ActivityDataHeader'] = dataHeader
    returnPacket['ActivityData'] = dataDictionary
    return returnPacket
    #index 2 - 10
    
def verifyPackage(dataPackage):
    print("Verification of data package has started")
    print("----------------------------------------")
    print(dataPackage["ParkName"])
    verifyActivity(dataPackage)
    verifyMonthly(dataPackage)
    verifyYearly(dataPackage)
    
    
def verifyActivity(dataPackage):
    print("----------------------------------------")
    print("ActivityData")
    print("----------------------------------------")
    print(dataPackage["ActivityDataHeader"])
    print("----------------------------------------")
    print("-ActivityData")
    for year in dataPackage['ActivityData']:
        print("---["+year+"]")
        for month in dataPackage['ActivityData'][year]:
            print("------["+str(month)+"]")
            prepstring = ("|".join(str(x) for x in dataPackage['ActivityData'][year][month]))
            
            print ("--------"+prepstring)
            
def verifyMonthly(dataPackage):
    print("----------------------------------------")
    print("MonthlyData")
    print("----------------------------------------")
    print(dataPackage["MonthlyDataHeader"])
    print("----------------------------------------")
    for element in dataPackage["MonthlyData"]:
        print ("[" + element + "]")
        prepstring = ("|".join(str(x) for x in dataPackage['MonthlyData'][element]))
        print ("--------"+prepstring)
        
        
def verifyYearly(dataPackage):
    print("----------------------------------------")
    print("YearlyData")
    print("----------------------------------------")
    print(dataPackage["YearlyDataHeader"])
    print("----------------------------------------")
    print(dataPackage["SumTotalVisitation"])
    print("----------------------------------------")
    for element in dataPackage["YearlyData"]:
        print ("[" + element + "][" + dataPackage["YearlyData"][element] + "]")
    
def lookupMonthByName(name): 
    if(name.lower() == "january"):
        return 1
    if(name.lower() == "february"):
        return 2
    if(name.lower() == "march"):
        return 3
    if(name.lower() == "april"):
        return 4
    if(name.lower() == "may"):
        return 5
    if(name.lower() == "june"):
        return 6
    if(name.lower() == "july"):
        return 7
    if(name.lower() == "august"):
        return 8
    if(name.lower() == "september"):
        return 9
    if(name.lower() == "october"):
        return 10
    if(name.lower() == "november"):
        return 11
    if(name.lower() == "december"):
        return 12
    
            
if __name__ == "__main__":
    main()
    
