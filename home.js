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

function scrollRules(){
	$(window).scroll(function(){
		var $logo = $('#logo')
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

function menuBarSwitch(){
	$(window).scroll(function(){
		var $origNav = $('#nav');
		var navWidth = $origNav.outerWidth();
		var $social = $('div.social');
		var socialBottom = $social.offset().top + $social.outerHeight();
		var $vidHeight = $('.vid-container').height();
		if (socialBottom > $vidHeight) {
			$origNav.animate({
				left: "+="+navWidth,

			});
		}
	});
}

$(document).ready(function(){
	randomVid();
	//hide content below video
	$(window).on('load',function(){
		$('.hide-load').css({'opacity':'1','visibility':'visible'});
	});
	//toggle navmenu on click
    $('.menubtn').click(function(e){
		e.preventDefault();
    	$('#nav, #mobile-nav').toggleClass('active');
    	$('.menubtn').toggleClass('menu-on');
    });
    //expand navsubmenu on hover
    $('#nav .navmenu li').hover(function(){
    	$(this).closest("li").find("[class^='nav-submenu']").slideToggle();
    });
    mobileNavToggle();
    //scrollRules();
    menuBarSwitch();
	$('#carousel-stories').on('slid.bs.carousel', function(){
		var actionText = $('.carousel-inner .active img').data('action');
		tell(actionText)
		$('.carousel-title span').text(actionText + '?')
	});
});



