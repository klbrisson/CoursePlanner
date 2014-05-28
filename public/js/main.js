/*
	use CourseListView to render all lists on page: 
		required courses, elective courses, semesters, etc.

	User:
		Schedule: {
			courses: [scheduledCourses]
			startYear:
			endYear:
		}
	
	to render a semester..
		// Creates a course list from an array of all scheduled courses based
		// on the given year and semester

		var semesterCourseList = user.schedule.courses.map(function(course) {
			return course.year === year && course.semester === semester
		})
		var semesterListView = new CourseListView({collection: semesterCourseList})

	to render the years..
		var renderYear = Handlebars.compile($('#year-template').html());
		for (var i = User.Schedule.startYear; i<= User.Schedule.endYear; i++) {
			renderYear({year: i});
		}


	in the CourseListView, create a function to listen for changes and
	update the scheduledCourse attributes

		updateCourse: function(course) {
			course.year = $(el).data('year')
			course.semester = $(el).data('semester')
		}

		run updateCourse whenever a change is made to that courseListView

*/






$(document).ready(function() {



var testCourse = new Course();
var testCourse2 = new Course({name: 'Course2'});


var courses = [testCourse, testCourse2];

// var renderYear = Handlebars.compile($('#year-template').html());
// $('#test').append(renderYear({credits: 3}));


var courseListView = new CourseListView({collection: courses});
courseListView.setElement($('.fall'));
courseListView.render();





// var courseView = new CourseView({model: testCourse});
// courseView.setElement($('.spring'));
// courseView.render();

// var courseView2 = new CourseView({model: testCourse2});
// courseView2.setElement($('.fall'));
// courseView2.render();

// courses.map(function(course){
// 	var newCourseView = new CourseView({model: course});
// 	newCourseView.setElement($('.fall'));
// 	newCourseView.render();
// })






$('.sortable').sortable();
$('.sortable, .sortable').sortable({
    connectWith: '.connected'
});



})