/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var responsiveElement=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		
		var $optionDefault=
		{
			width			:	460,
			children		:	'*',
			className		:	'',
			classNameRemove	:	''
		};
		
		var $option=$.extend($optionDefault,option);

		/**********************************************************************/

		this.create=function() 
		{
			if(!$.trim($option.classNameRemove).length)
				$option.classNameRemove=$option.className;
			
			this.responsive();

			var self=this;
			$(window).dimensionListener({change:function(width,height) 
			{
				self.responsive();
			}});					
		};
		
		/**********************************************************************/
		
		this.responsive=function()
		{
			$this.each(function() 
			{
				var actualWidth=$(this).actual('outerWidth',{includeMargin:false});
				if($option.children==null)
				{
					if(actualWidth<=$option.width) $(this).addClass($option.className);
					else $(this).removeClass($option.classNameRemove);				
				}
				else
				{
					if(actualWidth<=$option.width) $(this).children($option.children).addClass($option.className);
					else $(this).children($option.children).removeClass($option.classNameRemove);	
				}
			});
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.responsiveElement=function(option) 
	{
		var element=new responsiveElement(this,option);
		element.create();
	};
	
	/**************************************************************************/

})(jQuery,document,window);