var mongoose = require('mongoose');
var User = require('../models/user-model.js');

module.exports = {
	getSchedule: function(req, res) {
		User.findById(req.params.id, function(err, user) {
			if(err) {
				console.log('Error:', err);
				res.send(500, 'There was an error retrieving courses');
			}
			res.send(user.schedule);
		})
	}
}