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
                parkData['YearlyTotalVisitation'] = datapack['YearlyTotalVisitation']
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
        #if (entryMode == 0):
        #    verifyYear(parkData)
        #else if (entryMode == 1):
        #    verifyMonthly(parkData)
        #else if(entryMode == 2):
    #verifyPackage(parkData)
    
    
    
    outputFile = open(ParkName+".json","w")
    outputFile.write(json.dumps(parkData))
    outputFile.close()
        
    
def testRegex():

    print ("Testing regex...")
    

def buildYearlyAttendance(datafile):

    yearGrabber = re.compile('(.*)[,]["](.*)["][,]["](.*)["][\n]')

    dataHeader = ["Year","AnnualVisitation"]
    totalVisitation = 0
    
    dataDictionary = {}
    returnPacket = {}
    
    #skip past the empty lines, the header lines
    line = datafile.readline()
    line = datafile.readline()

    totalVisitsCounted = False
    
    while True:
    
        #read the line
        line = datafile.readline()

        #split the contents into bins
        match = yearGrabber.match(line)
        #print(match)
        
        if(match):
            bins = yearGrabber.split(line)
            
            if(not(totalVisitsCounted)):
                totalVisitation = int(bins[3].replace(",",""))
                totalVisitsCounted = True
                
            dataDictionary[bins[1]] = int(bins[2].replace(",",""))
        else:
            break

    returnPacket['YearlyDataHeader'] = dataHeader
    returnPacket['YearlyTotalVisitation'] = totalVisitation
    returnPacket['YearlyData'] = dataDictionary
    
    return returnPacket
    
def buildMonthlyAttendance(datafile):

    monthGrabber = re.compile('(.{4})[,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][\n]')
    
    yearIdentifier = re.compile('(.{4})')

    dataHeader = ["1","2","3","4","5","6","7","8","9","10","11","12","AnuualTotal"]
    
    dataDictionary = {}
    returnPacket = {}
    
    #skip past the empty lines, the header lines
    line = datafile.readline()
    line = datafile.readline()

    
    while True:
    
        #read the line
        line = datafile.readline()

        #split the contents into bins
        year = yearIdentifier.match(line)
        if(year):
            year = year.group()
        
            if(not(year == "2015")):
                match = monthGrabber.match(line)
                if(match):
                    bins = monthGrabber.split(line)
                    
                    #print(bins)
                        
                    dataDictionary[bins[1]] = [int(bins[2].replace(",","")),int(bins[3].replace(",","")),int(bins[4].replace(",","")),int(bins[5].replace(",","")),int(bins[6].replace(",","")),int(bins[7].replace(",","")),int(bins[8].replace(",","")),int(bins[9].replace(",","")),int(bins[10].replace(",","")),int(bins[11].replace(",","")),int(bins[12].replace(",","")),int(bins[13].replace(",","")),int(bins[14].replace(",",""))]
                else:
                    break
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
    
    
def verifyActivity(dataPackage):
    print("----------------------------------------")
    print("ActivityData")
    print("----------------------------------------")
    for element in dataPackage["ActivityDataHeader"]:
        print ("[" + element + "]")
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
    for element in dataPackage["MonthlyDataHeader"]:
        print ("[" + element + "]")
    print("----------------------------------------")
    for element in dataPackage["MonthlyData"]:
        print ("[" + element + "]")
        prepstring = ("|".join(str(x) for x in dataPackage['MonthlyData'][element]))
        print ("--------"+prepstring)
    
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
    
