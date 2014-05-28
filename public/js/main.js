


MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
    mainRegion: "#test-courses",
    region2: "#test2"
});


MyApp.addInitializer(function(options) {
    var courseListView = new CourseListView({
        collection: options.courses
    });
    var courseListView2 = new CourseListView({
        collection: options.courses2
    });
    MyApp.mainRegion.show(courseListView);
    MyApp.region2.show(courseListView2);

});

$(document).ready(function() {
    // Creates a collection of all courses and fetches them from the database
    var fullCourseList = new CourseList();
    fullCourseList.fetch({reset: true});

    // Creates new collections by filtering the fullCourseList after
    // the data is retrieved from the database
    fullCourseList.on('reset', function(){
      var courses2 = new CourseList(_.filter(fullCourseList.models, function(course){
        console.log(course.attributes)
        return course.attributes.credits === 3;
      }))

      MyApp.start({
        courses: fullCourseList,
        courses2: courses2
      });

    })
    


    // TODO: find a better way to make the lists sortable
    $(document).on('click', '.course', function() {
      $('.sortable').sortable();
      $('.sortable, .sortable').sortable({
          connectWith: '.connected'
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






// $(document).ready(function() {
// 	// Render Years
// 	var renderYear = Handlebars.compile($('#year-template').html());
// 	for (var i = User.Schedule.startYear; i<= User.Schedule.endYear; i++) {
// 		renderYear({year: i});
// 	}


// var testCourse = new Course();
// var testCourse2 = new Course({name: 'Course2'});


// var courses = [testCourse, testCourse2];

// // var renderYear = Handlebars.compile($('#year-template').html());
// // $('#test').append(renderYear({credits: 3}));


// var courseListView = new CourseListView({collection: courses});
// courseListView.setElement($('.fall'));
// courseListView.render();





// // var courseView = new CourseView({model: testCourse});
// // courseView.setElement($('.spring'));
// // courseView.render();

// // var courseView2 = new CourseView({model: testCourse2});
// // courseView2.setElement($('.fall'));
// // courseView2.render();

// // courses.map(function(course){
// // 	var newCourseView = new CourseView({model: course});
// // 	newCourseView.setElement($('.fall'));
// // 	newCourseView.render();
// // })





$('.sortable').sortable();
$('.sortable, .sortable').sortable({
    connectWith: '.connected'
});




// })