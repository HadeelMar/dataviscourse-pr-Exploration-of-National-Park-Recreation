import os
import subprocess

path = os.path.dirname(os.path.realpath(__file__))+"\\"

directories = os.listdir(path)
subdirs = []

for x in directories:
    if(os.path.isdir(x)):
        subdirs.append(x)

fileone = ""
filetwo = ""
filethree = ""
        
for x in subdirs:
    subdirPath = path + x +"\\"
    contents = os.listdir(subdirPath)
    
    fileone = contents[0]
    filetwo = contents[1]
    filethree = contents[2]
    
    subprocess.call(["python","dataeater.py", x +"\\"+fileone, x +"\\"+filetwo, x +"\\"+filethree])