 $(function() { 
	Askme_Section_View = Backbone.View.extend({ 
		el: $(".row"),
		events: {
			"click .create-q":  		"load_create_new_question",
		},
		initialize: function() {
			_.bindAll(this, 'addOne', 'addAll', 'render');
			 
			 Section.bind('add',     this.addOne);
			 
			 Section.bind('reset', this.addAll);
			 
			 Section.bind('all',     this.render);
			 
			 Section.fetch();
		
			 this.href_question = $(this.el);
			 alert(this.href_question.html());
		},
		
		load_create_new_question: function(event) {
			// tomorrow
			event.preventDefault();
			alert(event.target.id);
			alert('form loaded');
			new Askme_QuestionEdit_View({model: new Askme_Question()}).render();
			// var qType = event.target.id;
			
			// var create_form_template = null;
			// if(qType == 'mul-choice') {
				// create_form_template = _.template($('#create-mul-choice-form').html());
			// }
			// $('#create-question-form .nice').html(create_form_template);
			
		},
		
		addOne: function(question) {
			var view = new Askme_Question_View({model: question});
			this.$(".nine .nice ol").append(view.render().el);
		},
		
		addAll: function() {
			alert('reset');
			window.Section.each(this.addOne);
			alert(this.$("ol").html());
		}
		
		
		
	});
	
	window.section = new Askme_Section_View();
	
 });