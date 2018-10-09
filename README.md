# UP-Trail-Networks
Analyzes trail network data in the UP gathered from 20+ different nodes.

Around the Marquette area Dr. Joshua Thompson of the Math and CS Department at Northern Michigan Univ. has placed 28 Bluetooth-enabled motion sensors. These sensors will be used to track the usage of the Marquette City trail network. Each sensor has a known latitude and longitude, and builds a text file that lists a time stamp for every time the motion sensor detects something. There is an Android application that users must use to manually travel to each node and collect these files.

## Heatmap

The Heatmap page will show a Google Maps coverage map of the motion sensor locations. The map will show the 'heat', or number of hits compared to other sensors, for each location. The Heatmap page includes the ability to toggle the heatmap off and on, change the radius of the 'heat', and select a timeframe for the data. The calendar option allows a user to select a start date and end date they would like to see the heatmap of. The map also allows an user to zoom in on locations and look at it either as a Satellite or as a Street Map.

## Graph

The graph page will show a bar graph of all the 'hits' for each motion sensor. A hit being anytime someone walked by the sensor triggering it to store data. Like the Heatmap page a data selector accompanies to Graph allowing a user to look at the graph for a particular range of dates.

Future additions to this page will include allowing a user to select the specific trail sensor they want and showing a 24-hour bar graph of all the hits for that date range.

## Upload

The Upload page allows anyone to upload trail data gathered from the sensors. It will allow single file or multiple file upload. The server will only allow files to be uploaded if they are plain text files and have the correct file name template. Once files are uploaded the server will store it in a 'Timestamps' folder and 'Backup' folder. The server will tag each folder with an ID number and store it as-is in the Backup folder. The files in the Timestamp folder will be put through a Python script to sanitize the data into proper form to be added to the database.

MongoDB:

Install & Run
	https://docs.mongodb.com/manual/tutorial/install-mongodb-on-linux/
	sudo mongod
	If that doesn't work, change permissions to the data directory: https://stackoverflow.com/questions/42446931/mongodb-exception-in-initandlisten-20-attempted-to-create-a-lock-file-on-a-rea
	Keep an instance of mongod running in a separate terminal

	If mongo complains that it can't start because the address is already in use, do this command:
		sudo killall -15 mongod
	How to Import JSON
	mongoimport --db TrailNetwork --collection Timestamps --file scripts/output.json --jsonArray


How to Run Unit Tests:
	python3.6 -m pytest tests/

Sources:

Bootstrap template from W3Schools
	https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_temp_webpage&stacked=h

Heatmap template and CSS from Google
	https://developers.google.com/maps/documentation/javascript/examples/layer-heatmap

MongoDB Aggregation through NodeJS
	http://mongodb.github.io/node-mongodb-native/2.0/tutorials/aggregation/

Nodejs Driver Docs
	http://mongodb.github.io/node-mongodb-native/2.2/api/index.html

MongoDB Docs
	https://docs.mongodb.com/