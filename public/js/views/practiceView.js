define([
	'jquery',
	'backbone',
	'underscore',
	'moment',
	'socketio',
	'models/practiceModels',
	'text!/templates/practice/practice.html',
	'text!/templates/practice/practiceCell.html',
	'text!/templates/practice/carCell.html'
], function($, Backbone, _, moment, io, PracticeModels, 
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
				"name": $('#username').data("username"),
				'userId': $('#userId').data('userid')
				// "name": "Mike Gapuz"
			});
			newSignup.set('timestamp', new Date());
			newSignup.set('parentSignupId', this.model.get('_id').toString());
			newSignup.set('passengerLimit', 0);
			this.collection.add(newSignup);
			newSignup.save();
		},

		deletePerson: function(e) {
			var signupId = $(e.target).data('signup');

			var predicate = function(signup) {
				return signup.id == signupId;
			};

			var signup = this.collection.find(predicate);
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
			"click #joinWaitlist": "joinWaitlist",
			"click #deleteFromPool": "deleteFromPool"
		},

		template: _.template(PracticeCellTemplate),

		initialize: function() {
			this.listenTo(this.model.get("signups"), 'add', this.render);
			this.listenTo(this.model.get("signups"), 'remove', this.render);
			this.listenTo(this.model.get("pool"), 'add', this.render);
			this.listenTo(this.model.get("pool"), 'remove', this.render);
			this.render();
		},

		render: function() {
			this.$el.html(this.template({
				practice: this.model,
				date: moment(this.model.get("startDate")).format('dddd, MMM D')
			}));

			this.model.get("signups").each(function(signup) {
				if (signup.get('timestamp')) {
					var mom = moment(signup.get('timestamp'));
					console.log(mom.format('dddd, MMM D hh:mm'));
					console.log(signup.get('timestamp'));
				}
				var carCell = new CarCell({model: signup, collection: signup.get("passengers")});
				this.$("#carsContainer").prepend(carCell.el);
			}, this);
		},

		addCar: function() {
			console.log("add car");

			var newSignup = new PracticeSignupModel();
			newSignup.set('practiceId', this.model.id);
			newSignup.set('user', {
				"name": $('#username').data("username"),
				"userId": $('#userId').data("userid")
			});
			newSignup.set('timestamp', new Date());
			newSignup.set('parentSignupId', '');
			newSignup.set('passengerLimit', 4);
			newSignup.set('passengers', new PracticeSignupCollection());
			this.model.get("signups").add(newSignup);
			newSignup.save();
		},

		joinWaitlist: function() {
			var newSignup = new PracticeSignupModel();
			newSignup.set('practiceId', this.model.id);
			newSignup.set('user', {
				"name": $('#username').data("username"),
				'userId': $('#userId').data('userid')
			});
			newSignup.set('timestamp', new Date());
			newSignup.set('parentSignupId', '');
			newSignup.set('passengerLimit', 0);
			this.model.get('pool').add(newSignup);
			newSignup.save();
		},

		deleteFromPool: function(e) {
			var signupId = $(e.target).data('signup');

			var signup = this.model.get("pool").find(function(signup) {
				return signup.id == signupId;
			});
			this.model.get("pool").remove(signup);
			signup.destroy();
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

			this.socket = io();

			var that = this;
			this.socket.on('newSignup', function(socket) {
				that.collection.fetch();
			});
		},

		render: function() {
			this.$el.html(this.template());

			this.collection.each(function(model) {
				var practiceCell = new PracticeCell({model: model});
				this.$('#practiceContainer').append(practiceCell.el);
				this.$('#practiceContainer').append('<br>');
			}, this);
		}
	});

	return PracticeView;

});	