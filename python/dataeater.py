import sys
import json
import re

def main():

    filename = sys.argv[1]

    print ("Processing File: " + filename)
    
    #compare to the second line of the file and it gives you the title
    titleFindRegex = re.compile('(.*)[,](.*)[\n]')
    
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
    
    entryMode = 1;
    
    parkData = []
    
    with open (filename, "r") as datafile:
        
        line = datafile.readline()
        line = datafile.readline()
        
        #get the title of the park
        ParkName = titleFindRegex.split(line)[1]
    
        if(entryMode == ENTRYMODE_YEAR):
            parkData = buildYearlyAttendance(datafile)
            
        if(entryMode == ENTRYMODE_MONTHLY):
            parkData = buildMonthlyAttendance(datafile)
            
            
    parkData["ParkName"] = ParkName
    
    print (parkData)
    
    
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

    returnPacket['dataHeader'] = dataHeader
    returnPacket['totalVisitation'] = totalVisitation
    returnPacket['YearlyData'] = dataDictionary
    
    return returnPacket
    
def buildMonthlyAttendance(datafile):

    monthGrabber = re.compile('(.{4})[,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][,]["](.*)["][\n]')
    
    yearIdentifier = re.compile('(.{4})')

    dataHeader = ["Year","1","2","3","4","5","6","7","8","9","10","11","12","AnuualTotal"]
    
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

    returnPacket['dataHeader'] = dataHeader
    returnPacket['MonthlyData'] = dataDictionary
    
    return returnPacket

if __name__ == "__main__":
    main()
    
