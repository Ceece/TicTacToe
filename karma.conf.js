module.exports = function(config) {
	config.set({
		frameworks: ['jasmine'],
		files: [
			'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js',
			'https://code.angularjs.org/1.4.7/angular-mocks.js',
			'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.14.3/ui-bootstrap-tpls.min.js',
			'*.js'
		]
	});
};