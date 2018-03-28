/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateTestimonial=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		
		var $optionDefault=
		{

		};
		
		var $option=$.extend($optionDefault,option);

		/**********************************************************************/

		this.build=function() 
		{
			
			
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.templateTestimonial=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateTestimonial(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);