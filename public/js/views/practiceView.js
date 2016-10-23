define([
	'jquery',
	'backbone',
	'underscore',
	'moment',
	'models/practiceModels',
	'text!/templates/practice/practice.html',
	'text!/templates/practice/practiceCell.html',
	'text!/templates/practice/carCell.html'
], function($, Backbone, _, moment, PracticeModels, 
	PracticeTemplate, PracticeCellTemplate, CarCellTemplate) {

	var PracticeModel = PracticeModels.PracticeModel;
	var PracticeSignupModel = PracticeModels.PracticeSignupModel;
	var PracticeCollection = PracticeModels.PracticeCollection;
	var PracticeSignupCollection = PracticeModels.PracticeSignupCollection;

	var CarCell = Backbone.View.extend({
		tagName: 'div',

		className: 'col-xs-12 col-sm-6 col-md-4 col-lg-3',

		template: _.template(CarCellTemplate),

		events: {
			"click #joinCarButton": "join",
			"click #deletePerson": "deletePerson",
			"click #deleteCar": "deleteCar"
		},

		initialize: function() {
			this.listenTo(this.collection, 'add', this.render);
			this.listenTo(this.collection, 'remove', this.render);
			this.listenTo(this.collection, 'change', this.render);
			this.listenTo(this.model, 'change', this.render);

			this.render();
		},

		render: function() {
			this.$el.html(this.template({_: _, car: this.model.attributes, passengers: this.collection}));
		},

		join: function() {

			var newSignup = new PracticeSignupModel();
			newSignup.set('practiceId', this.model.get('practiceId'));
			newSignup.set('user', {
				"name": $('#username').data("username")
			});
			newSignup.set('parentSignupId', this.model.get('_id').toString());
			newSignup.set('passengerLimit', 0);
			this.collection.add(newSignup);
			newSignup.save();
		},

		deletePerson: function(e) {
			var signupId = $(e.target).data('signup');

			var predicate = function(signup) {
				return signup["_id"] == signupId;
			};

			var predicate2 = function(signup) {
				return signup.id == signupId;
			};

			var signup = this.collection.find(predicate2);
			this.collection.remove(signup);

			signup.destroy({
				success: function(model, response) {
					console.log("Success deleting signup");
				},
				error: function() {
					console.log("Error deleting signup");
				}
			});

		},

		deleteCar: function() {
			// this.deleteCallback(this.model);
			this.model.destroy();
		}
	});

	var PracticeCell = Backbone.View.extend({
		tagName: 'div',

		className: 'row show-grid',

		events: {
			"click #addCar": "addCar",
			"click #joinWaitlist": "joinWaitlist"
		},

		template: _.template(PracticeCellTemplate),

		initialize: function() {
			this.listenTo(this.model.get("signups"), 'add', this.render);
			this.listenTo(this.model.get("signups"), 'remove', this.render);
			this.render();
		},

		render: function() {
			this.$el.html(this.template({
				practice: this.model,
				date: moment(this.model.get("startDate")).format('dddd, MMM D')
			}));

			this.model.get("signups").each(function(signup) {
				console.log(signup.get("user")["name"] + ", " + this.model.get("startDate"));
				var carCell = new CarCell({model: signup, collection: signup.get("passengers")});
				this.$("#carsContainer").prepend(carCell.el);
			}, this);
		},

		addCar: function() {
			console.log("add car");

			var newSignup = new PracticeSignupModel();
			newSignup.set('practiceId', this.model.id);
			newSignup.set('user', {
				"name": $('#username').data("username")
			});
			newSignup.set('parentSignupId', '');
			newSignup.set('passengerLimit', 4);
			newSignup.set('passengers', new PracticeSignupCollection());
			this.model.get("signups").add(newSignup);
			newSignup.save();
		},

		joinWaitlist: function() {
			console.log("join waitlist");
		}
	});

	var PracticeView = Backbone.View.extend({
		el: $('#content'),

		template: _.template(PracticeTemplate),

		initialize: function() {
			this.collection = new PracticeCollection();
			this.listenTo(this.collection, 'sync', this.render);

			var pastThis = this;
			this.collection.fetch();
		},

		render: function() {
			this.$el.html(this.template());

			this.collection.each(function(model) {
				var practiceCell = new PracticeCell({model: model});
				$('#practiceContainer').append(practiceCell.el);
				$('#practiceContainer').append('<br>');
			}, this);
		}
	});

	return PracticeView;

});	