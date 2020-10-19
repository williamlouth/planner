var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var ObjectId = require("mongodb").ObjectId;

async function addSubTask(parent_id,child)
{
	const db = await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
	var dbo = db.db("mydb");
	
	var add = await dbo.collection("tasks").updateOne({_id:ObjectId(parent_id)}, { $push: {"children": child} } );

}

async function addTask(task)
{
	const db = await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
	var dbo = db.db("mydb");

	var pos = await dbo.collection("tasks").countDocuments();
	console.log("addTask");
	console.log(task);

	var completeTask = task;

	completeTask.position = pos;
	completeTask.children = [];
	
	var add = await dbo.collection("tasks").insertOne(completeTask);

}

async function deleteTask(task_id)
{
	const db = await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
	var dbo = db.db("mydb");

	var pos = await dbo.collection("tasks").findOne({_id:ObjectId(task_id)},{"position":1});

	console.log("delTask");
	console.log(pos);
	var query = {position: {$gt: pos.position} };
	var upd = {$inc: {position: -1} };
	var update = await dbo.collection("tasks").updateMany(query,upd);

	console.log(query);
	console.log(upd);

	//var completeTask = task;

	//completeTask.position = pos;
	//completeTask.children = [];

	/*
	var th = await dbo.collection("tasks").find({}).toArray(function(err,res)
		{
			if (err) throw err;
			console.log(res);
			db.close();
		});
		*/
	
	var del = await dbo.collection("tasks").deleteOne({_id:ObjectId(task_id)});

}

async function deleteSubTask(parent_id,child)
{
	const db = await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
	var dbo = db.db("mydb");
	
	var del = await dbo.collection("tasks").updateOne({_id:ObjectId(parent_id)}, { $pull: {"children": child} } );

	/*
	var t = await dbo.collection("tasks").findOne({position:1});

	dbo.collection("tasks").find({}).toArray(function(err,res)
		{
			if (err) throw err;
			console.log(res);
			db.close();
		});
		*/
}

async function returnTasks(user_id)
{

	
	var db = await  MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
	var dbo = db.db("mydb");
	var query = { user_id: user_id };
	var tasks =await dbo.collection("tasks").find(query).sort({position:1}).toArray();
	return tasks;
}

module.exports = { deleteSubTask,addSubTask,addTask,deleteTask,returnTasks  }
