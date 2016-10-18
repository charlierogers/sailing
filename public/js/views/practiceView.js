define([
	'jquery',
	'backbone',
	'underscore',
	'models/practiceCollection',
	'models/practiceModel',
	'text!/templates/practice.html'
], function($, Backbone, _, PracticeCollection, PracticeModel, PracticeTemplate) {

	var practiceView = Backbone.View.extend({
		el: $('#content'),

		template: _.template(PracticeTemplate),

		initialize: function() {
			this.collection = new PracticeCollection();
			this.listenTo(this.collection, 'add', this.render);

			var pastThis = this;
			this.collection.fetch({
				success: function() {
					pastThis.collection.each(function(practice) {
						practice.set('title', 'new title');
						practice.save();
					});

					var practice = new PracticeModel;
					practice.set('title', 'some practice');
					practice.save();
					pastThis.collection.add(practice);
				}
			});

			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			console.log('render practice view');
			this.$el.html(this.template({practices: this.collection}));
		}
	});

	return practiceView;

});	