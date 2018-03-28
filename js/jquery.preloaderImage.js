/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var preloaderImage=function(object,option)
	{
		/**********************************************************************/
		
		var $self=this;
		var $this=$(object);
		
		var $optionDefault=
		{
			onReady						:	function() {}
		};
		
		var $option=$.extend($optionDefault,option);

		/**********************************************************************/

		this.create=function() 
		{
			$this.find('img').addClass('template-image-preloader-process');
				
			$self.wait();
				
			$this.find('img').each(function() 
			{
				$(this).attr('src',$(this).attr('src')+'?i='+$self.getRandom(1,100000));
				$(this).bind('load',function() 
				{ 
					$(this).unbind('load');
					$(this).removeClass('template-image-preloader-process');
				});
			});	
		};
		
		/**********************************************************************/
		
		this.complete=function()
		{
			$this.find('img').animate({opacity:1},{duration:200,complete:function() 
			{
				$(this).parent('.template-image-preloader').addClass('template-image-preloader-complete');
				$option.onReady();
			}});
		};
		
		/**********************************************************************/
	
		this.wait=function()
		{
			var preloaderClock=window.setInterval(function() 
			{
				if(parseInt($this.find('img.template-image-preloader-process').length)==0)
				{
					$self.complete();
					window.clearInterval(preloaderClock);
				}
			},1000);	
		};
		
		/**********************************************************************/
		
		this.getRandom=function(min,max)
		{
			return((Math.floor(Math.random()*(max-min)))+min);
		};

		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.preloaderImage=function(option) 
	{
		return this.each(function() 
		{
			var object=new preloaderImage(this,option);
			object.create();

			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);