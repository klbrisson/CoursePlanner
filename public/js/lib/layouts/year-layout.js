var YearLayout = Backbone.Marionette.Layout.extend({
  template: Handlebars.compile($('#year-template').html()),
  regions: {
  	fall: '.fall',
  	spring: '.spring',
  	summer: '.summer'
  }
})