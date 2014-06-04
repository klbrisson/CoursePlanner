var CourseListView = Backbone.Marionette.CompositeView.extend({
  template: Handlebars.compile($('#course-list-template').html()),

  itemView: CourseView,

  initialize: function(options) {
    this.options = options;
  },

  onShow: function() {
    // After the list is rendered, make the .course-list elements sortable lists
    // that are connected with the .semester list elements
    $('.course-list').sortable({
      connectWith: '.semester',
      receive: this.receiveCourse.bind(this),
      remove: this.removeCourse.bind(this)
    })
  },
  
  appendHtml: function(collectionView, itemView){
    collectionView.$(".course-list").append(itemView.el);
  },

  receiveCourse: function(event, ui) {
    // Add/update the dropped course into the course list and save the user
    var courseId = ui.item[0].dataset.id;
    this.collection.add(this.options.fullCourseList.findWhere({ _id: courseId }), {merge: true})
    this.options.thisUser.save();
  },

  removeCourse: function(event, ui) {
    // Remove the course model from the collection
    var courseId = ui.item[0].dataset.id;
    var courseModel = this.collection.findWhere({ _id: courseId });
    this.collection.remove(courseModel);
  }

});