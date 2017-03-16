
$(function(){
    var ctwswk = $("#liDropD_En");
    function init(){
        //隐藏多余国家列表
        ctwswk.show();
        ctwswk.siblings().hide();
        binevent();
    }
    function binevent(){
        $('body').on('click','.navbar-toggle',function(){
            var _this = $(this);
            var _isToggle = _this.hasClass('collapsed');
            if(_isToggle){
                _this.removeClass('collapsed');
                $('.navbar-collapse').removeClass('collapse')
            }else{
                _this.addClass('collapsed');
                $('.navbar-collapse').addClass('collapse')
            }
        }).on('mouseover','.dropdown,.nav li',function(e){
            var _this = $(this);
            var _isToggle = _this.hasClass('open');
            _this.parents('.navbar-nav').find('li').removeClass('open');
            _this.parent().find('li').removeClass('active');
            _this.addClass('active').addClass('open');
            //e.stopPropagation();
            //$(document).on('click.dropdown,.nav li',function(){
            //    var _this = $(this);
            //    _this.find('.navbar-nav').find('li').removeClass('open');
            //})
        }).on('mouseout','.dropdown,.nav li',function(){
            var _this = $(this);
            var _isToggle = _this.hasClass('open');
            _this.parents('.navbar-nav').find('li').removeClass('open');
            _this.parent().find('li').removeClass('active');
            _this.removeClass('active').removeClass('open');
        }).on('click','.lower',function(){
            var _this = $(this);
            if (ctwswk.siblings().css("display") == "none") {
                ctwswk.siblings().slideDown(300);
                _this.addClass('up')
            } else {
                ctwswk.siblings().slideUp(500);
                _this.removeClass('up')
            }
        });
    }
    init();
})