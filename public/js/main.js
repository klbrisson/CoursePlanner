//-------------- Backbone Marionette App Settings ---------------------
MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
  // Create regions for the required courses, electives, and schedule
  requiredCourseRegion: '#required-course-list',
  electiveCourseRegion: '#elective-course-list',
  scheduleRegion: '#schedule-container'
});


MyApp.addInitializer(function(options) {
  // Create CourseListViews for the list of required courses
  // and the list of elective courses
  var requiredCourseListView = new CourseListView({
    collection: options.requiredCourses,
    fullCourseList: options.fullCourseList,
    thisUser: options.thisUser,
    listElId: 'required'
  });

  var scheduleView = new ScheduleView({
    collection: options.userCourses,
    fullCourseList: options.fullCourseList,
    thisUser: options.thisUser
  })

  MyApp.requiredCourseRegion.show(requiredCourseListView);
  MyApp.scheduleRegion.show(scheduleView);
  
});




$(document).ready(function() {

  $(document).on('click', '.show-summer-btn', function() {
    $(this).hide();
    $(this).closest('.row').find('.summer-container').removeClass('hidden');
  })

  $(document).on('click', '.hide-summer-btn', function() {
    $(this).closest('.row').find('.show-summer-btn').show();
    $(this).closest('.row').find('.summer-container').addClass('hidden');
  })




  // Creates a collection of all courses and fetches them from the database
  var fullCourseList = new CourseList();


  // Creates new collections by filtering the fullCourseList after
  // the data is retrieved from the database
  fullCourseList.fetch().done(function(){

    // // Not done yet - function to create a prereqCourses property on
    // // each course to display course codes rather than course ids
    // fullCourseList.map(function(course) {
    //   course.populatePrereqCourses(fullCourseList);
    // })

    // Creates a new user
    var thisUser = new User({_id: userId, fullCourseList: fullCourseList, schedCourses: new Schedule()});
    // User Courses
    if(userId !== null){
      thisUser.fetch().done(function(){

        // Creates a course list of courses the user has not scheduled yet
        var requiredCourses = new CourseList(fullCourseList.filter(function(course){
          var userCourses = thisUser.attributes.schedCourses;
          return userCourses.findWhere( { id: course.attributes._id }) === undefined;
        }))

        MyApp.start({
          // electiveCourses: electiveCourses,
          requiredCourses: requiredCourses,
          userCourses: thisUser.attributes.schedCourses,
          fullCourseList: fullCourseList,
          thisUser: thisUser
        });

      });
    }

    // Starts the app without userCourses if no user is signed in
    else{
      MyApp.start({
        electiveCourses: electiveCourses,
        requiredCourses: requiredCourses,
        userCourses: thisUser.attributes.schedCourses,
        fullCourseList: fullCourseList
      });
    }

  })
    
});


















