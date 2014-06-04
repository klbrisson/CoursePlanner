var passport = require('passport');
var User = require('../models/user-model.js');

var performLogin = function(req, res, next, user){
  // Passport injects functionality into the express ecosystem,
  // so we are able to call req.login and pass the user we want
  // logged in.
  req.login(user, function(err){
    // If there was an error, allow execution to move to the next middleware
    if(err) return next(err);
    // Otherwise, send the user to the homepage.
    return res.redirect('/');
    // console.log('perform login: ', req.body);
    // return res.send({user: user});
  });
};

var authenticationController = {

	// The route-handler for the /auth/login route. Meant to be
	// a page view that only shows login forms
	login: function(req, res){
		// Render the login jade template.
		// We are using the "flash" system, which are variables
		// that can be sent from view to view and are removed
		// after use. Useful for quick messages like "failed to login."
		// In this case, we pull any existing flash message id'd as "error"
		// and pass it to the view.
		res.render('login', {
		  error: req.flash('error')
		});
	},
	processLogin: function(req, res, next){

		// Passport's "authenticate" method returns a method, so we store it
		// in a variable and call it with the proper arguments afterwards.
		// We are using the "local" strategy defined (and used) in the
		// config/passport.js file
		var authFunction = passport.authenticate('local', function(err, user, info){

			// If there was an error, allow execution to move to the next middleware
			if(err) return next(err);

			// If the user was not successfully logged in due to not being in the
			// database or a password mismatch, set a flash variable to show the error
			// which will be read and used in the "login" handler above and then redirect
			// to that handler.
			if(!user) {
				req.flash('error', 'Error logging in. Please try again.');
				return res.send('sign in error');
			}

			// If we make it this far, the user has correctly authenticated with passport
			// so now, we'll just log the user in to the system.
			performLogin(req, res, next, user);
		});

		// Now that we have the authentication method created, we'll call it here.
		authFunction(req, res, next);
	},
	processSignup: function(req, res, next){
	// Create a new instance of the User model with the data passed to this
	// handler. By using "param," we can safely assume that this route will
	// work regardless of how the data is sent (post, get).
	// It is safer to send as post, however, because the actual data won't
	// show up in browser history.
	var user = new User({
	  username: req.body.username,
	  password: req.body.password
	  // email: req.param('email')
	});

	// Now that the user is created, we'll attempt to save them to the
	// database.
	user.save(function(err, user){

	  // If there is an error, it will come with some special codes and
	  // information. We can customize the printed message based on
	  // the error mongoose encounters
	  if(err) {

	    // By default, we'll show a generic message...
	    var errorMessage = 'An error occured, please try again';

	    // If we encounter this error, the duplicate key error,
	    // this means that one of our fields marked as "unique"
	    // failed to validate on this object.
	    if(err.code === 11000){
	      errorMessage = 'This user already exists.';
	    }

	    // Flash the message and redirect to the login view to
	    // show it.
	    req.flash('error', errorMessage);
	    return res.redirect('/auth/login');
	  }

	  // If we make it this far, we are ready to log the user in.
	  performLogin(req, res, next, user);
	});
	},
	logout: function(req, res){

	    // Passport injects the logout method for us to call
	    req.logout();

	    // Redirect back to the login page
	    res.redirect('/');
	  }
	};

module.exports = authenticationController;