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

MongoClient.connect(url, function(err, database) {
	assert.equal(null, err);
	console.log("Connected succesfully to server");
	const db = database.db("mqttrails");

	sanitize_timestamps(db, function() {
		db.close();
	});
});

var sanitize_timestamps = function(db, callback) {
	// Get the Trail collections
	//TODO: Get a list of all trail nodes from the master csv and cycle through each mongo collection
	var collection = db.collection("TRAIL-4");
	console.log(typeof collection);
	// Convert from strings to isodates
	collection.find().forEach(function(time) {
		time.timestamp = new Date(time.timestamp);
		collection.save(time);
	});
}

io.on("connection", function(socket){
	var test = "testing";
	socket.on("sendGraph", function(){
		socket.emit('buildGraph', test);
	});
});

server.listen(80, function() {
	console.log("server is listening on 80")
});
