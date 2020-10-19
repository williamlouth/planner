var express = require('express');
var secured = require('../lib/middleware/secured');
var router = express.Router();
var mongo_lib = require("./../mongo_lib");

/* GET user profile. */
router.get('/', secured(), async function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  var tasks = await mongo_lib.returnTasks(req.user.user_id);
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page',
    tasks: tasks
  });
});

module.exports = router;
