var ScheduledCourseView = Backbone.Marionette.ItemView.extend({
    template: Handlebars.compile($('#course-template').html()),
    tagName: 'li',
    className: 'course list-group-item draggable'
});