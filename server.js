var http = require('http');
var fs = require('fs');
var io = require('socket.io')(port);

var port = 3000;

function requestHandler(request, response) {
	console.log(request.url);

	fs.readFile(__dirname + '/views/index.html', 'utf8', function(err, data) {

		if(err) {
			response.writeHead(500);
			response.end();
		} else {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(data);
			response.end();
		}

	});

}

var server = http.createServer(requestHandler);

server.listen(port, function(err) {
	
	if(err)
		return console.log("Error : ", err);

	console.log('server is listening on port', port);
});

io.listen(server);

io.on('connection', function(socket) {
	
	console.log('new client connection established');

	socket.on('client_to_server', function(message) {
		console.log('message from client', message);
		socket.emit('server_to_client', 'message received!!');
	});


});
