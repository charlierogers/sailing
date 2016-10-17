define([
	'jquery',
	'backbone',
	'underscore'
], function($, Backbone, _) {

	var practiceView = Backbone.View.extend({
		el: $('#content'),

		render: function() {
			this.$el.html("Practice View");
		}
	});

	return practiceView;

});	