define([
	'backbone'
], function(Backbone) {

	var PracticeSignupModel = Backbone.Model.extend({
		urlRoot: "/api/v1.0/practices/",

		idAttribute: "_id",

		url: function() {
			return this.id ? this.urlRoot + "/" + this.id : this.urlRoot + "/" + this.get("practiceId") + "/signups";
		}
	});

	var PracticeModel = Backbone.Model.extend({
		urlRoot: "/api/v1.0/practices",

		idAttribute: "_id",

		url: function() {
			return this.id ? this.urlRoot + "/" + this.id : this.urlRoot;
		}
	});

	return {
		PracticeModel: PracticeModel,
		PracticeSignupModel: PracticeSignupModel
	};

});