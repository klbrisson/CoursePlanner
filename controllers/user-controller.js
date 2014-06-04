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
	},

	update: function(req, res) {
		User.update({_id: req.params.id}, { $set: { schedule: req.body } }, function(err, user) {
			if(err) {
				console.log('Error:', err);
				res.send(500, 'There was an error updating the user');
			}
			res.send(200, 'User was successfully updated');
		})
	}
}