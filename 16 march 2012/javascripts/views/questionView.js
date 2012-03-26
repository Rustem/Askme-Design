 $(function() {
	
	Askme_Question_View = Backbone.View.extend({
		
		// template to render
		template: _.template($('#mc-question-template').html()),
		
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
			$(this.el).html(this.template(this.model.toJSON()));
			alert("question render " + $(this.el).html());
			return this;
		},
		
		edit: function() {
			alert('editable');
		},
		
		del: function() {
			alert('delitable');
		}
	});
	
});