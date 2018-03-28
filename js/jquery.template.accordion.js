/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateAccordion=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			$this.accordion(
			{
				active			:	$option.active,
				header			:	'h5',
				icons			:	false,
				disabled		:	$option.disabled,
				collapsible		:	$option.collapsible,
				heightStyle		:	$option.heightStyle,
				animate			:	
				{
					easing		:	$option.animate.easing,
					duration	:	$option.animate.duration
				},
				create			:	function()
				{
					$(this).css('visibility','visible');
					
					var helper=new Helper();
					helper.triggerResize();
				}
			});
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.templateAccordion=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateAccordion(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/