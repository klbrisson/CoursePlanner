var mongoose = require('mongoose');
var User = require('../models/user-model.js');

module.exports = {
	getSchedule: function(req, res) {
		console.log(req.params);
		// res.send('stuff')
		User.findById(req.params.id, function(err, user) {
			if(err) {
				console.log('Error:', err);
				res.send(500, 'There was an error retrieving courses');
			}
			res.send(user.schedule);
		})
	}
}