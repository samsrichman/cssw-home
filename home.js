var $logo = $('#logo')

function tell(item){
	console.log(item);
}

function randomVid(){
	$video = $('video');
    var vidChoice = "movie" + Math.round(Math.random()+1) + ".mp4";
    $video.prepend("<source src='"+vidChoice+"'' type='video/mp4'>");
}
function mobileNavToggle(){
	$('#mobile-nav .navmenu li .item-expand').click(function(){
    	$(this).closest("li").find("[class^='nav-submenu']").slideToggle();
    	$(this).html($(this).text() == '-' ? '+' : '-');
    	$(this).closest("li").siblings().find("[class^='nav-submenu']").css({'display':'none'});
    	$(this).closest("li").siblings().find("[class^='item-expand']").html($(this).text() == '+' ? '-' : '+')
    });
}

//also adds menu item expand buttons
function navMenuAppearMobile(){
	var slideAmount = ''
	var isMobile = ''
	$(window).resize(function(){
		var screenWidth = $(window).width();
		if (screenWidth < 768) {
			slideAmount = screenWidth;
			isMobile = true
		} else {
			slideAmount = 300
			isMobile = false
		}
		if (isMobile) {
			$('.item-expand').text('+')
		} else {
			$('.item-expand').empty()

		}
	}).resize();
    $('.menubtn').click(function(e){
		e.preventDefault();
    	$(this).toggleClass('menu-btn-on');
    	if ($(this).hasClass('menu-btn-on')) {
    		$('.nav, .navmenu').css({'right':'+='+slideAmount});
    		$(window).resize(function(){
    			if (isMobile) {
    				$('.nav').css({'position':'fixed','right':'100%'})
    			} else {

    				$('.nav').css({'position':'fixed','right':'300px'})
    			}
    		});
    	} else {
    		$('.nav, .navmenu').removeAttr('style');
    	}
    });
    $('.cancel').click(function(e){
		e.preventDefault();
		$('.menubtn').toggleClass('menu-btn-on')
		if ($('.menubtn').hasClass('menu-btn-on')) {
    		$('.nav, .navmenu').css({'right':'+='+slideAmount});
    	} else {
    		$('.nav, .navmenu').removeAttr('style');
    	}
    });
   	$(document).click(function(e){
	    if ( $(e.target).closest("nav").length) {
	        return false;
	    } else if ($('.menubtn').hasClass('menu-btn-on')) {
	    	$('.menubtn').toggleClass('menu-btn-on')
			$('.nav, .navmenu').removeAttr('style');
		} 
	});
}

/**
*
* Not in Use
*
function scrollRules(){
	$(window).scroll(function(){
		var videoEnd = $video.height() + $video.position().top - $logo.height() - 21;
		var scrollPos = $(window).scrollTop();
		var hrPos = $video.height() + $video.position().top - $('hr').position().top - 15;
		var logoBg = $logo.hasClass('logo-bg');
		if (scrollPos > videoEnd - 3  ) {
			$logo.addClass('logo-bg');
		} else if (scrollPos < videoEnd + 3) {
			$logo.removeClass('logo-bg');
		}
		if (scrollPos > hrPos - 3) {
			$('hr').css({'border-top':'2px dashed rgba(0,103,172,.5)'})
		} else if (scrollPos < hrPos + 3) {
			$('hr').css({'border-top':'2px dashed rgba(255,255,255,.5)'})
		}
	});
}
*/

/*function menuBarSwitch2(){
	$(window).on('resize scroll click', function(){
		var $origNav = $('#nav');
		var $moveNav = $('.nav li, .nav div, .nav hr')
		var navWidth = $origNav.outerWidth();
		var $social = $('li.social');
		var socialBottom = $social.offset().top + $social.outerHeight();
		var $vidHeight = $('.vid-container').height();
		var $topNav	= $('.topnav')
		if (!$('.menubtn').hasClass('menu-btn-on')) {
			if (socialBottom > $vidHeight) {
				$moveNav.addClass('slid-right');
				//$logo.addClass('small-logo');
				$topNav.removeClass('hide-topnav');
			} else if (socialBottom < $vidHeight) {
				$moveNav.removeClass('slid-right');
				//$logo.removeClass('small-logo');
				$topNav.addClass('hide-topnav');
			}
		}
	});
}*/

function menuBarSwitch(){
	var navPos = $('.vid-container').height() - $('.nav').outerHeight();
	var $logo = $('#logo');
	var $logoSm = $('#logo-sm')
	$(window).on('resize scroll click', function(){
		var scrollPos = $(window).scrollTop();
		if (scrollPos < navPos) {
			$('#navcss').attr("disabled", "disabled");
			$logo.show();
			$logoSm.hide();
		} else if (scrollPos > navPos) {
			$('#navcss').removeAttr('disabled');
			$logo.hide();
			$logoSm.show();
		}
	});
}

function caroActionText() {
	$(window).on('load', function(){
		var actionText = $('.carousel-inner .active img').data('action');
		var actionLink = $('.carousel-inner .active img').data('page');
		$('.carousel-title span').html(actionText);
		$('.carousel-caption a, .item a, .carousel-title a').attr('href',actionLink);
	});
	$('#carousel-stories').on('slid.bs.carousel', function(){
		var actionText = $('.carousel-inner .active img').data('action');
		var actionLink = $('.carousel-inner .active img').data('page');
		$('.carousel-title span').html(actionText);
		$('.carousel-caption a, .item a, .carousel-title a').attr('href',actionLink);

	});
}

function learnMoreScroll() {
	$('.learn-more').click(function(){
		$('html, body').animate({
               scrollTop: $('.below-fold').position().top - 66
          }, 800);
	});
}

$(document).ready(function(){
	randomVid();
	//hide content below video
	$(window).on('load',function(){
		$('.below-fold').fadeIn(10);
	});
	//toggle navmenu on click
	navMenuAppearMobile();
    //expand navsubmenu on hover
    $('.navmenu li').hover(function(){
    	$(this).closest("li").find("[class^='nav-submenu']").slideToggle();
    });
    mobileNavToggle();
    //scrollRules();
    menuBarSwitch();
	caroActionText();
	learnMoreScroll();
});



