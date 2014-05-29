ScheduledCourseList = Backbone.Collection.extend({
    model: Course,
    url: '/courses'
});