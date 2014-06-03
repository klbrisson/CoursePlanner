//-------------- Backbone Marionette App Settings ---------------------
MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  // Create regions for the list of required courses and list of electives
  requiredCourseRegion: '#required-course-list',
  electiveCourseRegion: '#elective-course-list',

  // Region to insert Semester Layout
  scheduleRegion: '#schedule-container'
});


MyApp.addInitializer(function(options) {
  // Create CourseListViews for the list of required courses
  // and the list of elective courses
  var requiredCourseListView = new CourseListView({
    collection: options.requiredCourses,
    listElId: 'required'
  });
  var electiveCourseListView = new CourseListView({
    collection: options.electiveCourses,
    listElId: 'electives'
  });

  var scheduleView = new ScheduleView({
    collection: options.userCourses
  })


  // Show the lists of required and elective courses in their corresponding region
  MyApp.requiredCourseRegion.show(requiredCourseListView);
  MyApp.electiveCourseRegion.show(electiveCourseListView);

  MyApp.scheduleRegion.show(scheduleView);
  

});




$(document).ready(function() {

  // Creates a collection of all courses and fetches them from the database
  var fullCourseList = new CourseList();


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


    // Creates a new user
    var user = new User({id: userId, fullCourseList: fullCourseList});

    // User Courses
    if(userId !== null){
      user.fetch().done(function(){

        MyApp.start({
          electiveCourses: electiveCourses,
          requiredCourses: requiredCourses,
          userCourses: user.attributes.schedCourses,
          fullCourseList: fullCourseList,
          year: 2014,
          semester: 'semester'
        });
      });
    }

    // Starts the app without userCourses if no user is signed in
    else{
      MyApp.start({
        electiveCourses: electiveCourses,
        requiredCourses: requiredCourses,
        fullCourseList: fullCourseList,
        semester: 'semester'
      });
    }

  })
    
});


















