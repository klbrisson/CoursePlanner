var UserSchedule = Backbone.Collection.extend({
	model: ScheduledCourse,
	url: '/users'
});