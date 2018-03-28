/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateGoogleMap=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		
		var $optionDefault=
		{
			marker							:	'',
			dimension						:
			{
				width						:	'100%',
				height						:	'300px'			
			},
			coordinate						:
			{
				lat							:	'',
				lng							:	''
			},
			map								:
			{	
				draggable					:	true,
				scrollwheel					:	true,
				mapTypeId					:	google.maps.MapTypeId['ROADMAP'],
				mapTypeControl				:	true,
				mapTypeControlOptions		:	
				{
					style					:	google.maps.MapTypeControlStyle['DEFAULT'],
					position				:	google.maps.ControlPosition['TOP_CENTER'],
				},
				zoom						:	18,
				zoomControl					:	false,
				zoomControloptions			:	
				{
					style					:	google.maps.ZoomControlStyle['SMALL'],
					position				:	google.maps.ControlPosition['RIGHT_TOP']
				},
				panControl					:	false,
				panControlOptions			:
				{
					position				:	google.maps.ControlPosition['TOP_CENTER']			
				},
				scaleControl				:	false,
				scaleControlOptions			:
				{
					position				:	google.maps.ControlPosition['TOP_CENTER']
				},
				streetViewControl			:	false,
				streetViewControlOptions	:
				{
					position				:	google.maps.ControlPosition['TOP_CENTER']
				}
			}
		};
		
		var $option=$.extend($optionDefault,option);

		/**********************************************************************/

		this.build=function() 
		{
			try
			{
				var object=$this;
				object.css({width:$option.dimension.width,height:$option.dimension.height});		

				var coordinate=new google.maps.LatLng($option.coordinate.lat,$option.coordinate.lng);

				$option.map.center=coordinate;

				var googleMap=new google.maps.Map(document.getElementById(object.attr('id')),$option.map);

				if($option.marker.length!=0)
				{
					var markerOption=
					{
						map			:	googleMap,
						position	:	coordinate,
						icon		:	$option.marker
					}

					new google.maps.Marker(markerOption);

					jQuery(window).resize(function() 
					{
						var currCenter=googleMap.getCenter();

						google.maps.event.trigger(googleMap,'resize');
						googleMap.setCenter(currCenter);
					});
				}
			}
			catch(e) {}		
		};
	}
	
	/**************************************************************************/
	
	$.fn.templateGoogleMap=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateGoogleMap(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);