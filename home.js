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
function navMenuAppear(){
    $('.menubtn').click(function(e){
		e.preventDefault();
    	$('#nav, #mobile-nav').toggleClass('active');
    	$(this).toggleClass('menu-on');
    });
    $('.menubtn-top').click(function(e){
    	e.preventDefault();
    	$('.topnav .navmenu').toggleClass('active')
    	$(this).toggleClass('menu-top-on')
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

function menuBarSwitch(){
	$(window).on('resize scroll click', function(){
		var $origNav = $('#nav');
		var $moveNav = $('.nav li, .nav div, .nav hr')
		var navWidth = $origNav.outerWidth();
		var $social = $('div.social');
		var socialBottom = $social.offset().top + $social.outerHeight();
		var $vidHeight = $('.vid-container').height();
		var $topNav	= $('.topnav')
		if (!$('.menubtn').hasClass('menu-on')) {
			if (socialBottom > $vidHeight) {
				$moveNav.addClass('slid-right');
				$logo.addClass('small-logo');
				$topNav.removeClass('hide-topnav');
			} else if (socialBottom < $vidHeight) {
				$moveNav.removeClass('slid-right');
				$logo.removeClass('small-logo');
				$topNav.addClass('hide-topnav');
			}
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

$(document).ready(function(){
	randomVid();
	//hide content below video
	$(window).on('load',function(){
		$('.below-fold').css({'opacity':'1','visibility':'visible'});
	});
	//toggle navmenu on click
	navMenuAppear();
    //expand navsubmenu on hover
    $('#nav .navmenu li').hover(function(){
    	$(this).closest("li").find("[class^='nav-submenu']").slideToggle();
    });
    mobileNavToggle();
    //scrollRules();
    menuBarSwitch();
	caroActionText();
});



