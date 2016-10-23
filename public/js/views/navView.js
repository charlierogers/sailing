define([
	'jquery',
	'backbone',
	'underscore',
	'text!/templates/nav.html'
], function($, Backbone, _, NavTemplate) {

	var navView = Backbone.View.extend({
		el: $('#menu'),

		template: _.template(NavTemplate),

		selectedTab: 0,

		render: function() {
			this.$el.html(this.template({userName: $('#username').data("username"), userphoto: $('#userphoto').data("userphoto"), selectedTab: this.selectedTab}));
		},

		updateTabSelected: function(selectedIndex) {
			this.selectedTab = selectedIndex;
			this.render();
		}
	});

	return navView;

});	