var User = Backbone.Model.extend({
	defaults: {
		startYear: 2014,
		endYear: 2018,
		// schedCourses: new Schedule()
	},

	initialize: function(options) {
		this.fullCourseList = options.fullCourseList
	},

	parse: function(response) {
		var thisUser = this;
		response.schedCourses = new Schedule(response.schedCourses.map(function(course){
			return {
				semester: course.semester,
				year: course.year,
				id: course.courseId,
				courseInfo: thisUser.fullCourseList.findWhere({ _id: course.courseId })
			}
		}))
		// console.log('parse - response', response);
		return response;
	},

	toJSON: function(options) {
		userAttr = this.attributes;
		var schedCourseArray = userAttr.schedCourses.models.map(function(course){
			var courseObj = {
				semester: course.attributes.semester,
				year: course.attributes.year,
				courseId: course.attributes.id
			}
			return courseObj
		});

		return {
			startYear: userAttr.startYear,
			endYear: userAttr.endYear,
			schedCourses: schedCourseArray
		}
	},

	idAttribute: '_id',

	urlRoot: '/users'
	
})