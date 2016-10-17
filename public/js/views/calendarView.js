define([
	'jquery',
	'backbone',
	'underscore'
], function($, Backbone, _) {

	var calendarView = Backbone.View.extend({
		el: $('#content'),

		render: function() {
			this.$el.html("Calendar View");
		}
	});

	return calendarView;

});	