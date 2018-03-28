/******************************************************************************/
/******************************************************************************/

;(function($,doc,win) 
{
	"use strict";
	
	var templateTwitterUserTimeline=function(object,option)
	{
		/**********************************************************************/
		
		var $this=$(object);
		var $option=option;

		/**********************************************************************/

		this.build=function() 
		{
			$.getJSON('plugin/twitter-user-timeline/twitter-user-timeline.php',function(data)
			{
				if(data.length)
				{
					var list=$('<ul>');
					var userExp=/(^|\s)@(\w+)/g;
					var hashExp=/(^|\s)#(\w+)/g;
					
					list.attr('class','template-twitter-user-timeline-list');

					$(data).each(function(index,value)
					{
						var text=linkify(value.text)
						text=text.replace(userExp,' <a href="http://www.twitter.com/$2">@$2</a>');
						text=text.replace(hashExp,' <a href="http://www.twitter.com/search?q=#$2&src=hash">#$2</a>');
						
						var listElement=$(document.createElement('li'));
						
						var citation=$(document.createElement('div'));
						var citationHeader=$(document.createElement('h6'));
						var citationParagraph=$(document.createElement('p'));
						
						var arrow=$(document.createElement('div'));
						
						var author=$(document.createElement('div'));
						var authorArrow=$(document.createElement('span'));
						var authorHeader=$(document.createElement('h6'));
						
						citation.attr('class','template-twitter-user-timeline-list-citation');
						arrow.attr('class','template-twitter-user-timeline-list-arrow');
						author.attr('class','template-twitter-user-timeline-list-author');
						
						citationHeader.html($.timeago(new Date(value.created_at)));
						citationParagraph.html(text);
						authorHeader.html(value.user.screen_name);
						
						citation.append(citationHeader).append(citationParagraph);
						author.append(authorArrow).append(authorHeader);
						
						listElement.append(citation).append(arrow).append(author);
						
						list.append(listElement);
					});

					$this.append(list);
					
					if($this.hasClass('template-carousel-twitter-user-timeline'))
					{
						$this.carousel(
						{
							carouFredSel	:
							{
								direction	:	'up',
								auto		:
								{
									play	:	true
								}
							}
						});
					}
				}
			});		
		};
	}
	
	/**************************************************************************/
	
	$.fn.templateTwitterUserTimeline=function(option) 
	{
		return this.each(function() 
		{
			var object=new templateTwitterUserTimeline(this,option);
			object.build();
			
			return(object);
		});
	};
	
	/**************************************************************************/

})(jQuery,document,window);






















