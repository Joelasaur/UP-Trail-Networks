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
var csvFilePath = "scripts/data/node_locations/SensorLocations.csv"
var csv = require("csvtojson");
var port = 4009;
var id = 0;

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
	console.log("Adding files to db...");
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

	socket.on("getLatLongData", function() {
		var latLongs = [];
		csv()
		.fromFile(csvFilePath)
		.on("json", function(jsonObj){
			latLongs.push({"lat": jsonObj.Latitude, "long": jsonObj.Longitude});
		})
		.on("done", function(err) {
			assert.equal(null, err);
			socket.emit("sendLatLongJson", latLongs);
			console.log("Sent lat long data to client");
		})
	});
});

app.get("/upload", function(req,res){
	res.sendfile(__dirname+"/upload.html")
})

var trailName = "TRAIL-"
app.post("/upload", function(req,res){
	//If there are files to upload
	if(req.files.filename[0]){
		for( i = 0; i < req.files.filename.length; i++){
			++id;
			var file = req.files.filename[i],
				filename = file.name,
				type = file.mimetype;
			if(type == 'text/plain' && filename.indexOf(trailName) >= 0){
				file.mv("./scripts/data/timestamps/" + filename, function(err){
					if(err){
						console.log(err);
						res.send("error occured")
					}

				})
				file.mv("./scripts/data/backup/" + "ID" + id + "-" + filename, function(err){
					if(err){
						console.log(err);
						res.send("error occured")
					}

				})
			}
			else{
				res.send("Wrong type or File Name incorrect")
			}
		}
		addFilesToDB();
		res.redirect('/upload_successful.html');
	}
	else if(req.files){
		++id;
		var file = req.files.filename,
			filename = file.name,
			type = file.mimetype;
		if(type == 'text/plain' && filename.indexOf(trailName) >= 0){
			file.mv("./scripts/data/timestamps/" + filename, function(err){
				if(err){
					console.log(err);
					res.send("error occured")
				}

			})
			file.mv("./scripts/data/backup/" + "ID" + id + "-" + filename, function(err){
				if(err){
					console.log(err);
					res.send("error occured")
				}

			})
		}
		else{
			res.send("Wrong type or Final Name incorrect")
		}
		addFilesToDB();
		res.redirect('/upload_successful.html');
	}
	else{
		res.send("Error on uploading");
	}
});



server.listen(port, function() {
	console.log("server is listening on " + port);
});
