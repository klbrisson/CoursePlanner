var CourseListView = Backbone.Marionette.CompositeView.extend({
  template: Handlebars.compile($('#course-list-template').html()),

  itemView: CourseView,

  initialize: function(options) {
  	this.listElId = options.listElId
  },

  onShow: function() {
  	// this.$el.droppable();
    $('.course-list').sortable({
      connectWith: '.course-list',
      receive: function(event, ui) {
		    console.log('sortable received! ui:', ui);
		  }
    })
  },
  
  appendHtml: function(collectionView, itemView){
    collectionView.$(".course-list").append(itemView.el);
    // itemView.$el.draggable({ revert: true });
  },

  // drop: function(event, ui) {
  //   console.log('drop received! ui:', ui);
  // },

  receive: function(event, ui) {
    console.log('sortable received! ui:', ui);
  },

  events: {
    'drop' : 'drop',
    'receive' : 'receive'
  }

});