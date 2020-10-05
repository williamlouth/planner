var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


var tasks = []
MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err,db) 
{
	var dbo = db.db("mydb");
	dbo.collection("tasks").find({}).toArray(function(err,res)
	{
		if (err) throw err;
		console.log(res);
		tasks = res;
		db.close();
	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', tasks: tasks});
});

router.post('/addTask', function(req, res, next) {
	console.log(res);
  res.redirect('/');
});

router.post('/addSubTask', function(req, res, next) {
	console.log(res);
  res.redirect('/');
});

router.post('/deleteSubTask', function(req, res, next) {
	//console.log(req);
	console.log(req.body.child);
	console.log(req.body.parent);
  res.redirect('/');
});

router.post('/deleteTask', function(req, res, next) {
	console.log(res);
  res.redirect('/');
});

module.exports = router;
