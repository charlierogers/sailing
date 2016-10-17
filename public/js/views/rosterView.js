define([
	'jquery',
	'backbone',
	'underscore'
], function($, Backbone, _) {

	var rosterView = Backbone.View.extend({
		el: $('#content'),

		render: function() {
			this.$el.html("Roster View");
		}
	});

	return rosterView;

});	