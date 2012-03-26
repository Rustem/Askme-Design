$(function() {
Askme_QuestionEdit_View = Backbone.View.extend({
	events: {
		"click .save" 		: "save",
		"click .cancel"		: "cancel",
		"submit form"		: "save"
	},
	template: _.template($('#create-mul-choice-form').html()),
	initialize: function() {
		_.bindAll(this, 'render', 'unrender', 'save', 'cancel');
	},
	
	render: function() {
		//var template = _.template($('#create-mul-choice-form').html());
		$(this.el).html(this.template(this.model.toJSON()));
		//alert($(this.el).html());
		$('body').append(this.el);
		$(this.el).modal({
			backdrop: true,
			keyboard: false,
			show: true
		});
		
	},
	unrender: function() {
		$(this.el).modal('hide');
		$(this.el).remove();
	},
	/* 
		called save() asynchronous funciton it tries to save new model in collection
		automatically 'add' event in a collection will be fired
		
	*/
	save: function(e) {
		e.preventDefault();
		try {
			var title = this.$('input[name=title]').val();
			var answerVars = (this.$('textarea[name=answers]').val()).split('\n');
			answerVars = _.compact(answerVars);
			
			var body = {};
			// populate body array with new body
			_.each(answerVars, function(cur, idx) {
				body["answer_"+(idx+1)] = {"is_answered": false, "description": cur};
			});
			alert(JSON.stringify(body));
			this.model.set({
							"title": title,
							"order": window.Section.question_order(),
							"body": body
						});
			// alert(JSON.stringify(this.model.toJSON()), null, '\t');
			
			window.Section.create(this.model.toJSON());
			
			this.unrender();
		}
		catch(e) {
			console.log("error!!!!" + " " + e.message);
		}
	},
	
	cancel: function(e) {
		e.preventDefault();
		this.unrender();
	}
	
});
});