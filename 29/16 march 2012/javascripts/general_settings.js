/*
  * this file contains global settings for all js 
*/
$.globals = {

		// naming conventions
		questionTemplateForms: [
			{mc: {id: 'mul-choice', jqId: '#mul-choice', render: "#js-render-question--mc-form", create: "#js-create-question--mc-form", edit: "#js-edit-question--mc-form"}},
			{essay: {id: 'essay', jqId: '#essay', render: "#js-render-question--essay-form", create: "#js-create-question--essay-form", edit: "#js-edit-question--essay-form"}},
			{rs: {id: 'rating-scale', jqId: '#rating-scale', render: "#js-render-question--rs-form", create: "#js-create-question--rs-form", edit: "#js-edit-question--rs-form"}}
		],
		triggeredElementClasses: [
			{save: "click .js-modal--apply",
			 save: "dblclick .js-modal--apply",
			 close: "click .js-modal--close"}
		]
}


$(function () {
	// variable for caching settings
	

	var s = null,

	 Globals = {
		settings: {

			// askme settings	
			logoButton: $("#logo"),
			stripes: [
				{box:"#box0", counter:"#countdown0"},
				{box:"#box1", counter:"#countdown1"},
				{box:"#box2", counter:"#countdown2"},
				{box:"#box3", counter:"#countdown3"}
			]
		},

		// the method that initializes stuff
		init: function () {
			/*	the line below can be included in each method to reference the settings 
				without always having to type "this.settings" each time */
			s = this.settings;
			console.log(s);

			// after you do stuff here, you can call the next method
			// You can use "this" in the current context to reference "PrimaryNameSpace" directly
			this.rotateColours();
			
					
			// launch all sexySycle boxes
			$.each(s.stripes, function(i, el) {
			//	$(el.box).sexyCycle({counter: el.counter});
			});
		},
		
		rotateColours: function () {
			s = this.settings;
			s.logoButton.click(function() {
				// rotate colours here
			});
		},
		
		anotherMethod: function () {
			s = this.settings;
			// do more stuff here
		}

		// remember not to use a trailing comma after the last method is defined; you could leave a dummy method here to prevent that error
	};

	// This line initializes the whole thing; you could pass in some JSON data or some other object that needs to be worked with
	Globals.init();

});
