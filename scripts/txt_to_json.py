from datetime import datetime
from os import path, walk
import sys
import json
import argparse
from pymongo import MongoClient, UpdateOne
from pprint import pprint
import csv

DB_URL = "mongodb://localhost:27017/"
DB_NAME = "mqttrails"
TIMESTAMP_PATH = "data/timestamps/"
LATLONGS_PATH = "data/node_locations/SensorLocations.csv"

class Converter(object):
	trail_nodes = []
	txt_dir = ""
	latlongs_path = ""
	latlongs_data = {}
	db_name = ""


	def __init__(self, txt_dir, latlongs_path, db_name):
		self.txt_dir = txt_dir
		self.latlongs_path = latlongs_path
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
		#Apparently MongoDB eats this as a string instead of a date, 
		#so date conversion must be done after it's been added to the database.
		return datetime.strptime(rawstr, "%H:%M:%S %m/%d/%y").isoformat(" ")

	#returns a list of timestamp strings
	def get_timestamps(self, txt_path):
		timestamps = []
		with open(txt_path, "r") as file:
			#Read and strip all lines of the file
			timestamps = [line.rstrip(' \r\n') for line in file]
		timestamps = [self.str_to_datetime(time) for time in timestamps]
		return timestamps

	def get_latlongs(self):
		#Get lat long and node name data
		with open(self.latlongs_path, newline = '') as csvfile: 
			reader = csv.reader(csvfile)
			for row in reader:
				lat, lng, node_name = row
				self.latlongs_data[node_name] = (lat, lng)
				self.latlongs_data.pop("Node_Name", 0)
				

	def convert_to_json(self):	
		#Walk through all txt files in the directory and add them to the dictionary
		for dirpath, dirnames, filenames in walk(self.txt_dir):
			for file in filenames:
				#Add this file's timestamps and lat long data into the dictionary
				location_dict = {}
				node_name = path.basename(file)[:-4]
				location_dict["node_name"] = node_name
				location_dict["timestamps"] = self.get_timestamps(self.txt_dir + file)
				self.trail_nodes.append(location_dict)

	def write_to_db(self):
		client = MongoClient(DB_URL + self.db_name)
		db = client[self.db_name]
		
		#Insert Latitudes, Longitudes, and Timestamp data
		for node in self.trail_nodes:
			node_name = node["node_name"]
			times = node["timestamps"]
			db_input = []
			for time in times:
				db_input.append({
					"timestamp": time, 
					"latitude": self.latlongs_data[node_name][0],
					"longitude": self.latlongs_data[node_name][1],
					"node": node_name
				})
			timestamp_result = db["nodes"].insert_many(db_input)
			
		pprint("Timestamps insertion acknowledged: " + str(timestamp_result.acknowledged))

if __name__ == '__main__':
	python_path = sys.path[0] + "/"
	conv = Converter(python_path + TIMESTAMP_PATH, python_path + LATLONGS_PATH, DB_NAME)
	conv.get_latlongs()
	print (conv.latlongs_data)
	conv.convert_to_json()
	conv.write_to_db()
	sys.stdout.flush()