var SchedCourseListView = Backbone.Marionette.CompositeView.extend({
  className: 'scheduled-course-list-container',
  
  template: Handlebars.compile($('#course-list-template').html()),
  
  itemView: SchedCourseView,

  initialize: function(options) {
    this.options = options;
    console.log('options:',options);
  },

  onRender: function() {
    this.$el.droppable();
  },

  appendHtml: function(collectionView, itemView){
    collectionView.$(".course-list").append(itemView.el);
  },

  drop: function(event, ui) {
    console.log('year:',this.options.year);
    console.log('semester:',this.options.semester);
    console.log('courseList:',this.options.courseList);
    // console.log('userCourses:',this.collection);
    console.log('ui:',ui);

    var droppedCourseId = $(ui.draggable[0]).data('id');
    $(ui.draggable[0]).css('display', 'none');
    var course = this.options.courseList.findWhere({ _id: droppedCourseId })
    this.collection.add({
      year: this.options.year,
      semester: this.options.semester,
      courseInfo: course
    });
    console.log('collection after drop:',this.collection);
  },

  events: {
    'drop' : 'drop'
  }

});





























