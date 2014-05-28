var mongoose = require('mongoose');

var Course = mongoose.model('course', {
		department: String,
		code: Number,
		name: String,
		credits: Number,
		semesters: [String],
		description: String
});