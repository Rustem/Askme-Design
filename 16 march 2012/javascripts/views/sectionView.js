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
			 var source = Templates.question;

			
			 this.href_question = $(this.el);
			 
		},
		
		load_create_new_question: function(event) {
			// tomorrow
			event.preventDefault();
			var targetId = event.target.id;
			if(targetId == $.globals.questionTemplateForms[0].mc.id) {
				new Askme_MultipleChoice_QuestonEdit_View({model: new Askme_MultipleChoice_Question()}).render();
			}
			else if(targetId == $.globals.questionTemplateForms[1].essay.id) {
				new Askme_Essay_QuestionEdit_View({model: new Askme_Essay_Question()}).render();
			}
			else if(targetId = $.globals.questionTemplateForms[2].rs.id) {
				new Askme_RatingScale_QuestionEdit_View({model: new Askme_RatingScale_Question()}).render();
			}
			
			
		},
		
		addOne: function(question) {
			var view = null;

			//var view = new Askme_Essay_Question_View({model: question});
			if(question.get("type") == "mc") {
				view = new Askme_MultipleChoice_Question_View({model: question});
			}
			else if(question.get("type") == "essay") {
				view = new Askme_Essay_Question_View({model: question});
			}
			else if(question.get("type") == "rs") {
				view = new Askme_RatingScale_Question_View({model: question});
			}
			this.$(".nine .nice ol").append(view.render().el);
		},
		
		addAll: function() {
			window.Section.each(this.addOne);
			//alert(this.$("ol").html());
		}
		
		
		
	});
	
	window.section = new Askme_Section_View();
	
 });