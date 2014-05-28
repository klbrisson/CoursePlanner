var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	schedule: {
		type: {
			startYear: Number,
			endYear: Number,
			courses: [{
				type: mongoose.Schema.Types.ObjectId,
      	ref: 'Course'
			}]
		},
		required: false
	}
});
