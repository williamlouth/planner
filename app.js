var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('mongodb')
var okta = require("@okta/okta-sdk-nodejs");
const { ExpressOIDC } = require('@okta/oidc-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('dotenv').config()

var app = express();
var oktaClient = new okta.Client({
  orgUrl: 'https://dev-902351.okta.com',
  token: '00yDSMvhdwZXG3Kwu0MdW8vlUdOnaUOR0Y357VikJ5'
});

const oidc = new ExpressOIDC({
  issuer: process.env.OIDC_ISSUER,
  client_id: process.env.OIDC_CLIENT_ID,
  client_secret: process.env.OIDC_CLIENT_SECRET,
  //redirect_uri: `${process.env.BASE_URL}/users/callback`,
  //redirect_uri: `${process.env.BASE_URL}/authorization-code/callback`,
  loginRedirectUri: `${process.env.BASE_URL}/authorization-code/callback`,
  appBaseUrl: process.env.BASE_URL,
  scope: 'openid profile'
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie:{sameSite:'strict'}
}));
app.use(oidc.router);





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
app.set('etag', false);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
});
*/

//app.use('/',indexRouter);
app.use('/',oidc.ensureAuthenticated(), indexRouter);
app.use('/users', usersRouter);
app.use('/addTask', indexRouter);
app.use('/addSubTask', indexRouter);
app.use('/deleteSubTask', indexRouter);
app.use('/deleteTask', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
oidc.on('error', err => {
	console.log("oidc error");
	console.log(err);
});

module.exports = app;
