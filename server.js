var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var Chart = require('chart.js');
var express = require("express"),
	upload = require("express-fileupload");
var app = express();

var http = require("http");
var server = http.Server(app);
var socketio = require("socket.io");
var io = socketio(server);

var spawn = require("child_process").spawn;

app.use(express.static("pub"));
app.use(upload())

var url = "mongodb://localhost:27017/mqttrails";
var port = 4009;

var getAllTrailData = function(db, startDate, endDate, callback) {
	var collection = db.collection("nodes");
	console.log("Start date: " + startDate);
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
				"_id": {"node_name": "$node", "lat": "$latitude", "long": "$longitude"},
				"count": {"$sum": 1	}
			}
		}
	]).toArray(function(err, docs) {
		assert.equal(null, err);
		console.log(docs);
		callback(docs);
	});
}

var addFilesToDB = function() {
	var pythonProcess = spawn("python3", ["scripts/txt_to_json.py"])
	pythonProcess.stdout.on("data", function(data){
		console.log("Successfully imported timestamp data.");
	});
}

io.on("connection", function(socket){

	socket.emit("onconnected");
	socket.on("getAllTrailData", function(startDate, endDate) {
		MongoClient.connect(url, function(err, database) {
			assert.equal(null, err);
			console.log("Connected succesfully to MongoDB");
			const db = database.db("mqttrails");
			getAllTrailData(db, startDate, endDate, function(trailData) {
				socket.emit("receiveData", trailData);
				database.close();
			});
		});
	});
});

app.get("/upload", function(req,res){
	res.sendfile(__dirname+"/upload.html")
})

app.post("/upload", function(req,res){
	console.log(req.files.filename[0]);
	if(req.files.filename[0]){
		for( i = 0; i < req.files.filename.length; i++){
			var file = req.files.filename[i],
				filename = file.name,
				type = file.mimetype;
			if(type == 'text/plain'){
				file.mv("./scripts/data/timestamps/" + filename, function(err){
					if(err){
						console.log(err);
						res.send("error occured")
					}

				})
			}
			else{
				res.send("Wrong type!")
			}
		}
	}
	addFilesToDB();
	res.send("done");
});
	


server.listen(port, function() {
	console.log("server is listening on " + port);
});
