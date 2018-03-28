/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateAudioPlayer=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			$this.mediaelementplayer($option);
		};
		
		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.templateAudioPlayer=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateAudioPlayer(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/