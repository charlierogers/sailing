define([
	'backbone'
], function(Backbone) {

	var practiceModel = Backbone.Model.extend({
		urlRoot: "/api/v1.0/practices",

		idAttribute: "_id",

		url: function() {
			return this.id ? this.urlRoot + "/" + this.id : this.urlRoot;
		}
	});

	return practiceModel;

});