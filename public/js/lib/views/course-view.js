// var CourseView = Backbone.View.extend({

// 	initialize: function() {
// 		this.renderTemplate = Handlebars.compile($('#course-template').html());
// 	},

// 	render: function() {
// 		this.$el.html(this.renderTemplate(this.model.attributes));
// 	}
	
// })


CourseView = Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile($('#course-template').html()),
    tagName: 'li',
    className: 'course list-group-item'
});