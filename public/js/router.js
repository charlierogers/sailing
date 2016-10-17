define([
	'jquery',
	'underscore',
	'backbone',
	'views/navView',
	'views/practiceView',
	'views/regattasView',
	'views/calendarView',
	'views/rosterView',
	'views/profileView'
], function($, _, Backbone, NavView, PracticeView, RegattasView, CalendarView, RosterView, ProfileView) {
	var AppRouter = Backbone.Router.extend({
		routes:{
			'practice': 'practice',
			'regattas': 'regattas',
			'calendar': 'calendar',
			'roster': 'roster',
			'profile': 'profile'
		}
	});

	var initialize = function() {
		var app_router = new AppRouter;

		var navView = new NavView;
		navView.render();

		app_router.on('route:practice', function() {
			var practiceView = new PracticeView;
			practiceView.render();

			navView.updateTabSelected(0);
		});

		app_router.on('route:regattas', function() {
			var regattasView = new RegattasView;
			regattasView.render();

			navView.updateTabSelected(1);
		});

		app_router.on('route:calendar', function() {
			var calendarView = new CalendarView;
			calendarView.render();

			navView.updateTabSelected(2);
		});

		app_router.on('route:roster', function() {
			var rosterView = new RosterView;
			rosterView.render();

			navView.updateTabSelected(3);
		});

		app_router.on('route:profile', function() {
			var profileView = new ProfileView;
			profileView.render();

			navView.updateTabSelected(4);
		});

		Backbone.history.start();
	}

	return {
		initialize: initialize
	};
})