define([
	'backbone'
], function(Backbone) {
	
	var UserModel = Backbone.Model.extend({
		urlRoot: "/api/v1.0/users",

		idAttribute: "_id",

		url: function() {
			return this.id ? this.urlRoot + "/" + this.id : this.urlRoot;
		}
	});

	return UserModel;
});