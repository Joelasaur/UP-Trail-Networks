











db.nodes.find({"timestamp": {"$gte": new Date("2017-11-26"), "$lte": new Date("2017-12-11")}}, {latitude:0, longitude:0})



//getAllTrailData
db.nodes.aggregate([
{
	"$match": {
		"timestamp": {
			"$gte": new Date("2017-11-26"), 
			"$lte": new Date("2017-12-11")
		}
	}
},
{
	"$group": {
		"_id": {"node_name": "$node"},
		"count": {"$sum": 1	}
	}
}])

//getHeatMapData
db.nodes.aggregate([
{
	"$match": {
		"timestamp": {
			"$gte": new Date("2017-11-26"), 
			"$lte": new Date("2017-12-11")
		}
	}
},
{
	"$group": {
		"_id": {"node_name": "$node", "lat": "$latitude", "long": "$longitude"},
		"count": {"$sum": 1	}
	}
}])








