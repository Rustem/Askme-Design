/*
   @author = Rustem Kamun
*/
/*
   * Section is a collection of question which sematically identified by user
   * you can create a section (add), destroy it
   * you can add questions to the section
*/
Askme_Section = Backbone.Collection.extend({
	DEFAULT_NAME: "Default section",
	
	localStorage: new Store("Survey Storage"),
	
	initialize: function() {
		if(!this.name) {
			this.name = this.DEFAULT_NAME;
			
		}
	},
	
	model: Askme_Question,
	
	name: null,

	// order of the questions
	question_order: function() {
		
		if(!this.length) return 1;
		
		return this.last().get('order') + 1;
	},
	
	// define the attributes by which questions must be sorted
	comparator: function(q) {
		return q.get("order");
	}
	
});
window.Section = new Askme_Section();

window.Section.on("add", function(qq) {
	alert(qq.get("title") + " has been successfuly added to the section");
});
window.Section.on("remove", function(curQuestion) {
	curQuestion.destroy();
	curQuestion.destroy({
		success: function(model, response) {
			console.log(JSON.stringify(response));
		},
		error: function() {
			console.log("Error occured during destroying a question object from the section!");
		}
	});

});
			
			