 /* 
   form for editing $('#edit-mul-choice-form');
 */
 $(function() {
	
	Askme_Question_View = Backbone.View.extend({
		
		// template to render
		template: _.template($(Templates.render_mc_question).html()), 
		tagName: 'li',		// tag to wrap this.el
		el: null,
		events: {
			"dblclick":			"edit",
			"click .edit":  	"edit",
			"click .destroy-question": 	"del"
		},
		
		initialize: function() {

			_.bindAll(this, 'render', 'edit', 'del');
			this.model.bind('change', this.render, this);
			

			//this.model.bind('change', this.render, this);
		},
		
		render: function() {
		  	$(this.el).attr('id', 'js-form--'+ this.model.id + '_' + this.model.get("order"));  // add dynamic class to my cur <li>
			
			$(this.el).html(this.template(this.model.toJSON()));
			
			return this;
		},
		
		edit: function(e) {
			e.preventDefault();
			new Askme_MultipleChoice_QuestionEdit_View({model: this.model}).render();
			//$($(e.target).parents('li')[0]).html(compiledTemplate(this.model.toJSON()));
		},
		
		del: function(e) {
			//e.prevenDefault();
			var del = confirm('Вы уверены, что хотите удалить этот вопрос?');
			e.preventDefault();
			if(del) {
				try {
					//this.undelegateEvents();
					$(this.el).remove();
					this.model.destroy_question();
				}
				catch(e) {
					console.log(e.message);
				}
			}

		}
	});

	<!-- -->
	Askme_MultipleChoice_Question_View = Askme_Question_View.extend({
		template: _.template($($.globals.questionTemplateForms[0].mc.render).html()),		// will be mc tempalte
		initialize: function() {
				Askme_Question_View.prototype.initialize.call(this);
		},
		render: function() {
			Askme_Question_View.prototype.render.call(this);
			return this;
		},
		edit: function(e) {
			e.preventDefault();
			new Askme_MultipleChoice_QuestonEdit_View({model: this.model}).render();
		}
	});

	Askme_Essay_Question_View = Askme_Question_View.extend({
		el: null, 
		template: _.template($(Templates.render_essay_question).html()),  // will be essay template as soon as possible
		initialize: function() {
				Askme_Question_View.prototype.initialize.call(this);
		},
		render: function() {
			Askme_Question_View.prototype.render.call(this);
			return this;
		},
		edit: function(e) {
			e.preventDefault();
			new Askme_Essay_QuestionEdit_View({model: this.model}).render();
		}
	});

	Askme_RatingScale_Question_View = Askme_Question_View.extend({
		template: _.template($($.globals.questionTemplateForms[0].mc.render).html()),		// will be rs tempalte
		initialize: function() {
				Askme_Question_View.prototype.initialize.call();
		},
		render: function() {
			Askme_Question_View.prototype.render.call();
		}

	});


	
});