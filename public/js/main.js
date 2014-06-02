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
    collection: options.requiredCourses
  });
  var electiveCourseListView = new CourseListView({
    collection: options.electiveCourses
  });

  // Create ScheduledCourseListView for the list of courses in each semester
  var semesterCourseListView = new SchedCourseListView({
    collection: options.userCourses,
    courseList: options.fullCourseList,
    year: 2014,
    semester: 'Fall'
  }); 

  var userSchedListView = new SchedCourseListView({
    collection: options.userCourses,
    courseList: options.fullCourseList,
    year: 2015,
    semester: 'Spring'
  })

  // Create Layouts
  var scheduleLayout = new ScheduleLayout();
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
  yearLayout.spring.show(userSchedListView);

});




$(document).ready(function() {

  // Creates a collection of all courses and fetches them from the database
  var fullCourseList = new CourseList();

  var testUser = new UserSchedule({id: userId});

  // Creates new collections by filtering the fullCourseList after
  // the data is retrieved from the database
  fullCourseList.fetch().done(function(){

    // Creates a course list of required courses -- using 'CS' to filter for now
    var requiredCourses = new CourseList(fullCourseList.filter(function(course){
      return course.attributes.department === 'CS';
    }))

    // Creates a course list of elective courses -- using 'ART' to filter for now
    var electiveCourses = new CourseList(fullCourseList.filter(function(course){
      return course.attributes.department === 'ART';
    }))


    var userCourses = new SchedCourseList();


    // // User Courses
    // if(userId !== null){
    //   testUser.fetch().done(function(){

    //     // Creates a course list of courses the user has saved
    //     // Currently just getting the first course in the user's schedule
    //     // 
    //     // var userCourses = new SchedCourseList(fullCourseList.filter(function(course){
    //     //   return course.attributes._id === testUser.attributes.schedCourses[0].courseId
    //     // }));

    //     var userCourses = new SchedCourseList();

    //     MyApp.start({
    //       electiveCourses: electiveCourses,
    //       requiredCourses: requiredCourses,
    //       userCourses: userCourses,
    //       fullCourseList: fullCourseList,
    //       year: 2014,
    //       semester: 'semester'
    //     });
    //   });
    // }

    // Starts the app without userCourses if no user is signed in
    // else{
      MyApp.start({
        electiveCourses: electiveCourses,
        requiredCourses: requiredCourses,
        fullCourseList: fullCourseList,
        userCourses: userCourses,
        year: 'year',
        semester: 'semester'
      });
    // }

  })
    
});


















