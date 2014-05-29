CourseListView = Backbone.Marionette.CompositeView.extend({
  className: "course-list-container",

  template: Handlebars.compile($('#course-list-template').html()),

  itemView: CourseView,

  // initialize: function() {
	 //  this.on('render', function() {
  // 		this.$el.droppable({
  //       drop: function() {
  //         console.log('dropped');
  //      	}
	 //    })
  // 	})
  // },
  
  appendHtml: function(collectionView, itemView){
    collectionView.$(".course-list").append(itemView.el);
    itemView.$el.draggable({ revert: true });
  },

  test: function(){
  	console.log('item was dropped into view');
  },

  events: {
  	"drop" : "test"
  }

});