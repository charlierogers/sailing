define([
	'jquery',
	'backbone',
	'underscore',
	'models/UsersCollection',
	'models/UserModel',
	'text!/templates/roster/contact.html'
], function($, Backbone, _, UsersCollection, UserModel, ContactTemplate) {

	var rosterView = Backbone.View.extend({
		el: $('#content'),

		events: {"click .rosterName" : "changeContactView"},

		initialize: function() {
			this.collection = new UsersCollection();
			this.listenTo(this.collection, 'sync', this.render);
			this.collection.fetch();
		},

		render: function() {
			this.$el.empty();
			var list = new listView({collection: this.collection});
			this.$el.append(list.el);
			if (this.collection.models[0]) {
				var contact = new contactView({model: this.collection.models[0]});
				this.$el.append(contact.el);
			}
		},

		changeContactView: function() {
			this.model = new UserModel({"_id" : event.target.id});
			this.listenTo(this.model, 'sync', function() {
				var contact = new contactView({model: this.model});
				$('.contact').remove();
				this.$el.append(contact.el);
			});
			this.model.fetch();
		}
	});

	var contactView = Backbone.View.extend({
		tagName: 'div',

		className: 'contact',

		template: _.template(ContactTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.empty();
			this.$el.html(this.template({_: _, user: this.model}));
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

		className: 'rosterName',


		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.append("<a id='" + this.model.get("_id") + "'>" + this.model.get("name") + "</a>");
		}
	});

	return rosterView;

});	