CourseView = Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile($('#course-template').html()),
    tagName: 'li',
    className: 'course list-group-item draggable',
    
    showDetails: function() {
    	// $('.course-details').hide();
    	this.$el.find('.course-details').toggle();
    },
    
    events: {
    	'click' : 'showDetails'
    }
});