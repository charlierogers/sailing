define([
	'jquery',
	'backbone',
	'underscore'
], function($, Backbone, _) {

	var regattasView = Backbone.View.extend({
		el: $('#content'),

		render: function() {
			this.$el.html("Regattas View");
		}
	});

	return regattasView;

});	