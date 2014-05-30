var ScheduleLayout = Backbone.Marionette.Layout.extend({
  template: Handlebars.compile($('#schedule-template').html()),
  className: 'schedule container-fluid',
  
  regions: {
  	year: '.year',
  	year2: '.year2'
  }

})


