$(document).ready(function(){
	$('.list').hover(function () {
		var _li = $(this).children('li').length;
		if(_li > 0){
			$(this).children('.title').toggleClass("active");
			$(this).children('li').toggle();
		}
	});
	$('.pageOne').addClass('pageactive');
	$('.page-num').html('1/2');
	$('.page-behind').addClass('a-color');
	$('.pageOne').click(function(){
		goOne();
	});
	$('.pageTwo').click(function(){
		goTwo();
	});
	$('.page-front').click(function(){
		goOne();
	});
	$('.page-behind').click(function(){
		goTwo();
	})
	function goOne(){
		$('.page-li').removeClass('pageactive');
		$('.pageOne').addClass('pageactive');
		$('.ninelist-one').show();
		$('.ninelist-two').hide();
		$('.page-num').html('1/2');
		$('.page-behind').addClass('a-color');
		$('.page-front').removeClass('a-color');
	}
	function goTwo(){
		$('.page-li').removeClass('pageactive');
		$('.pageTwo').addClass('pageactive');
		$('.ninelist-one').hide();
		$('.ninelist-two').show();
		$('.page-num').html('2/2');
		$('.page-front').addClass('a-color');
		$('.page-behind').removeClass('a-color');
	}
});