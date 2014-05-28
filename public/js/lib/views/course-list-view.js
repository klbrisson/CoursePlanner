// var CourseListView = Backbone.View.extend({
// 	initialize: function() {
// 		this.renderTemplate = Handlebars.compile($('#course-list-template').html());
// 	},

// 	render: function() {
// 		console.log(this.collection);
// 		this.$el.html(this.renderTemplate(this.collection));
// 	}
// })


CourseListView = Backbone.Marionette.CompositeView.extend({
  className: "course-list-container",
  template: Handlebars.compile($('#course-list-template').html()),
  itemView: CourseView,
  
  appendHtml: function(collectionView, itemView){
    collectionView.$(".course-list").append(itemView.el);
  }
});