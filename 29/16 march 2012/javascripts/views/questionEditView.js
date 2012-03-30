
$(function() {

Askme_QuestionEdit_View = Backbone.View.extend({
	events: {
		"click .js-modal--apply" 		: "save",
		"click .js-modal--close"					: "cancel",
		"submit .js-modal--apply"		: "save",
		"keypress .js-form--mc-input-title" : "bindTitle",
		"keydown .js-form--mc-input-title" : "bindTitleOnSpecialChars"

	},
	specilChars: [18],
	
	el: $('.js-mul-choice-form'),
	// instance variable precompiling template create
	template: _.template($(Templates.create_mc_question).html()), 
	// instance variable precompiling template edit
	templateEdit: _.template($(Templates.edit_mc_question).html()),
	
	initialize: function() {
		_.bindAll(this, 'render', 'unrender', 'save', 'cancel');
	},
	el: $('.t-modal'),
	useModal: true,
	render: function() {
		
		if(!this.model.isNew()) {

			$(this.el).html(this.templateEdit(this.model.toJSON()));
		}
		else $(this.el).html(this.template(this.model.toJSON()));
		
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
	bindTitle: function(e) {
		typedText = $('.js-form--mc-input-title').val() + String.fromCharCode(e.which);
		$('.js-form--mc-title-mapping').html(typedText);
	},
	bindTitleOnSpecialChars: function(e) {
		// ctrl - 17
		if(e.keyCode == 8) {
			typedText = $('.js-form--mc-input-title').val();
			$('.js-form--mc-title-mapping').html(typedText.substring(0, typedText.length-1));
		}
	},
	storeParams: function() {
		var title, answerVars, is_required;
		if(this.model.isNew()) {
			title = this.$('input[name=js-title]').val();
			answerVars = (this.$('textarea[name=js-answers]').val()).split('\n');
			is_required = this.$('#js-options--required').val();
		}
		else {
			title = this.$('input[name=js-title-'+this.model.id+']').val();
			answerVars = (this.$('textarea[name=js-answers-'+this.model.id+']').val()).split('\n');
			is_required = this.$('#js-options--required-'+this.model.id).is(':checked');
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
							"id": this.model.id,
							"is_required": is_required
			});
		}
		else {
			this.model.set({
							"title": title,
							"body": body,
							"is_required": is_required
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

Askme_MultipleChoice_QuestonEdit_View = Askme_QuestionEdit_View.extend({
	template: _.template($(Templates.create_mc_question).html()), 
	initialize: function() {
		Askme_QuestionEdit_View.prototype.initialize.call(this);
	},

	render: function() {
		 Askme_QuestionEdit_View.prototype.render.call(this);
		//lert(JSON.stringify(events));
	}

});
Askme_Essay_QuestionEdit_View = Askme_QuestionEdit_View.extend({
	template: _.template($(Templates.create_essay_question).html()),

	templateEdit: _.template($(Templates.edit_essay_question).html()),
	
	initialize: function() {
		Askme_QuestionEdit_View.prototype.initialize.call(this);
	},
	
	render: function() {
		Askme_QuestionEdit_View.prototype.render.call(this);
	},
	storeParams: function() {
		var title, is_required;
		if(this.model.isNew()) {
			title = this.$('input[name=js-title]').val();
			is_required = this.$('#js-options--required').val();
		}
		else {
			title = this.$('input[name=js-title-'+this.model.id+']').val();
			is_required = this.$('#js-options--required-'+this.model.id).is(':checked');
		}
		if(this.model.isNew()) {
			this.model.set({
							"title": title,
							"order": window.Section.question_order(),
							"id": this.model.id,
							"is_required": is_required
			});
		}
		else {
			this.model.set({
							"title": title,
							"is_required": is_required
			});
		}
	}
});
Askme_RatingScale_QuestionEdit_View = Askme_QuestionEdit_View.extend({

});

});