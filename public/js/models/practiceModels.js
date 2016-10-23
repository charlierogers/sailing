define([
	'backbone'
], function(Backbone) {

	var PracticeSignupModel = Backbone.Model.extend({
		urlRoot: "/api/v1.0/practices",

		idAttribute: "_id",

		url: function() {
			return this.id ? this.urlRoot + "/signups/" + this.id : this.urlRoot + "/signups";
		}
	});

	var PracticeSignupCollection = Backbone.Collection.extend({
		model: PracticeSignupModel,

		url: '/api/v1.0/practices/signups'
	});

	var PracticeModel = Backbone.Model.extend({
		urlRoot: "/api/v1.0/practices",

		idAttribute: "_id",

		url: function() {
			return this.id ? this.urlRoot + "/" + this.id : this.urlRoot;
		},

		parse: function(response, options) {
			var signups = response["signups"];
			var newSignups = new PracticeSignupCollection();

			for (var i = 0; i < signups.length; i++) {
				var signup = signups[i];

				var signupModel = new PracticeSignupModel(signup);
				var signupsCollection = new PracticeSignupCollection(signup["passengers"]);
				signupModel.set('passengers', signupsCollection);
				newSignups.add(signupModel);
			}

			response["signups"] = newSignups;

			return response;
		}
	});

	var PracticeCollection = Backbone.Collection.extend({
		model: PracticeModel,

		url: '/api/v1.0/practices'
	});

	return {
		PracticeModel: PracticeModel,
		PracticeSignupModel: PracticeSignupModel,
		PracticeCollection: PracticeCollection,
		PracticeSignupCollection: PracticeSignupCollection
	};

});