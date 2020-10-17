var express = require('express');
var router = express.Router();
var mongo_lib = require("./../mongo_lib");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


/*
var tasks = []
MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err,db) 
{
	console.log("hiting database again");
	var dbo = db.db("mydb");
	dbo.collection("tasks").find({}).sort({position:1}).toArray(function(err,res)
	{
		if (err) throw err;
		console.log("indexRouter");
		console.log(res);
		tasks = res;
		console.log(tasks[0].children);
		db.close();
	});
});
*/

/* GET home page. */
router.get('/', async function(req, res, next) {
	console.log(req);
	var tasks = await mongo_lib.returnTasks();
  	res.render('index', { title: 'Planner', tasks: tasks});
});

router.post('/addTask', function(req, res, next) {
	var task = {name: req.body.name, description: req.body.description};
	mongo_lib.addTask(task);
  	res.redirect('/');
});

router.post('/addSubTask', function(req, res, next) {
	//var child = JSON.parse(req.body.child);
	var child = {name: req.body.name, description: req.body.description};
	mongo_lib.addSubTask(req.body.parent,child);
  res.redirect('/');
});

router.post('/deleteSubTask', function(req, res, next) {
	var child = JSON.parse(req.body.child);
	mongo_lib.deleteSubTask(req.body.parent,child);
  res.redirect('/');
});

router.post('/deleteTask', function(req, res, next) {
	mongo_lib.deleteTask(req.body.task_id);
  res.redirect('/');
});

module.exports = router;
