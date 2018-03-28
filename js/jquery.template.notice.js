/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateNotice=function(object,option)
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
			var self=this;
			var helper=new Helper();
			var time=parseInt(helper.getValueFromClass($this,'template-notice-time-to-close-'));
				
			$this.find('.template-notice-close-button').bind('click',function(e) 
			{
				e.preventDefault();
				self.close();
			});
			
			if(time<=0) return;
		
			var button=$this.find('.template-notice-close-button');
			var timeline=$this.find('.template-notice-timeline>div');
		
			if((button.length==0) && (timeline.length==0)) return;

			var text=button.find('span');

			if(timeline.length==1)
			{
				var option=
				{
					easing		:	'linear',
					duration	:	time*1000
				};
				
				if(text.length==0)
					option.complete=function() { self.close(); };
				
				timeline.animate({width:'100%'},option);
			}
			
			if(text.length==1)
			{
				$(text).countdown(
				{
					until		:	time,
					format		:	'S',
					layout		:	' {sn} ',
					onExpiry	:	function()
					{
						self.close();
					},
					onTick		:	function(period)
					{	
						if(text.length==1) text.html(period[6]);
					}
				}); 
			}
		};
		
		/**********************************************************************/
		
		this.close=function()
		{
			$this.hide('blind',{},300,function()
			{
				$(this).remove();
			});			
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.templateNotice=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateNotice(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);