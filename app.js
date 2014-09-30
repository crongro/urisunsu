/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var jsonp = require('./routes/jsonp');
var googleBook = require('./routes/googleBook');
var http = require('http');
var path = require('path');

// for DB Info
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('127.0.0.1:27017/urisunsudb');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);

//compress content
app.use(express.compress());

app.use(express.static(path.join(__dirname, 'public'), {maxAge : 365 * 24 * 60 * 60 * 1000}));
//app.use(express.static(path.join(__dirname, 'views'), {maxAge : 365 * 24 * 60 * 60 * 1000}));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'views')));



//Apply C O R S 
app.all('*', function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "X-Requested-With,Cache-Control,Expires,Accept, Origin, Referer, User-Agent, Content-Type, Authorization");
     next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/helloworld' , routes.hellojisu);
app.get('/urisunsu', routes.urisunsu(db));
app.get('/jsonp', jsonp.res);  //view line Num7
app.get('/googleBook1', googleBook.res);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


