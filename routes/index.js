var express = require('express');
var router = express.Router();
var mongo_lib = require("./../mongo_lib");
var secured = require('../lib/middleware/secured');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


/* GET home page. */
router.get('/', async function(req, res, next) {
  	res.render('index', { title: 'Planner'});
});

router.post('/addTask', function(req, res, next) {
	var task = {name: req.body.name, description: req.body.description, user_id: req.user.user_id};
	mongo_lib.addTask(task);
  	res.redirect('back');
});

router.post('/addSubTask', function(req, res, next) {
	var child = {name: req.body.name, description: req.body.description};
	mongo_lib.addSubTask(req.body.parent,child);
  res.redirect('back');
});

router.post('/deleteSubTask', function(req, res, next) {
	var child = JSON.parse(req.body.child);
	mongo_lib.deleteSubTask(req.body.parent,child);
  res.redirect('back');
});

router.post('/deleteTask', function(req, res, next) {
	mongo_lib.deleteTask(req.body.task_id);
  res.redirect('back');
});

module.exports = router;
