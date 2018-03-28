/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateSkillList=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		var className=
		{
			0	:	'template-skill-list-section-left',
			1	:	'template-skill-list-section-right',
			2	:	'template-skill-list-box',
			3	:	'template-skill-list-header',
			4	:	'template-skill-list-timeline'
		}

		/**********************************************************************/

		this.build=function() 
		{
			$this.children('li').each(function() 
			{
				var helper=new Helper();
				
				var text=$(this).html();
				var level=helper.getValueFromClass($(this),'template-skill-list-value-');

				var sectionLeft=$('<div>');
				var sectionRight=$('<div>');

				var box=$('<span>');
				var header=$('<h5>');
				var timeline=$('<span>');
				
				sectionLeft.attr('class',className[0]);
				sectionRight.attr('class',className[1]);
				
				box.attr('class',className[2]);
				header.attr('class',className[3]);
				timeline.attr('class',className[4]);
				
				box.html('0');
				header.html(text);
				
				sectionLeft.append(box);
				sectionRight.append(header).append(timeline);
				
				$(this).html('').append(sectionLeft).append(sectionRight);		
				
				$(this).waypoint(function()
				{
					box=$(this).find('.'+className[2]);
					timeline=$(this).find('.'+className[4]);
					
					timeline.animate({'width':level+'%'},{duration:2000,easing:'linear',step:function(now,fx) 
					{
						box.html(parseInt(now)+'%');
					}});
				},
				{
					offset	:	'90%'
				});	
			});
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.templateSkillList=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateSkillList(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/