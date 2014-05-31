var UserSchedule = Backbone.Model.extend({
	defaults: {
		startYear: Number,
		endYear: Number,
		schedCourses: []
	},

	urlRoot: '/users'

	// addCourse: function(courseId, year, semester) {
	// 	var newCourse = {
	// 		year: year,
	// 		semester: semester,
	// 		courseId: courseId
	// 	}
	// 	schedCourses.push(newCourse);
	// },

	// removeCourse: function(courseId) {
	// 	schedCourses = _.reject(schedCourses, function(course) {
	// 		return course.courseId === courseId;
	// 	})
	// }
	
})