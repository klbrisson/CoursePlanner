var CourseListView = Backbone.Marionette.CompositeView.extend({
  className: 'course-list-container',

  template: Handlebars.compile($('#course-list-template').html()),

  itemView: CourseView,
  
  appendHtml: function(collectionView, itemView){
    collectionView.$(".course-list").append(itemView.el);
  }

});