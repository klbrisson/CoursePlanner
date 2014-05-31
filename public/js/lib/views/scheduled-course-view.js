var SchedCourseView = Backbone.Marionette.ItemView.extend({
  template: Handlebars.compile($('#course-template').html()),
  tagName: 'li',
  className: 'course list-group-item draggable',

  onRender: function() {
    this.$el.attr('data-id', this.model.attributes.courseId);
  },

  showDetails: function() {
  	this.$el.find('.course-details').toggle();
    console.log(this.model)
    
  },

  events: {
  	'click' : 'showDetails'
  }
});