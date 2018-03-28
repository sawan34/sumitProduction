/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templatePreformattedText=function(object)
	{
		/**********************************************************************/
		
		var $this=$(object);

		/**********************************************************************/

		this.build=function() 
		{
			var self=this;
			
			this.switchLabel();
			
			$this.css('display','block');
			
			$this.children('a').on('click',function(e) 
			{
				e.preventDefault();
				
				var pre=$(this).nextAll('pre');
				
				if(pre.css('display')=='block')
					pre.css('display','none');
				else pre.css('display','block');
				
				self.switchLabel();
			});
		};
		
		/**********************************************************************/
		
		this.switchLabel=function()
		{
			var pre=$this.children('pre');
			
			if(pre.css('display')=='block')
			{
				$this.find('.template-preformatted-text-label-open').css('display','block');
				$this.find('.template-preformatted-text-label-close').css('display','none');				
			}	
			else
			{
				$this.find('.template-preformatted-text-label-open').css('display','none');
				$this.find('.template-preformatted-text-label-close').css('display','block');				
			}
		}
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.templatePreformattedText=function() 
	{
		return this.each(function() 
		{
			var object=new templatePreformattedText(this);
			object.build();	
			
			return(object);
		})
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/