var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

function drop_tasks(){	
	MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err,db) 
	{
		if (err) throw err;
		var dbo = db.db("mydb");
		dbo.collection("tasks").drop(function(err, delOK)
		{
	    		if (err) throw err;
	    		if (delOK) console.log("Collection deleted");
	    		db.close();
	  	});
	
	});
}

function add_tasks(){
	MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err,db) 
	{
		var dbo = db.db("mydb");
		dbo.createCollection("tasks", function(err,res)
		{
			if (err) throw err;
			console.log("Collection created");
			db.close();
		});
	});
}


function add_task(task){
	MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err,db) 
	{
		var dbo = db.db("mydb");
		dbo.collection("tasks").insertOne(task, function(err,res)
		{
			if (err) throw err;
			console.log("Added 1 doc");
			db.close();
		});
	});
}

function add_many_tasks(tasks)
{	MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true},function(err, db) {
  	if (err) throw err;
  		var dbo = db.db("mydb");
  		dbo.collection("tasks").insertMany(tasks, function(err, res) 
		{
			if (err) throw err;
  		  	console.log("Number of documents inserted: " + res.insertedCount);
  		  	db.close();
  		});
	});
}

function print_tasks(){
	MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err,db) 
	{
		var dbo = db.db("mydb");
		dbo.collection("tasks").find({}).toArray(function(err,res)
		{
			if (err) throw err;
			console.log(res);
			db.close();
		});
	});
}


async function add_child_task(child)
{
	const db = await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
	
		var dbo = db.db("mydb");

		var par = await dbo.collection("tasks").findOne({});
	/*
			{
				if (err) throw err;
				console.log(res);
				par = res["_id"];
				console.log(par);
			});
			*/
		console.log("hi");
		console.log(par);
		console.log(par["_id"]);
		console.log(child);
		console.log("end");
		//dbo.collection("tasks").updateOne({_id:par}, { $push: {children: child} } , function(err,added)
		dbo.collection("tasks").updateOne({_id:par["_id"]}, { $push: {children: child} } , function(err,added)
			{
				if (err) throw err;
				//console.log(added);
				db.close();
			});
}

//drop_tasks();
//add_tasks();
var tasks = [
    { name: 't1', description: 'Highway 1', position: 1, children: []},
    { name: 't2', description: 'Highway 2', position: 2, children: []},
  ];
//add_many_tasks(tasks);

var task = { name: 't1a', description: 'Highway 1a', position: 1};
//add_child_task(task);
//add_task(task);
print_tasks();
