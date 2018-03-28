/**************************************************************************/

(function($)
{	
	"use strict";
	
	/**********************************************************************/

	var Template=function(config)
	{
		var $this=this;
		
		$this.config=config;
		
		$this.requestCurrent='';
		$this.requestPrevious='';
		
		$this.url=window.location.pathname;
		
		$this.templateResponsiveMaxWidth=768;
		
		$this.navigationBarVerticalSectionLeftWidth=260;
		
		$this.mainCarouselPause=false;
		
		/******************************************************************/

		this.load=function()
		{	
			$this.requestCurrent=$this.config.template.requestCurrent;
			
			$this.setClass('template-preloader');
			
			$this.setResponsive();
			
			$this.createMenu();
			$this.createMenuResponsive();
			
			$(window).dimensionListener({change:function(width,height) 
			{
				$this.handleWindow(width,height);
				$this.setFooterToBottom();
				$this.setFullWidthSection();
			}});
		
			$('#template-page').dimensionListener({change:function(width,height) 
			{
				$this.setFooterToBottom();
				$this.setFullWidthSection();
			}});		
		
			if($this.config.template.mainPreloader==1)
			{
				$this.createMainPreloader({complete:function() 
				{
					$this.unsetClass('template-preloader');
				}});
			}
			else 
			{
				$('#template-main-preloader').remove();
				$this.unsetClass('template-preloader');
			}
			
			$this.waitOnFunction(100,function() 
			{ 
				return(!$this.hasClass('template-preloader')); 
			},
			function() 
			{
				$this.createMainSlider();
				$this.createMainCarousel();
				
				$('#supersized,#supersized li').css({'padding-left':'+=100px'});
				
				$this.removeMainPreloader({complete:function() 
				{
					$this.handleRequest();
				}});
			});			
		};
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.isEmptyRequest=function()
		{
			return($this.isEmpty($this.requestCurrent));
		};
		
		/**********************************************************************/
		
		this.setRequestCurrent=function()
		{
			var hash=window.location.hash;
			if(hash.substring(0,$this.config.template.hashBang.length)==$this.config.template.hashBang)
				$this.requestCurrent=hash.substring($this.config.template.hashBang.length);
		};	
		
		/**********************************************************************/
		
		this.isRequest=function(request)
		{
			return($this.requestCurrent==request);
		}		
		
		/**********************************************************************/
		
		this.isHashRequest=function()
		{
			return($this.config.template.requestType==1 ? true : false);
		};

		/**********************************************************************/

		this.isQueryRequest=function()
		{
			return($this.config.template.requestType==2 ? true : false);
		};
		
		/**********************************************************************/

		this.handleRequest=function()
		{	
			$(window).bind('hashchange',function(event) 
			{
				event.preventDefault();
				$this.doRequest();
			});
			
			$this.setRequestCurrent();
			
			$this.setClass('template-enable');
			
			if($this.isHashRequest())
			{
				if($this.isEmptyRequest())
				{
					if($this.config.template.menuOpenStart==1)
						this.redirect('menu/open');
				}
				else $this.doRequest();
			}
			else if($this.isQueryRequest()) $this.doRequest();
		};
		
		/**********************************************************************/

		this.doRequest=function()
		{
			if(!$this.hasClass('template-enable'))
			{
				$this.redirect($this.requestCurrent);
				return;
			}

			$this.setRequestCurrent();
			
			if($this.isHashRequest())
			{
				if($this.isEmptyRequest())
				{
					$this.setClass('template-enable');
					return;
				}
			}
			else $this.setClass('template-enable');
	
			if($this.isRequest('home'))
			{
				if($this.isHashRequest())
				{
					if($this.hasClass('template-vertical-navigation-bar-open'))
					{
						$this.openVerticalNavigationBar('close',{complete:function() 
						{
							if($this.hasClass('template-page-open')) $this.openPage('close');	
						}});
					}
					else
					{
						if($this.hasClass('template-page-open'))
						{
							$this.openPage('close');	
						}
					}
				}
			}
			else if($this.isRequest('menu/open'))
			{
				if(!$this.hasClass('template-vertical-navigation-bar-open')) $this.openVerticalNavigationBar('open');
			}
			else if($this.isRequest('menu/close'))
			{
				if($this.hasClass('template-vertical-navigation-bar-open')) $this.openVerticalNavigationBar('close');
			}
			else if($this.requestCurrent.length!=0)
			{
				$this.checkRequest();
				
				if($this.hasClass('template-page-open'))
				{
					if($this.hasClass('template-vertical-navigation-bar-open'))
					{
						$this.openVerticalNavigationBar('close',{complete:function() 
						{
							$this.getPage();
						}});						
					}
					else $this.getPage();
				}
				else
				{
					if($this.hasClass('template-vertical-navigation-bar-open'))
					{
						$this.openVerticalNavigationBar('close',{complete:function() 
						{
							$this.openPage('open',{complete:function() 
							{
								$this.getPage();
							}});							
						}});
					}
					else
					{
						$this.openPage('open',{complete:function() 
						{
							$this.getPage();
						}});
					}
				}
			}
		};
		
		/**********************************************************************/
		/**********************************************************************/

		this.setResponsive=function()
		{
			var width=$(window).width();
			if(width>768) $this.unsetClass('template-responsive');
			else $this.setClass('template-responsive');
		};

		/**********************************************************************/

		this.handleWindow=function(width,height)
		{
			if(!$this.hasClass('template-enable'))
			{
				if($this.waitOnFunction(100,
				function() 
				{
					return($this.hasClass('template-enable'));
				},
				function() 
				{
					$this.handleWindow(width,height);
				}));	
				
				return;
			}	
			
			if(width)
			{
				$this.setResponsive();
				
				if($this.hasClass('template-responsive'))
				{
					if($this.hasClass('template-page-open'))
					{
						$this.toggleElement('template-navigation-bar-vertical-section-left','vertical-navigation-bar-close',{animate:false});
						
						if($this.hasClass('template-vertical-navigation-bar-open'))
							$this.toggleElement('template-page-box','vertical-navigation-bar-close',{animate:false});
						
						$this.toggleElement('template-page-box','page-open-responsive',{animate:false});
						
						$this.toggleElement('supersized','page-open',{animate:false});
						
						$this.unsetClass('template-vertical-navigation-bar-open');
					}
					else 
					{
						$this.unsetClass('template-vertical-navigation-bar-open');
					}
				}
				else
				{
					$this.toggleElement('supersized',('page-'+($this.hasClass('template-page-open') ? 'open' : 'close')),{animate:false});
				}
			}			
		};
		
		/**********************************************************************/
		/**********************************************************************/

		this.openPage=function(action,data)
		{	
			$this.unsetClass('template-enable');
			
			if(action=='open') 
			{
				$('#template-page').html('');
				$this.preloadPage(true);
			}
			else
			{
				$('#template-page').width($('#template-page').parent().width());
				
				$('body,html').css('overflow-y','hidden');
		
				$this.setTitle();
				$this.setKeywords();
				$this.setDescription();
			}
			
			var toggleOption={};
			var toggleElementComplete=0;
						
			if(action=='open') 
			{
				toggleOption=$this.setToggleOption(
				{
					duration	:	1200,
					easing		:	'easeInOutExpo',
					complete	:	function()	{ toggleElementComplete++; }
				},
				data);
			}
			else
			{
				toggleOption=$this.setToggleOption(
				{
					duration	:	1200,
					easing		:	'easeInOutExpo',
					complete	:	function()	{ toggleElementComplete++; }
				},
				data);				
			}
			
			$this.toggleElement('supersized','page-'+action,toggleOption);	
				
			$this.toggleElement('template-page-box','page-'+action,toggleOption);
				
			$this.toggleElement('template-main-carousel','page-'+action,toggleOption);

			$this.toggleElement('template-navigation-bar-vertical','page-'+action,toggleOption);

			if($this.waitOnFunction(100,
			function() 
			{
				return(toggleElementComplete>=5 ? true : false);
			},
			function() 
			{
				if(action=='open')
				{
					$this.setClass('template-page-open');
					
					$('#template-page-box').width('100%');
					$('#template-page-box').css('width','100%');
				}
				else 
				{
					$this.unsetClass('template-page-open');
					
					$('#template-page').html('').width('100%');
					
					$this.resumeMainCarousel();
				}
				
				$('body,html').css('overflow-y','auto');
				
				$this.setClass('template-enable');
				
				$this.selectMenuItem();
				
				$this.doEvent(data);
			}));			
		};
		
		/**********************************************************************/
		
		this.checkRequest=function()
		{
			var file=$this.getMeta('fileHTML');

			if($this.isEmpty(file)) file=$this.requestCurrent;

			file=$this.filename(file);
			if($this.isEmpty(file))
			{
				$this.redirect('home');
				return(false);
			}

			return(file);
		};

		/**********************************************************************/

		this.getPage=function(data)
		{
			$this.unsetClass('template-enable');
			
			$('#template-page').html('');
			$this.preloadPage(true);
	
			if($this.config.template.requestType==2)
			{
				$this.getPageComplete();
			}
			
			var file=$this.checkRequest();
			
			$.get('page/'+file,{},function(content) 
			{	
				$this.setTitle();
				$this.setKeywords();
				$this.setDescription();				
								
				$this.getPageComplete(content);
			},
			'html').error(function() 
			{ 
				$this.setClass('template-enable');
				window.location=$this.getURL('home');
			});
		};
		
		/**********************************************************************/
		
		this.getPageComplete=function(content)
		{
			var slideIndex=$this.getMeta('slideIndex');
			
			if(!$this.isEmpty(slideIndex)) $this.pauseMainCarousel(parseInt(slideIndex));
			else $this.resumeMainCarousel();
				
			$this.preloadPage(false);
				
			window.scrollTo(0,0);
				
			if(typeof(content)!=='undefined')
				$('#template-page').html(content).focus();
			
			try
			{
				$('#cs').colorSwitcher({init:false});
			}
			catch(e) {}
			
			$this.setFooterToBottom();
			$this.setFullWidthSection();
			$('#template-page').css({'display':'block'});
				
			$this.getPageJS({complete:function () 
			{
				$.waypoints('refresh');	
			}});
		
			$this.selectMenuItem();
			
			$('body,html').css('overflow-y','auto');
			
			$this.setClass('template-enable');

			return;			
		};
		
		/**********************************************************************/
		
		this.getPageJS=function(data)
		{
			$.getScript('js/page.js',function() 
			{
				var fileJS=$this.getMeta('fileJS');
				
				if($this.isEmpty(fileJS)) $this.doEvent(data);
				else
				{
					fileJS='script/'+$this.filename(fileJS);
					
					$.getScript(fileJS,function() 
					{
						$this.doEvent(data);
					});
				}
			});
		};
		
		/**********************************************************************/
		
		this.preloadPage=function(action)
		{
			$('#template-page').html();
			$('#template-page-preloader').css('display',(action ? 'block' : 'none'));
		}
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.toggleElement=function(element,action,data)
		{
			var object='';
			var properties={style:{}};
			
			switch(element)
			{
				case 'template-navigation-bar-vertical':
					
					object=$('#template-navigation-bar-vertical');
					
					switch(action)
					{
						case 'page-open':
							properties.style.left='0%';
						break;
						
						case 'page-close':
							properties.style.left='50%';
						break;
					}
					
				break;
				
				case 'template-navigation-bar-vertical-section-left':
					
					object=$('#template-navigation-bar-vertical-section-left');
					
					switch(action)
					{
						case 'vertical-navigation-bar-open':
							properties.style.width=$this.navigationBarVerticalSectionLeftWidth+'px';
						break;
						
						case 'vertical-navigation-bar-close':
							properties.style.width='0px';
						break;						
					}
	
				break;
				
				case 'template-main-carousel':
					
					object=$('#template-main-carousel');
					
					switch(action)
					{
						case 'page-open':
							properties.style.marginLeft='-50%';
						break;
						
						case 'page-close':
							properties.style.marginLeft='0%';
						break;						
					}
	
				break;
				
				case 'template-main-carousel-button':
				
					object=$('#template-main-carousel-prev-button,#template-main-carousel-next-button');
					
					switch(action)
					{
						case 'vertical-navigation-bar-open':
							properties.style.marginRight='-='+$this.navigationBarVerticalSectionLeftWidth+'px';
						break;
						
						case 'vertical-navigation-bar-close':
							properties.style.marginRight='+='+$this.navigationBarVerticalSectionLeftWidth+'px';
						break;					
					}
					
				break;
				
				case 'template-page-box':
					
					object=$('#template-page-box');
					
					switch(action)
					{
						case 'vertical-navigation-bar-open':
							properties.style.right='-='+$this.navigationBarVerticalSectionLeftWidth;
						break;
						
						case 'vertical-navigation-bar-close':
							properties.style.right='+='+$this.navigationBarVerticalSectionLeftWidth;
						break;
						
						case 'page-open':
							properties.style.width=$('#template-page-box').css('max-width');
						break;
						
						case 'page-close':
							properties.style.width='0';
						break;
						
						case 'page-open-responsive':
							properties.style.width='100%';
						break;
					}
	
				break;
				
				case 'supersized':
					
					object=$('#supersized,#supersized li');
					
					switch(action)
					{
						case 'vertical-navigation-bar-open':
							properties.style.marginLeft='+='+$this.navigationBarVerticalSectionLeftWidth+'px';
						break;

						case 'vertical-navigation-bar-close':
							properties.style.marginLeft='-='+$this.navigationBarVerticalSectionLeftWidth+'px';
						break;		

						case 'page-open':
							properties.style.left='0%';
						break;

						case 'page-close':
							properties.style.left='50%';
						break;
					}
					
					if($this.hasClass('template-responsive'))
						properties.style.marginLeft='0';					
					
				break;
			}
			
			$this.doToggle(object,properties.style,data);
		};
		
		/**********************************************************************/
		
		this.doToggle=function(object,style,data)
		{
			if(data.animate)
			{
				object.animate(style,{duration:data.duration,easing:data.easing,queue:false,complete:function() 
				{
					$this.doEvent(data);
				}});
			}
			else 
			{
				object.css(style);
				$this.doEvent(data);
			}			
		}
		
		/**********************************************************************/
		
		this.setToggleOption=function(option,data)
		{
			var optionDefault=
			{
				duration		:	800,
				easing			:	'easeOutExpo',
				animate			:	true,
				complete		:	function() {}
			};
			
			try
			{
				if(typeof(data.animate)!=='undefined')
					optionDefault.animate=data.animate;				
			}
			catch(e) {}
			
			return($.extend(optionDefault,option));
		};
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.setClass=function()
		{
			var body=$('body');
			for(var i=0;i<arguments.length;i++) body.addClass(arguments[i]);
		};
		
		/**********************************************************************/
		
		this.unsetClass=function()
		{
			var body=$('body');
			for(var i=0;i<arguments.length;i++) body.removeClass(arguments[i]);
		}
		
		/**********************************************************************/
		
		this.hasClass=function(className)
		{
			return($('body').hasClass(className));
		}
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.createMainPreloader=function(data)
		{
			$this.unsetClass('template-enable');
			
			$('#template-main-carousel ul.template-main-carousel>li .template-vertical-center-inner h2').css({opacity:1,display:'block'});
			
			var header=$('#template-main-carousel ul.template-main-carousel>li:first-child .template-vertical-center-inner h2');

			var text=header.html();
			var nText=$this.wrapText(text);
			
			header.html(nText);
			
			var countImage=$this.config.slide.length;
			var countCharacter=header.find('span').length;
			
			var countPeriod=Math.round(countCharacter/countImage);
			var countPeriodLast=countPeriod+(countCharacter-(countPeriod*countImage));
			
			var j=0

			$($this.config.slide).each(function(index) 
			{			
				var image=$(document.createElement('img'));	
				
				image.attr('src',$this.config.slide[index].image+($.browser.msie ? '?i='+$this.getRandom(1,10000) : ''));

				$(image).bind('load',function() 
				{
					var count=index==(countImage-1) ? countPeriod : countPeriodLast;
					
					for(var i=0;i<count;i++)
					{
						var span=$this.getRandomTag('span:not(.template-letter-loaded)',header);
						if(span===false) continue;
						
						span.addClass('template-letter-loaded');
						
						span.delay($this.getRandom(200,2000)).animate({opacity:1},{duration:$this.getRandom(0,200),complete:function() 
						{
							j++;
							
							if(j==countCharacter)
							{
								header.html(text);
								$this.doEvent(data);
							}
						}});
					}
				});
			});
		};
		
		/**********************************************************************/
		
		this.removeMainPreloader=function(data)
		{
			var preloader=$('#template-main-preloader');
			
			if(preloader.length==1)
			{
				$('#template-main-preloader').animate({right:'-100%'},{duration:800,easing:'easeInOutExpo',complete:function() 
				{		
					$this.doEvent(data);
				}});
			}
			else $this.doEvent(data);
		}

		/**********************************************************************/

		this.createMainCarousel=function()
		{
			var carousel=$('#template-main-carousel ul.template-main-carousel');
			carousel.carouFredSel(
			{
				auto					:	
				{
					play				:	true,
					timeoutDuration		:	5000
				},
				circular				:	true,
				infinite				:	true,
				direction				:	'left',
				responsive				:	true,
				height					:	'100%',
				width					:	'100%',
				items					: 
				{
					height				:	'100%',
					start				:	0,
					visible				:	1,
					minimum				:	1
				},
				swipe					:
				{
					onTouch				:	true,
					onMouse				:	true
				},
				scroll					: 
				{
					fx					:	'scroll',
					easing				:	'easeInOutExpo',
					duration			:	800,
					items				:	1
				},
				next					:
				{
					onAfter				:	function()
					{
						api.nextSlide();
						$this.animateTimeoutDuration();
					},
					button				:	$('#template-main-carousel-next-button')
				},
				prev					:
				{
					onAfter				:	function()
					{
						api.prevSlide();
						$this.animateTimeoutDuration();
					},
					button				:	$('#template-main-carousel-prev-button')
				},
				pagination				:	
				{
					anchorBuilder		:	function() 
					{

					},
					container			:	null
				},
				onCreate				:	function()
				{
					$this.animateTimeoutDuration();
				}
			});	
		};
		
		/**********************************************************************/
		
		this.pauseMainCarousel=function(slideIndex)
		{
			var carousel=$('#template-main-carousel ul.template-main-carousel');	
			
			carousel.trigger('slideTo',parseInt(slideIndex));
			carousel.trigger('pause');
			
			$this.mainCarouselPause=true;
		};
		
		/**********************************************************************/
		
		this.resumeMainCarousel=function()
		{
			if(!$this.mainCarouselPause) return;
			
			var carousel=$('#template-main-carousel ul.template-main-carousel');
			
			carousel.trigger('resume');
			carousel.trigger('next');
		};
		
		/**********************************************************************/
		
		this.createMainSlider=function()
		{
			$.supersized(
			{
				slides					:	$this.config.slide,
				autoplay				:	false,
				thumb_links				:	false,
				start_slide				:	1,
				fit_portrait			:	false,
				transition_speed		:	500,
				thumbnail_navigation	:	false,
				transition				:	'fade'
			});		
		};
		
		/**********************************************************************/
		
		this.animateTimeoutDuration=function()
		{
			var time=0,autoplay=0;
			
			var carousel=$('#template-main-carousel ul.template-main-carousel');

			carousel.trigger('configuration',['auto.play',function(val) 
			{ 
				autoplay=val; 
			}]);
			
			if(autoplay!=1)
			{
				carousel.find('.template-main-carousel-slide-progress-bar>span').remove();
				return;
			}
			
			carousel.trigger('configuration',['auto.timeoutDuration',function(val) 
			{ 
				time=val; 
			}]);
			
			var page=carousel.triggerHandler('currentVisible');
			
			if(page.length!=1) return;
			
			carousel.find('.template-main-carousel-slide-progress-bar>span').remove();
			
			page.find('.template-main-carousel-slide-progress-bar').append($('<span>'));
			page.find('.template-main-carousel-slide-progress-bar>span').stop().animate({width:'100%'},{duration:time,easing:'linear'});
		};
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.createMenu=function()
		{
			var self=this;
			
			$('#template-menu-box li a').bind('click',function(e) 
			{	
				self.selectMenuItem($(this));
			});
			
			$this.menuBoxScrollBar=$('#template-menu-box').jScrollPane(
			{
				mouseWheelSpeed			:	50,
				maintainPosition		:	false,
				autoReinitialise		:	true,
				autoReinitialiseDelay	:	100,
				animateScroll			:	false
			}).data('jsp');
			
			$('#template-navigation-bar-vertical-icon-menu').bind('click',function(e) 
			{
				e.preventDefault();
				if($this.hasClass('template-vertical-navigation-bar-open'))
					window.location.hash=$this.getURLQuery('menu/close');
				else window.location.hash=$this.getURLQuery('menu/open');
			});
			
			this.selectMenuItem();
		};
		
		/**********************************************************************/
		
		this.selectMenuItem=function(object)
		{
			var menu=$('#template-menu');
		
			if(typeof(object)=='undefined')
			{
				if($this.isEmpty($this.requestCurrent)) return;
				object=menu.find('a[href="'+$this.getURLQuery($this.requestCurrent)+'"]');
			}
				
			menu.find('a').removeClass('template-menu-selected');
			object.addClass('template-menu-selected');
			
			menu.find('ul').css({'display':'none'});
			object.parents('ul').css({'display':'block'});
			
			var submenu=object.next('ul');
			if(submenu.length) submenu.css({'display':'block'});
				
			var menuResponsive=$('#template-menu-responsive-select');
			
			if(menuResponsive.length==1)
			{
				menuResponsive.find('option[value="'+window.location.hash+'"]').attr('selected','selected');
			}
		};
		
		/**********************************************************************/
		
		this.createMenuResponsive=function()
		{
			var item=this.getMenuItem($('#template-menu'),0);
			
			if(!item.length) return;
			
			var select=$(document.createElement('select'));
			
			select.attr({'id':'template-menu-responsive-select','name':'template-menu-responsive-select'}).bind('change',function() 
			{
				window.location=$(this).val();
			});
			
			for(var i in item)
			{
				var option=$(document.createElement('option'));
				option.attr('value',item[i].value).text(item[i].text);
				
				select.append(option);
			}
			
			$('#template-menu-responsive').append(select);
		};
		
		/**********************************************************************/
		
		this.getMenuItem=function(menu,depth)
		{
			var i=0;
			var item=[];
			var self=this;
			
			$(menu).children('li').each(function() 
			{
				var link=$(this).children('a');
				
				var prefix='';
				for(var j=0;j<depth;j++) prefix+='-';
				
				item[i]={text:$.trim(prefix+' '+link.text()),value:link.attr('href')};
				
				if($(this).children('ul').length)
				{
					var children=self.getMenuItem($(this).children('ul'),depth+1);
					
					for(var j in children)
					{
						i++;
						item[i]=children[j];
					}
				}
				
				i++;
			});
			
			return(item);
		};
		
		/**********************************************************************/

		this.openVerticalNavigationBar=function(action,data)
		{		
			$this.unsetClass('template-enable');

			var toggleOption={};
			var toggleElementComplete=0;
			
			if(action=='open') 
			{
				$('#template-navigation-bar-vertical-icon-menu').addClass('template-navigation-bar-vertical-icon-menu-click');
				
				toggleOption=$this.setToggleOption(
				{
					duration	:	600,
					complete	:	function() { toggleElementComplete++; }
				},
				data);
			}
			else
			{
				$('#template-navigation-bar-vertical-icon-menu').removeClass('template-navigation-bar-vertical-icon-menu-click');
				
				toggleOption=$this.setToggleOption(
				{
					duration	:	600,
					complete	:	function() { toggleElementComplete++; }
				},
				data);				
			}
			
			$this.toggleElement('supersized','vertical-navigation-bar-'+action,toggleOption);	
			
			$this.toggleElement('template-main-carousel-button','vertical-navigation-bar-'+action,toggleOption);	
			
			$this.toggleElement('template-navigation-bar-vertical-section-left','vertical-navigation-bar-'+action,toggleOption);			
			
			if($this.hasClass('template-page-open')) $this.toggleElement('template-page-box','vertical-navigation-bar-'+action,toggleOption);	
	
			if($this.waitOnFunction(100,
			function() 
			{
				return($this.hasClass('template-page-open') ? toggleElementComplete>=6 : toggleElementComplete>=5);
			},
			function() 
			{
				if(action=='open') $this.setClass('template-vertical-navigation-bar-open');
				else $this.unsetClass('template-vertical-navigation-bar-open');
				
				$this.setClass('template-enable');
				
				$this.doEvent(data);
			}));			
		};

		/**********************************************************************/
		/**********************************************************************/
		
		this.isEmpty=function(value)
		{
			return($.trim(value).length>0 ? false : true);
		};
		
		/**********************************************************************/
		
		this.getRandom=function(min,max)
		{
			return((Math.floor(Math.random()*(max-min)))+min);
		};
		
		/**********************************************************************/
		
		this.getRandomTag=function(selector,parent)
		{
			var element=parent.find(selector);
			if(element.length==0) return(false);
			
			var count=element.length;
			
			return(jQuery(element[$this.getRandom(0,count-1)]));
		};

		/**********************************************************************/
		
		this.wrapText=function(text)
		{
			var nText=text.replace(/(<.*?>)|(.)/g,function(m0,tag,ch) 
			{
				return tag || ('<span>'+ch+'</span>');
			});	
			
			return(nText);
		};
		
		/**********************************************************************/
		
		this.filename=function(value)
		{
			return(value.replace(/^.*[\\\/]/, ''));
		};
		
		/**********************************************************************/
		
		this.setFooterToBottom=function()
		{
			var footer=$('#template-page-footer');
			var footerHeight=parseInt(footer.actual('height'));
			
			var pageContent=$('#template-page-content');
			
			var pageContentMargin=parseInt(pageContent.css('margin-top'))+parseInt(pageContent.css('margin-bottom'));
			
			var windowHeight=parseInt($(window).actual('height'));
			
			$('#template-page-content').css('min-height',windowHeight-pageContentMargin-footerHeight);
		};
		
		/**********************************************************************/
	
		this.setFullWidthSection=function()
		{
			var content=$('#template-page-content');
			
			var width=content.actual('outerWidth',{ includeMargin : true });
			var marginLeft=parseInt(content.css('margin-left'));
			var marginRight=parseInt(content.css('margin-left'));
			
			$('.template-full-width-section').each(function() 
			{
				var children=$(this).children('div:first');
				
				$(this).width(width);
				
				$(this).css('margin-left',-1*parseInt(marginLeft));
				
				if(!children.hasClass('template-full-width-section-margin-reset'))
					children.css({'margin-left':marginLeft,'margin-right':marginRight});
			});
		};
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.wait=function(object,className,time,callbackFunction)
		{
			var clock=window.setTimeout(function() 
			{
				if(!object.hasClass(className))
					$this.wait(object,className,time,callbackFunction);
				else
				{
					window.clearTimeout(clock);
					callbackFunction();
				}
			},time);
		};
		
		/**********************************************************************/
		
		this.waitOnFunction=function(time,waitFunction,callbackFunction)
		{
			var clockFunction=window.setTimeout(function() 
			{
				if(!waitFunction())
					$this.waitOnFunction(time,waitFunction,callbackFunction);
				else
				{
					window.clearTimeout(clockFunction);
					callbackFunction();
				}
			},time);
		};

		/**********************************************************************/

		this.doEvent=function(event)
		{
			if(typeof(event)!='undefined')
			{
				if(typeof(event.complete)!='undefined') event.complete.apply();
			};                  
		};
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.getURL=function(request)
		{
			return($this.url+$this.getURLQuery(request));
		};

		/**********************************************************************/

		this.getURLQuery=function(request)
		{
			if($this.isHashRequest() || request=='menu/open' || request=='menu/close')
			{
				return($this.config.template.hashBang+request);
			}
			else
			{
				return('?_escaped_fragment_='+request);
			}
		};

		/**********************************************************************/

		this.redirect=function(request)
		{
			window.location=$this.getURL(request);
		};
		
		/**********************************************************************/
		/**********************************************************************/
		
		this.setTitle=function()
		{
			document.title=$this.getMeta('title');
		};
			
		/**********************************************************************/
			
		this.setKeywords=function()
		{
			$('meta[name="keywords"]').attr($this.getMeta('keywords'));	
		};
			
		/**********************************************************************/
			
		this.setDescription=function()
		{
			$('meta[name="description"]').attr($this.getMeta('description'));	
		};

		/**********************************************************************/
			
		this.getMeta=function(name)
		{
			var value='';
			
			for(var i in $this.config.page)
			{
				if($this.config.page[i].hash==$this.requestCurrent)
				{
					try
					{
						value=$this.config.page[i][name];
					}
					catch(e) {}
					
					break;
				}
			}

			if(($this.isEmpty(value)) || (typeof(value)=='undefined'))
			{
				try
				{
					value=$this.config.template[name];
				}
				catch(e) {}
			}
			
			return(value);
		};

		/**********************************************************************/
		/**********************************************************************/
	};

	/**************************************************************************/

	$.fn.template=function(config)
	{
		/**********************************************************************/

		var template=new Template(config);
		template.load();

		/**********************************************************************/
	};

	/**************************************************************************/

})(jQuery);