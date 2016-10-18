define([
	'backbone'
], function(Backbone) {

	var practiceModel = Backbone.Model.extend({
		urlRoot: "/api/v1/practices",

		url: function() {
			return this.id ? this.urlRoot + "/" + this.id : this.urlRoot;
		}
	});

	return practiceModel;

});