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
		db.close();
	});
});

var sanitize_timestamps = function(db, callback) {
	// Get the Trail collections
	db.listCollections().toArray(function(err, collections) {
		for (var i = 0; i < collections.length; i++) {
			var dict = collections[i];
			var node_name = String(dict["name"]);
			db.collection(node_name).find().forEach(function(time) {
				time.timestamp = new Date(time.timestamp);
				db.collection(node_name).save(time);			
			});
		}
	});
}

io.on("connection", function(socket){
	var test = "testing";
	socket.on("sendGraph", function(){
		socket.emit('buildGraph', test);
	});
});

server.listen(port, function() {
	console.log("server is listening on " + port);
});
