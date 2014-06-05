var ScheduleView = Backbone.Marionette.CompositeView.extend({
	className: 'schedule-container',
	template: Handlebars.compile($('#schedule-template').html()),
	itemView: SchedCourseView,

  initialize: function(options) {
    this.options = options
  },

  // After the list is rendered, make the .semester elements sortable lists
  // that are connected with the .course-list elements and other .semester list elements
  onShow: function() {
    $('.semester').sortable({
      connectWith: '.course-list, .semester',
      receive: this.receiveCourse.bind(this),
      remove: this.removeCourse.bind(this),
      appendTo: 'body',
      containment: 'document',
      scroll: false,
      helper: 'clone'
    });
  },

  // Add each course's view into their corresponding semester
  appendHtml: function(collectionView, itemView){
		var courseSemester = itemView.model.attributes.semester.toLowerCase();
		var courseYear = itemView.model.attributes.year;
		collectionView.$('#' + courseSemester + '-' + courseYear).append(itemView.el);
  },

  receiveCourse: function(event, ui) {
    var courseId = ui.item[0].dataset.id;
    var year = $(event.target).data('year');
    var semester = $(event.target).data('semester');
    this.$(ui.item).remove();
    this.addSchedCourse(courseId, year, semester);
    this.validateSchedule();
  },

  // Find the course model in the user's collection of courses and
  // remove it from the user's schedule
  removeCourse: function(event, ui) {
    var courseId = ui.item[0].dataset.id;
    var courseModel = this.collection.findWhere({ id: courseId });
    this.collection.remove(courseModel);
    this.validateSchedule();
  },

  // Add/update the dropped course into the user's schedule
  // and update the user in the database
  addSchedCourse: function(courseId, year, semester) {
    this.collection.add({
      id: courseId,
      year: year,
      semester: semester,
      courseInfo: this.options.fullCourseList.findWhere({ _id: courseId })
    }, {merge: true})
    this.options.thisUser.save();
  },

  // For every course in the user's schedule, it checks if prerequisites
  // are fulfilled and if the course is offered in that semester and
  // adds classes and shows appropriate error messages
  validateSchedule: function() {
    var schedule = this.collection;
    schedule.each(function(course){
      var prereqsTaken = course.prerequisitesFulfilled(schedule);
      var semesterValid = course.semesterIsValid();
      var courseEl = $('#schedule-container').find('[data-id="' + course.id +'"]');

      // Remove error class and hide error messages
      courseEl.removeClass('sched-error');
      courseEl.find('.semester-error').hide();
      courseEl.find('.prereq-error').hide();
      
      // Add error classes and show messages depending on validation
      if(!prereqsTaken){
        courseEl.addClass('sched-error');
        courseEl.find('.prereq-error').show();
      }
      if(!semesterValid){
        courseEl.addClass('sched-error');
        courseEl.find('.semester-error').show();
      }
    })
  }

});
















