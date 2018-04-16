var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");


var url = "mongodb://localhost:27017/mqttrails";

MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected succesfully to server");
	var dbobj = db.db("mydb");

	dbobj.createCollection("documents", function(err, res){
		assert.equal(null, err);
		console.log("Collection created!");
		db.close();
	});
	insertDocuments(db, function() {
		db.close();
	});
});

var insertDocuments = function(db, callback) {
	var dbobj = db.db("mydb");
	// Get the documents collection
	var collection = dbobj.collection('documents');
	// Insert some documents
	collection.insertMany([
	{a : 1}, {a : 2}, {a : 3}
	], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
	console.log("Inserted 3 documents into the collection");
	callback(result);
	});
}