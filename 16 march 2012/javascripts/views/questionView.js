 /* 
   form for editing $('#edit-mul-choice-form');
 */
 $(function() {
	
	alert(JSON.stringify($.globals.questionTemplateForms));
	Askme_Question_View = Backbone.View.extend({
		
		// template to render
		template: _.template($($.globals.questionTemplateForms[0].mc.render).html()), 
		tagName: 'li',		// tag to wrap this.el
		el: null,
		events: {
			"dblclick":			"edit",
			"click .edit":  	"edit",
			"click .delete": 	"del"
		},
		
		initialize: function() {

			_.bindAll(this, 'render', 'edit', 'del');
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.del, this);

			//this.model.bind('change', this.render, this);
		},
		
		render: function() {
		   
			$(this.el).attr('id', 'js-form--'+ this.model.id + '_' + this.model.get("order"));  // add dynamic class to my cur <li>
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		
		edit: function(e) {
			alert('editable');
			new Askme_QuestionEdit_View({model: this.model}).render();
			//$($(e.target).parents('li')[0]).html(compiledTemplate(this.model.toJSON()));
		},
		
		del: function() {
			alert('delitable');
		}
	});

	<!-- -->
	Askme_MultipleChoice_Question_View = Askme_Question_View.extend({
		
	});

	Askme_RatingScale_Question_View = Askme_Question_View.extend({

	});
	
});