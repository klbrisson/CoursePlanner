var Course = Backbone.Model.extend({
	defaults: {
		department: 'DEPT',
		code: '100',
		name: 'Course Name',
		credits: 0,
		semesters: ['F','S','SS'],
		description: 'Course Description',
		prereqs: []
	}
});