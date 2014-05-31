SchedCourseListView = Backbone.Marionette.CompositeView.extend({
  className: 'scheduled-course-list-container',
  
  template: Handlebars.compile($('#course-list-template').html()),
  
  itemView: SchedCourseView,

  onRender: function() {
    this.$el.droppable();
  },

  appendHtml: function(collectionView, itemView){
    collectionView.$(".course-list").append(itemView.el);
    itemView.$el.draggable({ revert: true });
  },

  drop: function(event, ui) {
    // console.log('dropped into ScheduledCourseListView');
    var droppedCourseId = $(ui.draggable[0]).data('id');
    console.log(droppedCourseId);
    this.trigger('dropped', { courseId: droppedCourseId })
  },

  events: {
    'drop' : 'drop'
  }

});
