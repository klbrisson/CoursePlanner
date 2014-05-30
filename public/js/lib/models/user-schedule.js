var UserSchedule = Backbone.Model.extend({
	defaults: {
		startYear: Number,
		endYear: Number,
		schedCourses: []
	},
	urlRoot: '/users'
})