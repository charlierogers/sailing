define([
	'jquery',
	'backbone',
	'underscore',
	'moment',
	'models/practiceCollection',
	'models/practiceModels',
	'text!/templates/practice/practice.html',
	'text!/templates/practice/practiceCell.html',
	'text!/templates/practice/carCell.html'
], function($, Backbone, _, moment, PracticeCollection, PracticeModels, 
	PracticeTemplate, PracticeCellTemplate, CarCellTemplate) {

	var PracticeModel = PracticeModels.PracticeModel;
	var PracticeSignupModel = PracticeModels.PracticeSignupModel;

	var CarCell = Backbone.View.extend({
		tagName: 'div',

		className: 'col-xs-12 col-sm-6 col-md-4 col-lg-3',

		template: _.template(CarCellTemplate),

		events: {
			"click #joinCarButton": "join"
		},

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template({_: _, car: this.model}));
		},

		join: function() {
			this.people.push("Person 3");
			this.render();
		}
	});

	var PracticeCell = Backbone.View.extend({
		tagName: 'div',

		className: 'row show-grid',

		template: _.template(PracticeCellTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template({
				practice: this.model,
				date: moment(this.model.get("startDate")).format('dddd, MMM D')
			}));

			for (var i = 0; i < this.model.get("signups").length; i++) {
				var signup = this.model.get("signups")[i];

				var carCell = new CarCell({model: signup});
				this.$("#carsContainer").prepend(carCell.el);
			}

			// for (var i = 0; i < 5; i++) {
			// 	var carCell = new CarCell();
			// 	carCell.people = ["Person 1", "Person 2"];
			// 	this.$('#carsContainer').prepend(carCell.el);
			// }
		}
	});

	var PracticeView = Backbone.View.extend({
		el: $('#content'),

		events: {
			"click #joinWaitlist": "joinWaitlist",
			"click #addCar": "addCar"
		},

		template: _.template(PracticeTemplate),

		initialize: function() {
			this.collection = new PracticeCollection();
			this.listenTo(this.collection, 'add', this.render);

			var pastThis = this;
			this.collection.fetch();
		},

		render: function() {
			this.$el.html(this.template());

			this.collection.each(function(model) {
				var practiceCell = new PracticeCell({model: model});
				$('#practiceContainer').append(practiceCell.el);
				$('#practiceContainer').append('<br>');
			});
		},

		joinWaitlist: function() {

		},

		addCar: function() {

		}
	});

	return PracticeView;

});	