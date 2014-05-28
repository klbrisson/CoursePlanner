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
	schedules: {
		type: [
			{	semester: String,
				year: String,
				courses: [{
					type: mongoose.Schema.Types.ObjectId,
		      ref: 'Course'
				}]
			}
		],
		required: false
	}
});


/*
schedule: [
	{	semester: String,
		year: String,
		courses: [{
			type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
		}]
	}
]
*/