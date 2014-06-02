var CourseView = Backbone.Marionette.ItemView.extend({
  template: Handlebars.compile($('#course-template').html()),
  tagName: 'li',
  className: 'course list-group-item draggable',

  onRender: function() {
    this.$el.attr('data-id', this.model.attributes._id);
    this.$el.draggable({ revert: true });
  },
  
  showDetails: function() {
  	this.$el.find('.course-details').toggle();
  },
  
  events: {
  	'click' : 'showDetails'
  }
});