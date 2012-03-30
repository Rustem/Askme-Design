var Askme_Controller = Backbone.Router.extend({
	routes: {
		"?page": 			"create_survey"
	},
	views: {},
	
	initialize: function() {
		alert(JSON.stringify(this.routes));
	},
	create_survey: function() {
		alert("create survey loaded");
	}
});