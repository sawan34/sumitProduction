/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var dimensionListener=function(object,option)
	{
		/**********************************************************************/
		
		var $this=this;
		var $object=object;
		var $option=option;
		
		/**********************************************************************/

		this.create=function() 
		{
			var nHeight,nWidth;
			
			var oWidth=$this.getDimension('width');
			var oHeight=$this.getDimension('height');
			
			(function run()
			{
				nWidth=$this.getDimension('width');
				nHeight=$this.getDimension('height');
				 
				if((oHeight!=nHeight) && (oWidth!=nWidth)) option.change(nWidth,nHeight);
				else if(oWidth!=nWidth) option.change(nWidth,0);
				else if(oHeight!=nHeight) option.change(0,nHeight);
				
				oWidth=nWidth;
				oHeight=nHeight;
				
				setTimeout(run,100);
			})();	
		};
		
		/**********************************************************************/
		
		this.getDimension=function(type)
		{
			return($object.actual(type));
		}

		/**********************************************************************/
	}
	
	/**************************************************************************/
	
	$.fn.dimensionListener=function(option) 
	{
		var element=new dimensionListener(this,option);
		element.create();
	};
	
	/**************************************************************************/

})(jQuery,document,window);

/******************************************************************************/
/******************************************************************************/