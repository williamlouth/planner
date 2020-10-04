var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err,db) 
{
	if (err) throw err;
	var dbo = db.db("mydb");
	var myobj = {name: "Company inc", address: "1 way" };

	dbo.collection("customers").find({}).toArray(function(err,res)
		{
			if (err) throw err;
			console.log(res);
			db.close();
		});
	/*
	// adding a document
	dbo.collection("customers").insertOne(myobj, function(err,res)
		{
			if (err) throw err;
			console.log("Added 1 doc");
			db.close();
		});
	*/
	/*
	// adding a collection
	dbo.createCollection("customers", function(err,res)
		{
			if (err) throw err;
			console.log("Collection created");
			db.close();
		});
	console.log("Database created");
	*/
});
