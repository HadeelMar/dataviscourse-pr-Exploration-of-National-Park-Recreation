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
    
    
    

    
def testRegex():

    print ("Testing regex...")
    


if __name__ == "__main__":
    main()
    
