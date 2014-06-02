var CourseList = Backbone.Collection.extend({
    model: Course,
    url: '/courses'
});