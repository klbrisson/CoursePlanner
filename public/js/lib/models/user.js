var User = Backbone.Model.extend({
	defaults: {
		startYear: 2014,
		endYear: 2018
		// schedCourses: [SchedCourse objects]
	},
	initialize: function(options) {
		this.fullCourseList = options.fullCourseList
	},

	parse: function(response) {
		var that = this;
		response.schedCourses = new Schedule(response.schedCourses.map(function(course){
			var courseId = course.courseInfo;
			course.courseInfo = that.fullCourseList.findWhere({ _id: courseId });
			return course;
		}))
		return response;
	},
	// idAttribute: '_id',

	urlRoot: '/users'
	
})