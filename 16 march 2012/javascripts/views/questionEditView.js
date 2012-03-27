
$(function() {

Askme_QuestionEdit_View = Backbone.View.extend({
	events: {
		"click .js-modal--apply" 		: "save",
		"click .cancel"					: "cancel",
		"submit .js-modal--apply"		: "save"
	},
	el: $('.js-mul-choice-form'),
	template: _.template($($.globals.questionTemplateForms[0].mc.create).html()),
	initialize: function() {
		_.bindAll(this, 'render', 'unrender', 'save', 'cancel');
	},
	el: $('.t-modal'),
	useModal: true,
	render: function() {
		
		if(!this.model.isNew()) {
			this.template = _.template($($.globals.questionTemplateForms[0].mc.edit).html());
		}
		$(this.el).html(this.template(this.model.toJSON()));
		
		$('body').append(this.el);
		
		$(this.el).reveal();
		
		var body = this.model.get("body");
		if(body) {
			var text = '';
			var textArea = $('textarea[name=js-answers-'+ this.model.id +']');
			_.each(body, function(val, key) { 
				textArea.insertAtCaret(val.description+'\n');
			});
		}
		
	},
	unrender: function() {
		// close and and close animation are turned off
		$(this.el).trigger('reveal:close');
		//$(this.el).trigger('reveal:close');
		$(this.el).remove();		
		
	},
	/* 
		called save() asynchronous funciton it tries to save new model in collection
		automatically 'add' event in a collection will be fired
		
	*/
	save: function(e) {
		e.preventDefault();
		try {
			// store params from the form
			this.storeParams();

			this.createOrUpdateModel();
			
			this.unrender();
		}
		catch(e) {
			console.log("error!!!!" + " " + e.message);
		}
	},
	
	cancel: function(e) {
		e.preventDefault();
		this.unrender();
	},
	storeParams: function() {
		if(this.model.isNew()) {
			var title = this.$('input[name=js-title]').val();
			var answerVars = (this.$('textarea[name=js-answers]').val()).split('\n');
		}
		else {
			var title = this.$('input[name=js-title-'+this.model.id+']').val();
			var answerVars = (this.$('textarea[name=js-answers-'+this.model.id+']').val()).split('\n');
		}
		answerVars = _.compact(answerVars);
		var body = {};
			// populate body array with new body
		_.each(answerVars, function(cur, idx) {
			body["answer_"+(idx+1)] = {"is_answered": false, "description": cur};
		});
		if(this.model.isNew()) {
			this.model.set({
							"title": title,
							"order": window.Section.question_order(),
							"body": body,
							"id": this.model.id
			});
		}
		else {
			this.model.set({
							"title": title,
							"body": body
			});
		}
		
	},
	createOrUpdateModel: function() {
		if(!this.model.isNew()) {
				this.model.save();
		}
		else {
			window.Section.create(this.model.toJSON());
		}
	}
	
});
});