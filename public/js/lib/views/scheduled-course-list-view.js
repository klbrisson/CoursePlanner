SchedCourseListView = Backbone.Marionette.CompositeView.extend({
  className: 'scheduled-course-list-container',
  
  template: Handlebars.compile($('#course-list-template').html()),
  
  itemView: SchedCourseView,

  initialize: function() {
    this.on('render', function() {
      this.$el.droppable({
        drop: function() {
          console.log('dropped into ScheduledCourseListView');
        }
      })
    })
  },

  appendHtml: function(collectionView, itemView){
    collectionView.$(".course-list").append(itemView.el);
    itemView.$el.draggable({ revert: true });
  },

  test: function(){
    console.log('item was dropped into view');
  },

  events: {
    'drop' : 'test'
  }

});
