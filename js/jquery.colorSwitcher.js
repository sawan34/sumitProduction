/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var colorSwitcher=function(object,option)
	{
		/**********************************************************************/
		
		var $self=this;
		var $this=$(object);
		
		var $optionDefault=
		{
			init			:	true,
			color			:	'#FFD600',
			width			:
			{
				open		:	300,
				close		:	50
			}
		};
		
		var $option=$.extend($optionDefault,option);

		/**********************************************************************/

		this.create=function() 
		{
			if(!$option.init)
			{
				$self.switchColor();
				return;
			}
			
			/******************************************************************/
			
			$('#cs-toggle-button').bind('click',function(e) 
			{
				e.preventDefault();
				var width=$this.hasClass('cs-open') ? $option.width.close : $option.width.open;
				
				$this.animate({width:width},{duration:300,complete:function() 
				{
					if($this.hasClass('cs-open')) $this.removeClass('cs-open').addClass('cs-close');
					else $this.removeClass('cs-close').addClass('cs-open');
				}});
			});
			
			/******************************************************************/
		
			$('#cs-color-list a').bind('click',function(e) 
			{
				e.preventDefault();
				$('#cs-color-value').focus().val($self.RGB2HEX($(this).css('background-color')));
				$self.switchColor();
			});
			
			/******************************************************************/
		
			$('#cs-go-button').bind('click',function(e) 
			{
				e.preventDefault();
				$self.switchColor();
			});
			
			/******************************************************************/
			
			$('#cs-reset-button').bind('click',function(e) 
			{
				e.preventDefault();
				$('#cs-color-value').focus().val($option.color);
				$self.switchColor();
			});			
			
			/******************************************************************/
			
			$('#cs-color-value').bind('focus',function(e) 
			{
				e.preventDefault();
				if($self.isEmpty($(this).val())) $(this).val('#');
				else $(this).select();
			}).bind('mouseup',function(e) 
			{
				e.preventDefault(); 
			}).bind('blur',function(e) 
			{
				e.preventDefault();
				if($(this).val()=='#') $(this).val('');
			}).bind('keypress',function(e) 
			{
				if(e.which==13) 
				{
					e.preventDefault();
					$self.switchColor();
					return(false);
				}
			});

			$('#cs-color-value').colpick(
			{
				layout		:	'hex',
				submit		:	0,
				colorScheme	:	'light',
				onChange:function(hsb,hex,rgb,el,bySetColor) 
				{
					if(!bySetColor) $(el).val('#'+hex);
				}
			}).keyup(function()
			{
				$(this).colpickSetColor(this.value);
			});

			/******************************************************************/
			
			$this.find('.cs-infield').inFieldLabels({fadeOpacity:0});
			
			/******************************************************************/
			
			$self.switchColor();
			
			/******************************************************************/
		};
		
		/**********************************************************************/
		
		this.switchColor=function()
		{
			var color=$('#cs-color-value').val();
			
			if(!$self.isHEX(color))
			{
				$('#cs-color-value').val($option.color);
				$self.switchColor();
				return;
			}
			
			$('#cs-color-file').attr('href','style/color.css.php?color='+color.substring(1));
		};
		
		/**********************************************************************/
		
		this.RGB2HEX=function(rgb)
		{
			rgb=rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			return('#'+
			('0'+parseInt(rgb[1],10).toString(16)).slice(-2)+
			('0'+parseInt(rgb[2],10).toString(16)).slice(-2)+
			('0'+parseInt(rgb[3],10).toString(16)).slice(-2));
		}
		
		/**********************************************************************/

		this.HEX2RGB=function(hex) 
		{
			var result=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return(result ? 
			{
				r: parseInt(result[1],16),
				g: parseInt(result[2],16),
				b: parseInt(result[3],16)
			} : null);
		}
		
		/**********************************************************************/
		
		this.isHEX=function(value)
		{
			if(value.substring(0,1)=='#') value=value.substring(1);
			return(typeof value==="string") && value.length===6 && ! isNaN(parseInt(value,16));
		};

		/**********************************************************************/
		
		this.isEmpty=function(value)
		{
			return(!$.trim(value).length);
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.colorSwitcher=function(option) 
	{
		return this.each(function() 
		{
			var object=new colorSwitcher(this,option);
			object.create();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/