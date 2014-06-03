var ScheduleView = Backbone.Marionette.CompositeView.extend({
	className: 'schedule-container',
	template: Handlebars.compile($('#schedule-template').html()),
	itemView: SchedCourseView,

  onShow: function() {
    // this.$el.droppable();

    $('.course-list').sortable({
      connectWith: '.course-list'
    });
  },

  appendHtml: function(collectionView, itemView){
		var courseSemester = itemView.model.attributes.semester.toLowerCase();
		var courseYear = itemView.model.attributes.year;
		collectionView.$('#' + courseSemester + '-' + courseYear).append(itemView.el);
    // itemView.$el.draggable({ revert: true });
  },

  drop: function(event, ui) {
    console.log('drop received! ui:', ui);
  },

  receive: function(event, ui) {
    console.log('drop received! ui:', ui);
  },

  events: {
    'drop' : 'drop',
    'receive' : 'receive'
  }

})