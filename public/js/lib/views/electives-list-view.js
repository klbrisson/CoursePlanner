var ElectivesListView = Backbone.View.extend({
	initialize: function() {
		this.renderTemplate = Handlebars.compile($('#elective-list-template').html());
	},

	render: function() {
		// console.log(this.collection);
		// this.$el.html(this.renderTemplate(this.collection));
	}
})