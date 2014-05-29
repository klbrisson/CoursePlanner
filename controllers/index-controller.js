var mongoose = require('mongoose');

module.exports = {
	renderIndex: function(req, res) {
		res.render('index', {loggedIn: !!req.user, user: req.user});
	}
}