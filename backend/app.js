var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var MongoClient = require('mongodb').MongoClient;

var config = require('config');

var passport = require('passport');

var app = express();

var mongoSessionURL = config.dbUrl;

var expressSessions = require("express-session");
var MySQLStore = require('express-mysql-session')(expressSessions);

var options = {
    host: config.mySqlHost,
    port: config.mySqlPort,
    user: config.mySqlUsername,
    password: config.mySqlPassword,
    database: config.mySqlDb
};
 
var sessionStore = new MySQLStore(options);

var cors = require('cors');

var router = express.Router();
require('./routes/router')(router,passport);

if(config.util.getEnv('NODE_ENV') === 'test'){
  app.post('/clear_db', function(req,res) {
    MongoClient.connect(mongoSessionURL, function(err, db){
      if (err) { throw new Error('Could not connect: '+err); }
      db.dropDatabase();
      res.status(200).send();
    });
  });
}

var whitelist = ['http://localhost:3000', 'http://localhost:3001']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}
app.use(cors(corsOptions))

app.set('port', process.env.PORT || 3002);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser("CMPE273_passport"));
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 6 * 60 * 60 * 1000,
    store: sessionStore
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1',router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
