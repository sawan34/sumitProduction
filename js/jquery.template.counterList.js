/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateCounterList=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		var className=
		{
			0	:	'template-counter-list-number',
			1	:	'template-counter-list-label',
			2	:	'template-counter-list-percent-line',
			3	:	'template-counter-list-content'
		}

		/**********************************************************************/

		this.build=function() 
		{
			var helper=new Helper();
			
			var typePercentage=$this.hasClass('template-counter-list-type-percentage') ? true : false;
			
			if(typePercentage)
			{
				var maxValue=0;
				$this.children('li').each(function() 
				{
					var value=helper.getValueFromClass($(this),'template-counter-list-value-');
					if(maxValue<value) maxValue=value;
				});
			}
			
			$this.children('li').each(function() 
			{
				var text=$(this).html();
				var limit=helper.getValueFromClass($(this),'template-counter-list-value-');

				var section=$(document.createElement('div'));

				var label=$(document.createElement('h5'));
				var number=$(document.createElement('h2'))
				
				$(this).html('');
				
				number.attr('class',className[0]).html('0');
				label.attr('class',className[1]).html(text);
				
				section.attr('class',className[3]);
				
				section.append(number).append(label);

				$(this).append(section);
				
				if(typePercentage)
				{
					var percentLine=$(document.createElement('div'));
					percentLine.attr('class',className[2]);
					$(this).append(percentLine);
				}
				
				$(this).waypoint(function()
				{
					var duration=2000;
					var interval=duration/limit;
					
					for(var i=0;i<=limit;i++)
					{
						window.setTimeout(function(i) 
						{
							number.html(i);
						},interval*i,i);
					}
					
					if(typePercentage)
					{
						var portion=(limit/maxValue);
						percentLine.animate({width:(portion*100)+'%'},{duration:duration});
					}					
				},
				{
					offset		:	'90%',
					triggerOnce	:	true
				});	
			});
			
			$.waypoints('refresh');
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.templateCounterList=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateCounterList(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/