from datetime import datetime
from os import path, walk
import json

class Converter(object):
	trail_nodes = []
	txt_dir = ""
	json_path = ""

	def __init__(self, txt_dir, json_path):
		self.txt_dir = txt_dir
		self.json_path = json_path

	@staticmethod
	def str_to_datetime(rawstr):
		trimleft = 3
		if not (rawstr[1] == " "):
			trimleft = 4
			if not (rawstr[2] == " "):
				trimleft = 5
		rawstr = rawstr[trimleft:]
		rawstr = rawstr[:-2]
		return datetime.strptime(rawstr, "%H:%M:%S %m/%d/%y").isoformat(" ")

	def getTimestamps(self, txt_path):
		timestamps = []
		with open(txt_path, "r") as file:
			#Read and strip all lines of the file
			timestamps = [line.rstrip(' \r\n') for line in file]
		timestamps = [self.str_to_datetime(time) for time in timestamps]
		return timestamps

	def convert_to_json(self):	
		#Walk through all txt files in the directory and add them to the dictionary
		for dirpath, dirnames, filenames in walk(self.txt_dir):
			for file in filenames:
				#Add this file and its timestamps to the dictionary
				#trail_nodes[TRAIL-#.TXT] = [converted timestamp list]
				location_dict = {}
				location_dict[path.basename(file)] = self.getTimestamps(self.txt_dir + file)
				self.trail_nodes.append(location_dict)

		#Convert dictionary to json and write the file
		with open (self.json_path, "wb") as outfile:
			json.dump(self.trail_nodes, outfile)


if __name__ == '__main__':
	conv = Converter("data/", "output.json")
	conv.convert_to_json()