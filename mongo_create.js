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


async function delete_child_task(child)
{
	const db = await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
	
		var dbo = db.db("mydb");

		var par = await dbo.collection("tasks").findOne({});

		dbo.collection("tasks").updateOne({_id:par["_id"]}, { $pull: {children: child} } , function(err,added)
			{
				if (err) throw err;
				db.close();
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
		await dbo.collection("tasks").updateOne({_id:par["_id"]}, { $push: {children: child} } , function(err,added)
			{
				if (err) throw err;
				//console.log(added);
				db.close();
			});
}

//drop_tasks();
//add_tasks();
var tasks = [
    { name: 't1', description: 'Highway 1', position: 0, children: []},
    { name: 't2', description: 'Highway 2', position: 1, children: []},
  ];
//add_many_tasks(tasks);

var task = { name: 't0a', description: 'Highway 1a' };
//add_child_task(task);
//task = { name: 't1a', description: 'Highway 1a'};
//add_child_task(task);
//task = { name: 't2a', description: 'Highway 1a'};
//add_child_task(task);

//delete_child_task(task);
//add_task(task);
print_tasks();
