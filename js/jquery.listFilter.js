/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var listFilter=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		
		var $optionDefault=
		{

		};
		
		var $self=this;
		
		var $option=$.extend($optionDefault,option);
		
		var $content=$this.children('ul.template-filter-content:first');
		var $navigation=$this.children('ul.template-filter-navigation:first'); 

		/**********************************************************************/

		this.create=function() 
		{
			
			$content.preloaderImage({onReady:function() 
			{
				$navigation.find('a').bind('click',function(e) 
				{
					e.preventDefault();
					$self.createIsotope($(this));
				});

				$('#template-page').dimensionListener({change:function(width,height) 
				{
					$self.createIsotope();
				}});
			}});
		};
		
		/**********************************************************************/
		
		this.createIsotope=function(object)
		{
			$self.createFilter(object);
			$content.isotope(
			{
				filter			:	$self.createFilter(object),
				resizable		:	false, 
				layoutMode		:	'fitRows',
				animationEngine	:	'jquery'
			});			
		};
		
		/**********************************************************************/

		this.createFilter=function(object)
		{
			var filter='';
			
			if(typeof(object)=='undefined')
				object=$navigation.find('.template-selected');
			
			if(object.length!=1) return(filter);
				
			$navigation.find('a').removeClass('template-selected');
			object.addClass('template-selected');
			
			if(!object.hasClass('template-filter-none'))
			{
				var className=object.attr('class').split(' ');
				for(var i=0;i<className.length;i++) 
				{
					if(className[i].indexOf('template-filter-')!=-1) 
						filter+=' .'+className[i];			
				}			
			}
			
			return(filter);
		}

		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.listFilter=function(option) 
	{
		var element=new listFilter(this,option);
		element.create();
	};
	
	/**************************************************************************/

})(jQuery,document,window);