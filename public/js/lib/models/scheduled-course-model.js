var SchedCourse = Backbone.Model.extend({
	// defaults: {
	// 	year: 2014,
	// 	semester: 'Fall',
	// 	course: 'Course Object'
	// }

	// Checks if the prerequisites for a specific course are fulfilled, returns a boolean
  prerequisitesFulfilled: function(schedule) {
    var year = this.attributes.year;
    var semester = this.attributes.semester;
    var prerequisites = this.attributes.courseInfo.attributes.prereqs
    
    // Checks if the prerequisite course was taken for every courseId within the prerequisite
    // array and sets prereqsTaken to true only if every prerequisite is fulfilled
    var prereqsTaken = prerequisites.every(function(courseId) {
      var semesters = ['S','SS','F'];
      var prereqCourse = schedule.findWhere({ id: courseId });

      // Returns false if the prerequisite is not in the schedule
      if(!prereqCourse) {
        return false;
      }
      
      // Gets the prerequiste course's semester and year it's scheduled
      var prereqSemester = prereqCourse.attributes.semester;
      var prereqYear = prereqCourse.attributes.year;

      // If the prerequisite year is before the course's year
      // then the prerequisite has been taken and returns true
      if (prereqYear < year) {
        return true;
      }
      
      // If the prerequisite year is the same year as the course, it checks 
      // if the prerequisite is in a semester before the course and returns true or false
      else if (prereqYear === year) {
        return semesters.indexOf(prereqSemester) < semesters.indexOf(semester);
      }
      
      // If the prerequisite is not in a previous year or semester, returns false
      return false;
    })
    
    return prereqsTaken;
  },

  // Check if the course is offered in the given semester, returns a boolean
  semesterIsValid: function() {
    var semester = this.attributes.semester;
    var courseSemesters = this.attributes.courseInfo.attributes.semesters;
    return courseSemesters.indexOf(semester) !== -1;
  }


});