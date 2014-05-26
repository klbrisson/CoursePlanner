var CourseCatalog = Backbone.Collection.extend({
	model: Course,
	url: '/courses'
});