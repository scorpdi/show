//滑动起来
(function(){
    var LSwiperMaker = function(o){
        var that = this;
        this.config = o;
        this.control = false;
        this.sPos = {};
        this.mPos = {};
        this.dire;
        this.startS;
        this.goMove;
        this.countDown = true;
        this.scr=1;
        this.disNub=0;
        this.isMove = false;
        // this.config.bind.addEventListener('touchstart', function(){ return that.start(); } ,false);
        // 这样不对的，event对象只在事件发生的过程中才有效;
        this.config.bind.addEventListener('touchstart', function(e){ return that.start(e); } ,false);
        this.config.bind.addEventListener('touchmove', function(e){ return that.move(e); } ,false);
        this.config.bind.addEventListener('touchend', function(e){ return that.end(e); } ,false);
    }
    LSwiperMaker.prototype.start = function(e){
        var that= this;
        var point = e.touches ? e.touches[0] : e;
        this.sPos.x = point.screenX;
        this.sPos.y = point.screenY;
        this.goMove=0;
        //document.getElementById("start").innerHTML = "y开始位置是:"+ this.sPos.y;
        $('.u-zhi,.m-top,.m-middle,.u-head').hide(500);
        $('.m-youtime').show(500);
        this.startS = this.sPos.y;
        that.goMove = 0;
        //倒计时
        if(that.countDown){
            var t=10;
            timeD();
            that.countDown=false;
        }
        function timeD(){
            if(t==0){
                //alert('倒计时结束');
                that.scr--;
                that.config.gover(that);
            }else {
                setTimeout(function(){
                    t--;
                    $('.m-youtime span').html(t+'"');
                    timeD()
                },1000)
            }
        }
    }
    LSwiperMaker.prototype.move = function(e){
        var that = this;
        var point = e.touches ? e.touches[0] : e;
        this.control = true;
        this.mPos.x = point.screenX;
        this.mPos.y = point.screenY;
        that.picMove(this.mPos.y);
    }
    //图片移动起来
    LSwiperMaker.prototype.picMove = function(moveY){
        var that = this;
        var pic= $('.u-zg3');
        //console.log(that.startS,moveY);
        var py = (that.startS - moveY);
        if(moveY < 100){
            $('.u-zg3').addClass('u-disap u-disap'+that.scr).removeClass('u-zg3');
        }
        if(py>0){
            that.goMove = py;
            $('.u-zg3').css('top',-py+'px');
            that.isMove = true;
            $('.m-sanq').removeClass('j-anim');
        }
    }
    LSwiperMaker.prototype.end = function(e){
        var that = this;
        this.control = false;
        that.goMove = Math.abs(this.startS - this.mPos.y);
        that.startS  = 0;
        //console.log(that.goMove||0);
        if(that.isMove){
            if(that.goMove >100){
                $('.u-zg3').addClass('u-disap u-disap'+that.scr).removeClass('u-zg3');
                score();
                $('.m-jkj').append('<li class="u-zg u-zg3" style="top:1rem;"></li>');
                $('.m-sanq').addClass('j-anim');
                setTimeout(function(){
                    that.disNub++;
                    $('.u-disap'+that.disNub).remove();
                },2000);
            }else{
                $('.u-zg3').css('top',1+'rem');
            }
            that.isMove= false;
        }
        this.config.backfn(this);
        //总计
        function  score(){
            scr1= that.scr++;
            $('.m-youtime i').html('￥'+scr1+'00');
        }
    }
    window.LSwiperMaker = LSwiperMaker;
}());
var HealthWeek = function(){
    this._scr;
    this._count;
};
HealthWeek.prototype = {
    //领取成功回调
    prizedCallback: function(res){
        console.log(res);
        var _status = res.success;
        if(_status){
            alert('领取成功；');
        }else{
            var _resultCode = res.resultCode;
            if(_resultCode == '00001013'|| _resultCode == '00002009'){
                alert('该奖品已领完');
                $('.m-pop6,.m-mark').show(200);
            }
            if(_resultCode == '00001014'){
                alert('参与次数超限');
                $('.m-pop5,.m-mark').show(200);
            }
            if(_resultCode == '00002002'){
                alert('该奖品用户已领过');
                $('.m-pop5,.m-mark').show(200);
            }
        }
    },
    getPrized: function(_numb, _prizeid){
        var self = this;
        var data = {
            m:'getPrize',
            prizeId: _prizeid
        };
        if(parseInt(self._scr) >= parseInt(_numb)){
            self.ajaxD(
                'mock/pirzed.json',
                data,
                function(res){self.prizedCallback(res)}
            )
        }else{
            $('.m-pop4, .m-mark').show(200);//再接再厉-积分不足
        }
    },
    //获取时间戳
    getTime: function() {
        var _time = new Date().getTime();
        console.log(_time);
        return _time;
    },
    //获取localstorage
    getLocalstorage: function(){
        var self =this;
        return localStorage.getItem('jkz-share') || 0;
    },
    //判断分享时间长度
    isShaer: function(){
        var self = this;
        var nowTime = self.getTime();
        var _getLocalstorage = self.getLocalstorage();
        var longDay = nowTime-_getLocalstorage;
        var oneDay = 60*60*24*1000;
        if(longDay < oneDay || longDay == oneDay){
            self._count ++;
        }else{
            self._count;
        }
        console.log(nowTime,_getLocalstorage,oneDay,self._count);
    },
    //第一次获取剩余次数回调
    getFrstCount: function(res) {
        var self = this;
        self._count = res.count;
        self._count --;
        self.isShaer();
        if(self._count == 0){
            $('.m-pop2, .m-mark').show(200);
            $('.m-jkj').attr('id','');
        }else{
            var s = new LSwiperMaker({
                bind:document.getElementById("touch"),  // 绑定的DOM对象
                dire_h:true,     //true 判断左右， false 判断上下
                backfn:function(o){    //回调事件
                },
                gover:function(o){//游戏结束回调
                    self._scr = o.scr;//滑动券的张数
                    $('.m-sec1,.m-youtime').hide(500);
                    $('.m-sec2,.u-zhi').show(500);
                    self._count = self._count - 1;
                    $('.m-resule').html(
                        '<p>恭喜你</p>'+
                        '<p>获得健康基金</p>'+
                        '<p class="f-fc1">￥'+self._scr+'00</p>'+
                        '<p class="f-fs1">还不赶紧兑换大礼</p>'
                    );
                }
            });
        }
        $('.m-middle .m-numb').html('<span></span>剩余'+self._count+'次游戏机会');
    },
    //第一次获取剩余次数请求入口
    actCount: function() {
        var self =this;
        var data = {
            'm': 'queryRemainCount',
            'cb': 'callback'
        };
        self.ajaxD(
            'mock/serviceCha.json',
            data,
            function(res){self.getFrstCount(res)}
        )
    },
    //ajax封装
    ajaxD: function(url,data,fn){
        var self = this;
        $.ajax({
            'url': url,
            'data': data,
            'datatype': 'json',
            success: function(res){
                fn(res);
            }
        })
    },
    bindEvent:function(){
        var self =this;
        $('.g-doc').on('click','.u-close',function(e){
            $(this).parent().hide();
            $('.m-mark').hide();
        }).on('click','.u-ture',function(){
            $(this).parent().parent().hide();
            $('.m-mark').hide();
        }).on('click','.u-actrule',function(){
            $('.m-pop1').show();
            $('.m-mark').show();
        }).on('click','.j-again',function(){

            if(self._count!==0){
                $('.m-sec2').hide(500);
                $('.m-middle .m-numb').html('<span></span>剩余'+self._count+'次游戏机会');
                $('.u-zhi,.m-top,.m-middle,.u-head,.m-sec1').show(500);
                $('.m-jkj .u-disap').remove();
            }else{
                $('.m-pop2, .m-mark').show(200);
            }
            var a = new LSwiperMaker({
                bind:document.getElementById("touch"),  // 绑定的DOM对象
                dire_h:true,     //true 判断左右， false 判断上下
                backfn:function(o){    //回调事件
                },
                gover:function(o){//游戏结束回调
                    var scr = o.scr;//滑动券的张数
                    $('.m-sec1,.m-youtime').hide(500);
                    $('.m-sec2,.u-zhi').show(500);
                    self._count = self._count - 1;
                    $('.m-resule').html(
                        '<p>恭喜你</p>'+
                        '<p>获得健康基金</p>'+
                        '<p class="f-fc1">￥'+scr+'00</p>'+
                        '<p class="f-fs1">还不赶紧兑换大礼</p>'
                    );
                }
            });
        }).on('click','.m-coupon .u-quan',function(){
            var _numb = $(this).attr('numb-data');
            var _prizeid = $(this).attr('prizeid-data');
            self.getPrized(_numb, _prizeid);
        }).on('click','.u-share,.j-shaer',function(){
            alert('分享在这里');
            self._count++;
            var nowTime = self.getTime();
            localStorage.setItem('jkz-share',nowTime);

            $('.m-sec2').hide(500);
            $('.m-middle .m-numb').html('<span></span>剩余'+self._count+'次游戏机会');
            $('.u-zhi,.m-top,.m-middle,.u-head,.m-sec1').show(500);
            $('.m-jkj .u-disap').remove();
            var a = new LSwiperMaker({
                bind:document.getElementById("touch"),  // 绑定的DOM对象
                dire_h:true,     //true 判断左右， false 判断上下
                backfn:function(o){    //回调事件
                },
                gover:function(o){//游戏结束回调
                    var scr = o.scr;//滑动券的张数
                    $('.m-sec1,.m-youtime').hide(500);
                    $('.m-sec2,.u-zhi').show(500);
                    self._count = self._count - 1;
                    $('.m-resule').html(
                        '<p>恭喜你</p>'+
                        '<p>获得健康基金</p>'+
                        '<p class="f-fc1">￥'+scr+'00</p>'+
                        '<p class="f-fs1">还不赶紧兑换大礼</p>'
                    );
                }
            });


        });
    },
    preDeftEvent:function(e){ e.preventDefault();},
    init:function(){
        var self = this;
        //localStorage.setItem('test','asdasdasda');
        //localStorage.getItem('test');
        self.bindEvent();
        document.addEventListener('touchmove',self.preDeftEvent, false);// 禁止微信touchmove冲突
        self.actCount();
    }
};
var healthweek = new HealthWeek();
healthweek.init();