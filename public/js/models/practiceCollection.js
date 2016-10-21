define([
	'backbone',
	'models/practiceModel'
], function(Backbone, PracticeModel) {

	var PracticeCollection = Backbone.Collection.extend({
		model: PracticeModel,

		url: '/api/v1.0/practices'
	});

	return PracticeCollection;

});