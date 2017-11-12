var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/native', function(req, res) {
	res.sendFile(__dirname + '/public/native/native.html')
})

app.get('/angular', function(req, res) {
	res.sendFile(__dirname + '/public/angular/angular.html')
})

app.get('/react', function(req, res) {
	res.sendFile(__dirname + '/public/react/react.html')
})

app.get('/', function(req, res) {
	res.redirect('/native')
})

app.listen(port, function() {
	console.log('server is up, listening on port %d!', port);
});
