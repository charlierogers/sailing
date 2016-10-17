define([
	'jquery',
	'backbone',
	'underscore'
], function($, Backbone, _) {

	var accountView = Backbone.View.extend({
		el: $('#content'),

		render: function() {
			this.$el.html("Account View");
		}
	});

	return accountView;

});	