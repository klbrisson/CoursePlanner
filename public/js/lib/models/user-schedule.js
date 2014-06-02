var UserSchedule = Backbone.Model.extend({
	defaults: {
		startYear: Number,
		endYear: Number,
		schedCourses: []
	},

	// idAttribute: '_id',

	urlRoot: '/users'
	
})