var CourseList = Backbone.Collection.extend({
    model: Course,
    url: '/courses',
    comparator: 'department'
});