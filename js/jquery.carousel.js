/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var Carousel=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		
		var $default=
		{
			carouFredSel				:	
			{
				circular				:	true,
				inifinite				:	false,
				direction				:	'left',
				items					:
				{
					start				:	0,
					height				:	'variable',
					visible				:	1,
					minimum				:	1
				},
				scroll					:
				{
					fx					:	'scroll',
					items				:	1,
					easing				:	'swing',
					duration			:	500,
					pauseOnHover		:	false
				},
				auto					:
				{
					play				:	false,
					timeoutDuration		:	2500
				},
				swipe					:
				{
					onTouch				:	true,
					onMouse				:	true
				},
				prev					:
				{
					button				:	null
				},
				next					:
				{
					button				:	null
				}
			},
			itemMargin					:	30,
			contentWidth				:	960
		};
		
		var $option=$.extend(true,$default,option);

		/**********************************************************************/

		this.create=function()
		{
			var self=this;
			var helper=new Helper();
			var list=$this.find('ul:first');

			if(!this.isVerticalCarousel())
			{
				$this.addClass('template-carousel-horizontal');
				
				$option.carouFredSel.height='auto';
				
				list.children('li').css(
				{
					'float'			:	'left',
					'clear'			:	'none',
					'margin-right'	:	$option.itemMargin
				});

				var columnCount=this.getLayoutColumnCount(list);
				var columnWidth=(($option.contentWidth+$option.itemMargin)/columnCount);

				self.setResponsive(columnWidth,$option.itemMargin);
				
				$this.parent().dimensionListener({change:function(width,height) 
				{
					if(width) self.setResponsive(columnWidth,$option.itemMargin);
				}});
			}	
			else
			{
				$this.addClass('template-carousel-vertical');
				
				$this.parent().dimensionListener({change:function(width,height) 
				{
					if(width) list.trigger('updateSizes');
				}});
			}
			
			var header=$this.prev(':header').first();
			
			var option=$option.carouFredSel;			
			
			option.items.minimum=this.getLayoutColumnCount(list)+1;

			option.onCreate=function()
			{
				helper.triggerResize();	
			};
			
			option.prev.button=function()
			{
				return(self.createNavigationButton(header,'prev'));
			};
			
			option.next.button=function()
			{
				return(self.createNavigationButton(header,'next'));
			};

			list.carouFredSel(option);	
		};

		/***********************************************************************/

		this.setResponsive=function(columnWidth,margin)
		{	
			var parent=$this.parent();
			var parentWidth=parent.actual('width');
			
			var list=$this.find('ul:first');
			var listElement=list.children('li');

			if(parentWidth>300)
			{
				var columnCount=Math.floor((parentWidth+margin)/(columnWidth));
				if(columnCount==0) columnCount=1;
			}
			else columnCount=1;

			if(columnCount==1) columnWidth=parentWidth;

			var carouselWidth=columnWidth*columnCount;

			if(columnCount==1) margin=0;

			listElement.css({'width':(columnWidth-margin),'margin-right':margin});

			list.css('width',carouselWidth-margin);
			$this.css('width',carouselWidth);
			
			list.trigger('configuration',['width',carouselWidth]);
			list.trigger('configuration',['items.width',columnWidth]);
			list.trigger('configuration',['items.visible',columnCount]);
			list.trigger('configuration',['items.minimum',columnCount+1]);

			list.trigger('updateSizes');
		};

		/**********************************************************************/

		this.getLayoutColumnCount=function(object)
		{
			var value=this.getValueFromClass(object,'template-layout-');
			if(value===false) return(false);
			return(value.split('x').length);
		};
		
		/***********************************************************************/
		
		this.createNavigationButton=function(header,type)
		{
			var button=$(document.createElement('a'));
			
			button.attr('class','template-carousel-navigation-'+type+'-button').attr('href','#');
			
			if((header.length==1) && (header.children('a.template-carousel-navigation-'+type+'-button').length==0))
			{
				header.addClass('template-header-carousel-navigation').append(button);
			}
			
			return(button);
		};
		
		/**********************************************************************/

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
		
		/**********************************************************************/
		
		this.isVerticalCarousel=function()
		{
			return($option.carouFredSel.direction=='up' || $option.carouFredSel.direction=='down');
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.carousel=function(option) 
	{
		return this.each(function() 
		{
			var object=new Carousel(this,option);
			object.create();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/