var ScheduledCourseView = Backbone.View.extend({

	initialize: function() {
		this.renderTemplate = Handlebars.compile($('#course-template').html());
	},

	render: function() {
		this.$el.html(this.renderTemplate(this.model.attributes));
	}
	
})