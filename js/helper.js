"use strict";
/******************************************************************************/
/******************************************************************************/

function Helper()
{
	/**************************************************************************/

	this.getValueFromClass=function(object,pattern)
	{
		var reg=new RegExp(pattern);
		var className=jQuery(object).attr('class').split(' ');

		for(var i in className)
		{
			if(reg.test(className[i]))
				return(className[i].substring(pattern.length));
		}

		return(false);		
	};
	
	/**************************************************************************/
	
	this.getRandomString=function(length)
	{
		var string='';
		for(var i=0;i<length;i++)
			string+=String.fromCharCode(this.getRandom(65,90));
		return(string);
	};
	
	/**************************************************************************/

	this.addLoadClass=function()
	{
		var loadClass='load-'+this.getRandomString(16);
		jQuery('body').addClass(loadClass);
		return(loadClass);
	};
	
	/**************************************************************************/
	
	this.removeLoadClass=function(loadClass)
	{
		jQuery('body').removeClass(loadClass);
	};
	
	/**************************************************************************/
	
	this.getLayoutColumnCount=function(object)
	{
		var value=this.getValueFromClass(object,'pb-layout-');
		if(value===false) return(false);
		
		return(value.split('x').length);
	};
	
	/**************************************************************************/
	
	this.bindResize=function(callback)
	{
		$(window).bind('resize',function()
		{
			callback();
		});		
		
		window.addEventListener('orientationchange',function() 
		{
			callback();
		});		
	};
	
	/**************************************************************************/
	
	this.triggerResize=function()
	{
		$(window).resize();
		$(window).trigger('orientationchange');
	};
	
	/**************************************************************************/
	
	this.verticalCenter=function(object)
	{
		$(object).each(function() 
		{
			var outer=$(document.createElement('div'));
			var middle=$(document.createElement('div'));
			var inner=$(document.createElement('div'));
			
			outer.addClass('template-vertical-center-outer');
			middle.addClass('template-vertical-center-middle');
			inner.addClass('template-vertical-center-inner');
			
			inner.html($(this).html());
			
			$(this).html(outer.append(middle.append(inner)));
		});
	};

	/**************************************************************************/
};

/******************************************************************************/
/******************************************************************************/