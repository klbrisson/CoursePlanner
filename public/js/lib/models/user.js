var User = Backbone.Model.extend({
	defaults: {
		username: req.user.username,
		password: req.user.password,
		startYear: Number,
		endYear: Number,
		schedCourses: []
	}
})