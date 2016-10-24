define([
	'backbone',
	'models/userModel'
], function(Backbone, userModel) {

	var UsersCollection = Backbone.Collection.extend({
		model: userModel,

		url: '/api/v1.0/users'
	});

	return UsersCollection;

});