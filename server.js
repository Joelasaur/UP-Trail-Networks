var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");


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
	var collection = db.collection("TRAIL-4");
	console.log(typeof collection);
	// Convert from strings to isodates
	collection.find().forEach(function(time) {
		time.timestamp = new Date(time.timestamp);
		collection.save(time);
	});
}