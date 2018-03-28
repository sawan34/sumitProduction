/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateNivoSlider=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			$this.preloaderImage({onReady:function() 
			{
				$this.removeClass('template-custom-preloader');
				
				var slider=$this.children('.template-nivo-slider-content:first');
				slider.nivoSlider($option.nivoSlider);				
			}});
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.templateNivoSlider=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateNivoSlider(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/