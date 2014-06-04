// Modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// For user auth
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var passportConfig = require('./config/passport');

// Controllers
var courseController = require('./controllers/course-controller.js');
var userController = require('./controllers/user-controller.js');
var authenticationController = require('./controllers/authentication.js');
var indexController = require('./controllers/index-controller.js');


mongoose.connect('mongodb://localhost/CoursePlanner');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.use(cookieParser());
app.use(flash());

app.use(session({secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());



// Our get request for viewing the login page
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/auth/logout', authenticationController.logout);


// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()
app.use(passportConfig.ensureAuthenticated);



app.get('/', indexController.renderIndex);

app.get('/courses', courseController.getCourses);

app.get('/users/:id', userController.getSchedule);
app.put('/users/:id', userController.update);







var port = Number(process.env.PORT || 3000)


var server = app.listen(port, function() {
	console.log('Express server listening on port ' + server.address().port);
});
