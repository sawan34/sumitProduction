/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateNivoSliderBox=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			var self=this;
			
			$this.preloaderImage({onReady:function() 
			{
				$this.removeClass('template-custom-preloader');
				
				var slider=$this.children('.template-nivo-slider-box-image:first');
				slider.nivoSlider($option.nivoSlider);	
				
				self.setSliderSize();
				$this.parent().dimensionListener({change:function(width,height)
				{
					self.setSliderSize();
				}});
			}});
		};
		
		/**********************************************************************/
		
		this.setSliderSize=function()
		{
			var responsive=false;
			var width=parseInt($this.actual('width'));
		
			if(width<468)
			{
				responsive=true;
				$this.addClass('template-nivo-slider-box-responsive');
			}
			else $this.removeClass('template-nivo-slider-box-responsive');
			
			if(!responsive)
			{
				var zoom=width/$option.dimension.baseWidth;
				$this.find('.template-nivo-slider-box-caption h2,.nivo-caption h2').css('font-size',Math.floor($option.dimension.headerFontSize*zoom));
				$this.find('.template-nivo-slider-box-caption p,.nivo-caption p').css('font-size',Math.floor($option.dimension.paragraphFontSize*zoom));
			}
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.templateNivoSliderBox=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateNivoSliderBox(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/