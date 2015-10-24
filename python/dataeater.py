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
    
    entryMode = 0;
    
    parkData = []
    
    with open (filename, "r") as datafile:
        
        line = datafile.readline()
        line = datafile.readline()
        
        #get the title of the park
        ParkName = titleFindRegex.split(line)[1]
    
        if(entryMode == ENTRYMODE_YEAR):
            parkData = buildYearlyAttendance(datafile)
            
            
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
        print(match)
        
        if(match):
            bins = yearGrabber.split(line)
            year = bins[1]
            visits = bins[2].replace(",","")
            annual = bins[3].replace(",","")
            
            if(not(totalVisitsCounted)):
                totalVisitation = int(annual)
                totalVisitsCounted = True
                
            dataDictionary[year] = int(visits)
        else:
            break

    returnPacket['dataHeader'] = dataHeader
    returnPacket['totalVisitation'] = totalVisitation
    returnPacket['YearlyData'] = dataDictionary
    
    return returnPacket

if __name__ == "__main__":
    main()
    
