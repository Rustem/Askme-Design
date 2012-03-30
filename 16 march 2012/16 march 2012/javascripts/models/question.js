/*
   * @author = Rustem Kamun
*/
var Askme_Question = Backbone.Model.extend({
	//contructor
	initialize: function(title) {
		this.title = title + "";
		if(!this.get("body")) {
			this.set({"body": this.body()});
		}
	},
	body: function() {
		 return {
					"answer1": {"description":"this is first answer to your question", "is_answered": false},
					"answer2": {"description":"this is second answer to your question", "is_answered": false},
					"answer3": {"description":"this is third answer to your question", "is_answered": false},
					"answer4": {"description":"this is fourth answer to your question", "is_answered": false},
				};
	},
	// attributes
	defaults: {
		title: "Default Question Title",
		author: "Rustem Kamun",
		order: 0,
		type: 'mc'
		
	},
	
	destroy_question: function () {
		this.destroy();
	}
});
// in order not to create a copy of new function populateBody during each new instance of question 
Askme_Question.prototype.populateBody = function(newBody) {
	if(!this.get("body")) {
		this.set({
			"body": !newBody ? this.body() : newBody
		});
	}
}

var Askme_MultipleChoice_Question = Askme_Question.extend({
	// default body
	initialize: function() {
		if(!this.get("body")) {
			this.set({"body": this.body()});
		}
	},
	body: function() {
		 return {
					"answer1": {"description":"this is first answer to your question", "is_answered": false},
					"answer2": {"description":"this is second answer to your question", "is_answered": false},
					"answer3": {"description":"this is third answer to your question", "is_answered": false},
					"answer4": {"description":"this is fourth answer to your question", "is_answered": false},
				};
	},
	defaults: {
		title: "Multiple Choice Question",
		order: 0,
		is_required: false,
		type: 'mc'
	}
});

var Askme_Essay_Question = Askme_Question.extend({
	// default body
	body: function() {
		return {"answer": "This is fucking shit long long lonog answer which is never been published because "
							+ "of authenticity"};
	},
	defaults: {
		title: "Essay Question",
		order: 0,
		is_required: false,
		type: 'essay'
	}
});

var Askme_RatingScale_Question = Askme_Question.extend({
	body: function() {
		return {"answer": "This is fucking shit long long lonog answer which is never been published because "
							+ "of authenticity"};
	},
	defaults: {
		title: "Rating Scale Question",
		order: 0,
		is_required: false
	}
})