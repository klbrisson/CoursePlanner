var CourseCatalog = Backbone.Collection.extend({
	model: Course,
	url: '/course'
});