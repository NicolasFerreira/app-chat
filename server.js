var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');// Moteur de template

app.use(express.static('public')); // init du fichier static pour le css et les images


app.get('/', function(req, res){
	res.render('index');
});




io.on('connection', function(socket,pseudo){


	
	socket.on('nouveau_client', function(pseudo) {
		socket.pseudo = pseudo;
		socket.broadcast.emit('nouveau_client', {pseudo:pseudo, nbUser: io.engine.clientsCount});
		console.log(io.engine.clientsCount)
	});

	socket.on('chat message vers serveur', function(msg){
		// io.emit('chat message', msg);
		socket.broadcast.emit('chat message vers les clients', {pseudo: socket.pseudo, message: msg, nbUser: io.engine.clientsCount});
	});

	socket.on('disconnect', function(pseudo){
		socket.broadcast.emit('disconnected', {pseudo:socket.pseudo, nbUser: io.engine.clientsCount});
		console.log(socket.pseudo+' disconnected');
		console.log(io.engine.clientsCount)
	});


});

http.listen(port, function(){
	console.log('listening on *:' + port);
});
