//-------------- Backbone Marionette App Settings ---------------------
MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
    // Create regions for the list of required courses and list of electives
    requiredCourseRegion: "#required-course-list",
    electiveCourseRegion: "#elective-course-list",

    // Create regions for each semester in the schedule
    semesterCourseRegion: ".spring.semester-course-list"
});


MyApp.addInitializer(function(options) {
    // Create CourseListViews for the list of required courses
    // and the list of elective courses
    var requiredCourseListView = new CourseListView({
      collection: options.coursesCS
    });
    var electiveCourseListView = new CourseListView({
      collection: options.coursesART
    });

    // Create ScheduledCourseListView for the list of courses in each semester
    var semesterCourseListView = new SchedCourseListView({
      collection: options.coursesMATH
    }); 
    

    // Show the lists of required and elective courses in their corresponding region
    MyApp.requiredCourseRegion.show(requiredCourseListView);
    MyApp.electiveCourseRegion.show(electiveCourseListView);

    // Show the list for each semester in its corresponding region
    MyApp.semesterCourseRegion.show(semesterCourseListView);

});



$(document).ready(function() {

    // Creates a collection of all courses and fetches them from the database
    var fullCourseList = new CourseList();
    fullCourseList.fetch({reset: true});

    // Creates new collections by filtering the fullCourseList after
    // the data is retrieved from the database
    fullCourseList.on('reset', function(){
      // Creates a course list of only CS courses -- for testing
      var coursesCS = new CourseList(fullCourseList.filter(function(course){
        return course.attributes.department === 'CS';
      }))

      // Creates a course list of only ART courses -- for testing
      var coursesART = new CourseList(fullCourseList.filter(function(course){
        return course.attributes.department === 'ART';
      }))

      // // Creates a course list of only MATH courses -- for testing
      var coursesMATH = new SchedCourseList(fullCourseList.filter(function(course){
        return course.attributes.department === 'MATH';
      }))


      MyApp.start({
        coursesART: coursesART,
        coursesCS: coursesCS,
        coursesMATH: coursesMATH
      });

    })
    
});
























// /*
// 	use CourseListView to render all lists on page: 
// 		required courses, elective courses, semesters, etc.

// 	User:
// 		Schedule: {
// 			courses: [scheduledCourses]
// 			startYear:
// 			endYear:
// 		}
	
// 	to render a semester..
// 		// Creates a course list from an array of all scheduled courses based
// 		// on the given year and semester

// 		var semesterCourseList = user.schedule.courses.map(function(course) {
// 			return course.year === year && course.semester === semester
// 		})
// 		var semesterListView = new CourseListView({collection: semesterCourseList})

// 	to render the years..
// 		var renderYear = Handlebars.compile($('#year-template').html());
// 		for (var i = User.Schedule.startYear; i<= User.Schedule.endYear; i++) {
// 			renderYear({year: i});
// 		}


// 	in the CourseListView, create a function to listen for changes and
// 	update the scheduledCourse attributes

// 		updateCourse: function(course) {
// 			course.year = $(el).data('year')
// 			course.semester = $(el).data('semester')
// 		}

// 		run updateCourse whenever a change is made to that courseListView

// */




$('.sortable').sortable();
$('.sortable, .sortable').sortable({
    connectWith: '.connected'
});




// })