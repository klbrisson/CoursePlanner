var Course = Backbone.Model.extend({
	defaults: {
		department: 'CS',
		code: '100',
		name: 'CS Something',
		credits: 0,
		semesters: ['F','S','SS'],
		description: 'a CS course'
	}
});