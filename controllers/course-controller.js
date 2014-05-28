var mongoose = require('mongoose');
var Course = require('../models/course-model.js');

module.exports = {
	getCourses: function(req, res) {
		console.log(req);
		Course.find({}, function(err, courses) {
			if(err) {
				console.log('Error:', err);
				res.send(500, 'There was an error retrieving courses');
			}
			res.send(courses);
		})
	}
}