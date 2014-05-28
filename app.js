var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var courseController = require('./controllers/course-controller.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/CoursePlanner');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/schedule')
app.post('/schedule')

app.get('/course', courseController.getCourses);


var server = app.listen(3000, function() {
	console.log('Express server listening on port ' + server.address().port);
});
