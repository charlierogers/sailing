define([
	'jquery',
	'backbone',
	'underscore',
	'models/UsersCollection',
	'models/UserModel'
], function($, Backbone, _, UsersCollection, UserModel) {

	var rosterView = Backbone.View.extend({
		el: $('#content'),

		initialize: function() {
			this.collection = new UsersCollection();
			this.listenTo(this.collection, 'sync', this.render);
			this.collection.fetch();
		},

		render: function() {
			this.$el.empty();
			var list = new listView({collection: this.collection});
			this.$el.append(list.el);
		}
	});

	var listView = Backbone.View.extend({
		tagName: 'ul',

		initialize: function() {
			this.render();
		},

		render: function() {
			this.collection.each(function(model) {
				var cell = new cellView({model: model});
				this.$el.append(cell.el);
			}, this);
		}
	});

	var cellView = Backbone.View.extend({
		tagName: 'li',

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.append("<a href='#'>" + this.model.get("name") + "</a>");
		}
	});

	return rosterView;

});	