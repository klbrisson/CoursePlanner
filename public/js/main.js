// var course = new Course();
var testCourse = new Course();
var testCourse2 = new Course();

var courseView = new CourseView({ model: testCourse });
courseView.setElement($('#test'));
courseView.render();

var courseCatalog = new CourseCatalog([testCourse, testCourse2]);
var electivesListView = new ElectivesListView({ collection: courseCatalog });

// electivesListView.render();