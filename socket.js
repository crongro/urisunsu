var app = require('express')();
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var jsonp = require('./routes/jsonp');
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

//all environments
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


app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

app.get('/pp' , function(req, res) {
    res.sendfile('socket/PairPicker.html');
});

io.on('connection' , function(socket) {
    console.log("[socket] connect user! ");
    debugger;

    socket.on('disconnect', function() {
        console.log("[socket] disconnect user! ");
    });

    socket.on('name message', function(msg) {
        console.log("[socket] msg received : " + msg);
        //io.emit('name message', msg);
        socket.broadcast.emit('name message', msg);
    });
});

http.listen(80, function(){
    console.log('listening on *:80');
});


