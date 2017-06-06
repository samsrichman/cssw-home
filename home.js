$(document).ready(function(){
    $('#menu').click(function(){
    	$('#nav').toggleClass('active');
    	$('#menu').toggleClass('menu-on');
    });
    $('.navmenu li').hover(function(){
    	$(this).closest("li").find("[class^='nav-submenu']").slideToggle();
    });
});