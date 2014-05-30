//-------------- Backbone Marionette App Settings ---------------------
MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  // Create regions for the list of required courses and list of electives
  requiredCourseRegion: '#required-course-list',
  electiveCourseRegion: '#elective-course-list',

  // Region to insert Semester Layout
  scheduleRegion: '.schedule-container'
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

  var emptySchedListView = new SchedCourseListView({
    collection: options.userCourseList
  })

  // Create Layouts
  var scheduleLayout = new ScheduleLayout()
  var yearLayout = new YearLayout();
  var yearLayout2 = new YearLayout();

  // Show the lists of required and elective courses in their corresponding region
  MyApp.requiredCourseRegion.show(requiredCourseListView);
  MyApp.electiveCourseRegion.show(electiveCourseListView);
  
  // Show scheduleLayout, yearLayout, and semesterCourseListView
  MyApp.scheduleRegion.show(scheduleLayout);
  scheduleLayout.year.show(yearLayout);
  scheduleLayout.year2.show(yearLayout2);
  yearLayout.fall.show(semesterCourseListView);
  yearLayout.spring.show(emptySchedListView);

});




var testUser;
$(document).ready(function() {

  // Creates a collection of all courses and fetches them from the database
  var fullCourseList = new CourseList();


  testUser = new UserSchedule({id: "538768b592f1bb6c25bed199"});
  fullCourseList.fetch({reset: true});

  // testUser.fetch({reset: true});
  console.log(testUser);

  testUser.on('reset', function(){
    console.log('testUser reset')
  })
  

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

    // Creates a course list of only MATH courses -- for testing
    var coursesMATH = new SchedCourseList(fullCourseList.filter(function(course){
      return course.attributes.department === 'MATH';
    }))
    console.log(fullCourseList.filter(function(course){
      return course.attributes.department === 'E';
    }))
    // Empty list test
    // var emptyList = new SchedCourseList();

    // Test user course list
    testUser.fetch().done(function(){
      var userCoursesArray = fullCourseList.filter(function(course){
        return course.attributes._id === testUser.attributes.schedCourses[0].courseId
      })
      var userCourseList = new SchedCourseList(userCoursesArray);

      MyApp.start({
        coursesART: coursesART,
        coursesCS: coursesCS,
        coursesMATH: coursesMATH,
        userCourseList: userCourseList
      });
    });

  })
    
});


















