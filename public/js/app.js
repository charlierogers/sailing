define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'views/navView'
], function($, _, Backbone, Router, NavView) {

	var initialize = function() {
		Router.initialize();
	}

	return {
		initialize: initialize
	};

});