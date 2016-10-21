require.config({
	paths: {
		jquery: 'libs/jquery/jquery-3.1.1.min',
		underscore: 'libs/underscore/underscore-min',
		backbone: 'libs/backbone/backbone-min',
		moment: 'libs/moment/moment'
	}
});

require([
	'app'
], function(App) {
	console.log("initializing");
	App.initialize();
});