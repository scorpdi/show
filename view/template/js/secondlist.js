$(document).ready(function(){
	var $large_box = $('.large-box');
	var $marquee = $large_box.find('.marquee');
	var $small_box = $('.small-box');
	var $show_box = $('.show-box')
	var _imgUrl = ''
	$large_box.on('mouseout',function(e){
		$marquee.hide();
		$show_box.hide();
	});
	$large_box.on('mouseover',function(){
		$marquee.show();
		$show_box.show();
		$small_box.find('li').each(function(n, e){
			var _this = $(e);
			if(_this.hasClass('on')){
				_imgUrl = _this.find('img').attr('src')
			}
		})
		$show_box.html('<img src="'+ _imgUrl +'" width="734" height="622" />')
	});
	$large_box.on('mousemove',function(e){
		//large-box位置
		var large = {
			offY: $large_box.offset().top-$(document).scrollTop(),
			offX: $large_box.offset().left
		}
		//鼠标位置
		var _mouse = {
			offX: e.clientX,
			offY: Math.abs(e.clientY)
		}
		//浮框位置
		var marquee = {
			offX: _mouse.offX-large.offX-($marquee.width()/2),
			offY: _mouse.offY-large.offY-($marquee.width()/2),
		}
		if(marquee.offY < 0){
			marquee.offY = 0
		}
		if(marquee.offY > Math.abs($large_box.height() - $marquee.height())){
			marquee.offY = Math.abs($large_box.height() - $marquee.height())
		}
		if(marquee.offX > Math.abs($large_box.width() - $marquee.width())){
			marquee.offX = Math.abs($large_box.width() - $marquee.width())
		}
		if(marquee.offX < 0){
			marquee.offX = 0
		}
		var moveRatio = {
			ratioX : -(marquee.offX/$large_box.width())*$large_box.width()*2,
			ratioY : -(marquee.offY/$large_box.height())*$large_box.height()*2
		}
		$marquee.attr('style','top:'+marquee.offY+'px;left:'+marquee.offX+'px;');

		$show_box.find('img').attr('style','position: absolute;top:'+moveRatio.ratioY+'px;left:'+moveRatio.ratioX+'px')
	});
	$('.list').hover(function () {
		var _li = $(this).children('ul').children('li').length;
		if(_li > 0){
			$(this).children('.title').toggleClass("active");
			$(this).children('ul').children('li').toggle();
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