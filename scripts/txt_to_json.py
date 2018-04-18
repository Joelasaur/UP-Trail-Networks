from datetime import datetime
from os import path, walk
import json
import argparse
from pymongo import MongoClient, UpdateOne
from pprint import pprint

DB_URL = "mongodb://localhost:27017/"

class Converter(object):
	trail_nodes = []
	txt_dir = ""
	json_path = ""
	db_name = ""

	def __init__(self, txt_dir, json_path, db_name):
		self.txt_dir = txt_dir
		self.json_path = json_path
		self.db_name = db_name

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
				location_dict = {}
				location_dict["node"] = path.basename(file)[:-4]
				location_dict["timestamps"] = self.getTimestamps(self.txt_dir + file)
				self.trail_nodes.append(location_dict)

	def write_to_db(self):
		client = MongoClient(DB_URL + self.db_name)
		db = client[self.db_name]
		for node in self.trail_nodes:
			location_name = node["node"]
			times = node["timestamps"]
			last_modified_result = db[location_name].update_one({"node": location_name}, { "$set": {"last_modified": datetime.utcnow().isoformat(" ")} }, upsert = True)
			timestamp_result = db[location_name].insert_many([{"timestamp": time} for time in times])
			
			pprint(last_modified_result.raw_result)
			pprint("Timestamps insertion acknowledged: " + str(timestamp_result.acknowledged))

if __name__ == '__main__':
	conv = Converter("data/", "output.json", "mqttrails")
	conv.convert_to_json()
	conv.write_to_db()