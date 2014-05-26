// Allow grunt-cli to run this gruntfile and
// tell us what "grunt" is
module.exports = function(grunt){
	// Initialize the grunt configurations
	grunt.initConfig({

		// Configure the uglify task (grunt uglify)
		uglify: {

			// This next level includes all sub-tasks (grunt uglify:development)
			development: {
				// Configure the set of files to use in this subtask.
				// It will be an array of file definitions
				files: [
					{
						// key is the destination, value is the source
						'js/min/main.min.js': ['js/utility.js', 'js/main.js']
					}
				],

				// specify options for the uglify:development subtask
				options: {
					beautify: true,
					sourceMap: true
				}
			},

			// Configure the build subtask (grunt uglify:build)
			build: {
				// use grunt templating to use the same files from the dev subtask
				files: '<%= uglify.development.files %>',
				options: {
					beautify: false,
					sourceMap: false
				}
			}
		},

		// Configure the cssmin task (grunt cssmin)
		cssmin: {

			// Configure the development subtask (grunt cssmin:development)
			development: {
				/* DEST-SRC MAPPING
				files: [
					{
						// set the destination and source(s).
						// Using * means it will look for all files that match
						// the pattern of 'css/*.css', meaning any .css file
						// in the css/ directory
						'css/min/main.min.css': 'css/*.css'
					}
				]
				*/
				// EXPANDED FILES - 1:1 mapping of input to destination
				files: [{
					// Tell grunt to use expanded syntax
					expand: true,
					// current working directory; the starting point
					// of source files
					cwd: 'css',
					// set the pattern for all files in that directory to use
					src: '*.css',
					// set destination folder for compiled files
					dest: 'css/min',
					// extension new files will have
					ext: '.min.css'
				}]
			}
		},

		// Configure the "watch" task
		watch: {
			// watch my css files as subtask
			css: {
				// files to watch for changes
				files: 'css/*.css',
				// tasks to run when a change is encountered
				tasks: 'cssmin'
			},

			// watch my js files and run them through the
			// uglify development subtask
			js: {
				files: 'js/*.js',
				tasks: 'uglify:development'
			}
		}
	});

	// Set up custom tasks -> name of task, [tasks to run]

	// run pre-compile since watch only waits for changes,
	// then run watch to update automatically on change
	grunt.registerTask('development', [
		'uglify:development', 'cssmin', 'watch'
	]);
	grunt.registerTask('build', ['uglify:build', 'cssmin']);

	// register a 'default' task that will run on 'grunt'
	grunt.registerTask('default', ['development']);

	// Load tasks (plugins) installed via npm so that grun
	// can access and use them
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
};