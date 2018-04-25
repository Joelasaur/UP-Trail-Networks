# UP-Trail-Networks
Analyzes trail network data in the UP gathered from 20+ different nodes.


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