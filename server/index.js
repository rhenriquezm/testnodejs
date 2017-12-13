var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function(req, res){
	res.status(200).send('Hola mundo desde una ruta');
})

var message = [{
	id: 1,
	text: 'Jorge y Pipe REQL chupenlo [No olvides poner tu NickNAME]',
	nickname: 'Bot - RodrigoH'
}]

io.on('connection', function(socket){
	//Algo
	console.log('El cliente con IP: ' + socket.handshake.address + ' se ha conectado');
	socket.emit('message', message);

	socket.on('add-message', function(data){
		message.push(data);

		io.sockets.emit('message', message);
	});
});

server.listen(process.env.PORT || 5000, function(){
	console.log('Servidor está funcionando en http://localhost:3000');
});

//comentario
