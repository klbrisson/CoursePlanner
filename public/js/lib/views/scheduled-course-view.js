var SchedCourseView = Backbone.Marionette.ItemView.extend({
  template: Handlebars.compile($('#sched-course-template').html()),
  tagName: 'li',
  className: 'course list-group-item draggable',

  onRender: function() {
    this.$el.attr('data-id', this.model.attributes.courseInfo.attributes._id);
    this.$el.draggable({ revert: true });
  },

  showDetails: function() {
  	this.$el.find('.course-details').toggle();
  },

  events: {
  	'click' : 'showDetails'
  }
});