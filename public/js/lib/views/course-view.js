var CourseView = Backbone.View.extend({
	// model: Course,

	// tagName: "li",

	initialize: function() {
		this.renderTemplate = Handlebars.compile($('#course-template').html());
	},

	render: function() {
		console.log('rendering');
		this.$el.html(this.renderTemplate(this.model.attributes));
	}
})