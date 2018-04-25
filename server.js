var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var Chart = require('chart.js');
var express = require("express");
var app = express();

var http = require("http");
var server = http.Server(app);
var socketio = require("socket.io");
var io = socketio(server);

app.use(express.static("pub"));

var url = "mongodb://localhost:27017/mqttrails";
var port = 4009;

MongoClient.connect(url, function(err, database) {
	assert.equal(null, err);
	console.log("Connected succesfully to server");
	const db = database.db("mqttrails");

	sanitize_timestamps(db, function() {
	});
});

var sanitize_timestamps = function(db, callback) {
	// Get the Trail nodes
	var collection = db.collection("nodes");
	// Convert from strings to isodates
	collection.find().forEach(function(doc) {
		doc.timestamp = new Date(doc.timestamp);
		collection.save(doc);
	});
}

var getAllTrailData = function(db, startDate, endDate, callback) {
	var collection = db.collection("nodes");
	collection.aggregate([
		{
			"$match": {
				"timestamp": {
				"$gte": new Date(startDate), 
				"$lte": new Date(endDate)
				}
			}
		},
		{
			"$group": {
				"_id": "$node",
				"count": {"$sum": 1	}
			}
		}
	]).toArray(function(err, docs) {
		assert.equal(null, err);
		console.log(docs);
		callback(docs);
	});
}

io.on("connection", function(socket){
	MongoClient.connect(url, function(err, database) {
		assert.equal(null, err);
		console.log("Connected succesfully to MongoDB");
		const db = database.db("mqttrails");
		
		socket.on("sendData", function(startDate, endDate){
			getAllTrailData(db, startDate, endDate, function(trailData) {
				trailDict = {};
				for (var i in trailData){
					trailDict[trailData[i]["_id"]] = trailData[i]["count"];
				}
				console.log(trailDict);
				socket.emit("receiveData", trailDict);
			});
		});
	});
});

server.listen(port, function() {
	console.log("server is listening on " + port);
});
