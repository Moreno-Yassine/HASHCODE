#!/usr/bin/env python 


TableOccupation = []
ServerList = []
U = 0
M = 0 

def parsefile(filename): 
	with open(filename,'r') as input_file:
		lineOne = input_file.readline()
		lineOne = lineOne.split()
		U = int(lineOne[2])
		M = int(lineOne[4])

		for i in range(U): 
			lineOccupation =  input_file.readline()


		for i in range(M): 
			lineServer =  input_file.readline()
			lineServer = lineServer.split()
			tupleServer = (lineServer[0], lineServer[1])
			ServerList.append(tupleServer)


if __name__ == "__main__": 
	parsefile("test.in")

	print U
	print M
	print ServerList