/**
 * Created by liudl on 2015/12/22.
 * 轮播图的轮播点是js生成的em元素，父级div的class为navDot配置的
 * 左右箭头在只有一页时不显示
 * 轮播到最后一页根据lastFull判断是否为一页显示满
 * 所有参数根据$this.properties里的参数配置
 * $this.initSlid为初始化控件方法入口
 *
 */
;(function($,undefined){
    $.fn.extend({
        carouselSlide:function(configure){//轮播控件
            var $this = $(this);
            $this.initSlide = function(){
                $this.properties = $.extend({},$this.properties,configure);//配置用户参数
                $this.method.initSlideUi();//初始化轮播点，左右箭头,页码
                $this.method.bindEvent();
                $this.properties.auto?$this.method.autoPlay.start():"";
            };
            $this.properties = {
                outerCon      : "",//最外层div，即调用改控件的div
                ulCon         : "",//包裹ul的div
                preBtn        : "",//向前按钮
                nextBtn       : "",//向后按钮
                navDot        : "",//轮播点div em
                hideArrow     : false,//是否隐藏左右箭头
                hideDot       : false,//是否隐藏轮播点
                showDotNum    : false,//轮播点出现时页码
                auto          : true,//是否自动播放，默认false
                loop          : true,//可以循环点击
                lastFull      : false,//最后一页是否填充
                speed         : 5,//速度
                time          : 1000,//定时器调用延时
                easing        : "swing",
                eachPageNum   : 1,//每页含有的li的个数
                eventType     : [],//绑定事件数组
                slideHorizon  : true,//水平方向滑动
                slideVertical : false,//垂直方向滑动
                preExecute    : function(currentPage){},//在轮播之前执行方法
                callback      : function(pageNum){},//渲染后回调方法,pageNum当前页吗
                asyn          : {//控制是否要在轮播中异步请求数据，其中isNeedAsyn（）方法根据用户配置在每次轮播中是否要 请求数据，返回true就是需要异步请求数据，请求url和data用户提供
                    type       : "post",
                    url        : function(pageNum){},
                    data       : function(pageNum){},
                    isNeedAsyn : function(pageNum){return false;},
                    success    : function(data,pageNum){},
                    fail       : function(data,pageNum){}
                },//是否需要异步获取每一页里的数据 asyn.isNeedAsyn()开发设置需要异步条件返回true为需要异步
                dynamicPara   : {
                    current   : 1,//当前操作页码
                    totalNum  : null,//总页数
                    timer     : null//定时器对象
                }
            };
            $this.method = {
                initSlideUi : function(){
                    //算出ul的宽度
                    if($this.properties.slideHorizon){
                        var _ulWIdth = $($this.properties.ulCon).find("li").outerWidth() * $($this.properties.ulCon).find("li").size();
                        $($this.properties.ulCon).find("ul").css("width",_ulWIdth);
                    }else{
                        var _ulHeight = $($this.properties.ulCon).find("li").outerHeight() * $($this.properties.ulCon).find("li").size();
                        $($this.properties.ulCon).find("ul").css("height",_ulHeight);
                    }
                    //默认显示第一页
                    $this.method.setPara();

                    //初始化轮播点，左右箭头
                    if($this.properties.dynamicPara.totalNum <= 1){
                        $($this.properties.preBtn).hide();
                        $($this.properties.nextBtn).hide();
                        return "lt one page";
                    }
                    if($this.properties.hideArrow){
                        $($this.properties.preBtn).hide();
                        $($this.properties.nextBtn).hide();
                    }
                    if($this.properties.hideDot){
                        return;
                    }
                    if($this.properties.showDotNum){
                        var dotc = $("<em class='dot-cur-num'>").html(1);
                        var label = $("<label class='dot-cur-se'>").html("/");
                        var dott = $("<em class='dot-total-num'>").html($this.properties.dynamicPara.totalNum);
                        $($this.properties.navDot).append(dotc).append(label).append(dott);
                        return;
                    }
                    for(var i=0;i<$this.properties.dynamicPara.totalNum;i++){
                        var dotEm = $("<em>");
                        $($this.properties.navDot).append(dotEm);
                        i==0?dotEm.addClass("cur"):'';
                    }
                    $this.method.asynchron(null,1,1);
                },
                setPara : function(){//设置轮播参数，包括页码，是否需要渲染， pageNum需要跳到的页码
                    //是否有1页以上,
                    var _ul = $($this.properties.ulCon);
                    var _ulLi = _ul.find("li");
                    var _current = $this.properties.dynamicPara.current;
                    //设置参数前执行 用户预执行方法预先加载第一页内容
                    $this.properties.preExecute(_current);
                    var totalPage = $this.properties.dynamicPara.totalNum||(((_ulLi.size())%$this.properties.eachPageNum==0)?(_ulLi.size())/$this.properties.eachPageNum:parseInt((_ulLi.size())/$this.properties.eachPageNum)+1);
                    $this.properties.dynamicPara.totalNum = totalPage;
                    if(totalPage > 1){//设置页码
                        if(_current <= 0){
                            $this.properties.loop?$this.properties.dynamicPara.current=totalPage:$this.properties.dynamicPara.current=1;
                        }
                        if(_current > totalPage){
                            !$this.properties.loop?$this.properties.dynamicPara.current=totalPage:$this.properties.dynamicPara.current=1;
                        }
                        $this.method.render();
                    }
                },
                render : function(){//根据页码参数渲染css样式,如果lastFull为true，那么最后一页需要填满,渲染后执行回调
                    var _moveLeft;
                    var _current = $this.properties.dynamicPara.current;
                    var _liWidth = $this.properties.slideHorizon?($($this.properties.ulCon).find("li").outerWidth()):($($this.properties.ulCon).find("li").outerHeight());
                    var _ulWidth = _liWidth*$($this.properties.ulCon).find("li").size();
                    var moveOritention = $this.properties.slideHorizon?"left":"top";
                    //改变中间轮播主体
                    _moveLeft = ($this.properties.dynamicPara.current-1)*_liWidth*$this.properties.eachPageNum;
                    if($this.properties.dynamicPara.totalNum == _current){//是不是最后一页
                        if($this.properties.lastFull){
                            _moveLeft = _ulWidth - $this.properties.eachPageNum*_liWidth;
                        }
                    }
                    //滑动主体部分
                   if($this.properties.slideHorizon){
                       $($this.properties.ulCon).find("ul").animate({"left":-_moveLeft},$this.properties.speed,$this.properties.easing,function(){
                          $this.method.changeOverStyle();
                       });
                   }else{
                       $($this.properties.ulCon).find("ul").animate({"top":-_moveLeft},$this.properties.speed,$this.properties.easing,function(){
                           $this.method.changeOverStyle();
                       });
                   }
                    //改变轮播点
                    if($this.properties.showDotNum){
                        $($this.properties.navDot).find("em:eq(0)").html(_current);
                    }else{
                        $($this.properties.navDot).find("em").removeClass("cur");
                        $($this.properties.navDot).find("em:eq("+(_current-1)+")").addClass("cur");
                    }

                    //rend pre next button
                    $($this.properties.preBtn).css({"opacity":1,"filter":"alpha(opacity=100)","cursor":"pointer"});
                    $($this.properties.nextBtn).css({"opacity":1,"filter":"alpha(opacity=100)","cursor":"pointer"});
                    if(!$this.properties.loop&&(_current == 1|| _current == $this.properties.dynamicPara.totalNum)){
                        _current == 1?$($this.properties.preBtn).css({"opacity":.5,"filter":"alpha(opacity=50)","cursor":"default"}):"";
                        _current == $this.properties.dynamicPara.totalNum?$($this.properties.nextBtn).css({"opacity":0.5,"filter":"alpha(opacity=50)","cursor":"default"}):"";
                        return "non loop";
                    }
                },
                bindEvent : function(){//绑定轮播事件，包括：outerCon移出移入，pre、next点击、navDot点击
                    //绑定最外层div的移出移入事件
                    $($this.properties.outerCon).bind("mouseover",function(){
                        $this.method.autoPlay.stop();
                    }).bind("mouseout",function(){
                        $this.method.autoPlay.start();
                    });
                    //绑定按钮和轮播点事件
                    $($this.properties.preBtn).bind("click",function(e){
                        if($(this).hasClass("clicking")){return "pre double click..."};
                        $(this).addClass("clicking");
                        var _curr = $this.properties.dynamicPara.current;
                        $this.method.asynchron(e,_curr,_curr-1);
                    });
                    $($this.properties.nextBtn).bind("click",function(e){
                        if($(this).hasClass("clicking")){return "next double click..."};
                        $(this).addClass("clicking");
                        var _curr = $this.properties.dynamicPara.current;
                        $this.method.asynchron(e,_curr,_curr+1);
                    });
                    $($this.properties.navDot).find("em").bind("click",function(e){
                        if($(this).hasClass("clicking")){return "em double click..."};
                        $(this).addClass("clicking");
                        var _curr = $this.properties.dynamicPara.current;
                        $this.method.asynchron(e,_curr,$(this).index()+1);
                    });
                    //touch事件,用于移动端时要引入touch。js
                    try{
                        $($this.properties.ulCon).bind("touchstart",function(){
                            $this.method.autoPlay.stop();
                        }).bind("touchend",function(){
                            $this.method.autoPlay.start();
                        });
                        if($this.properties.slideHorizon){
                            $($this.properties.ulCon).moveLR("left",function(){
                                $($this.properties.preBtn).trigger("click");
                            }).moveLR("right",function(){
                                $($this.properties.nextBtn).trigger("click");
                            })
                        }else{
                            $($this.properties.ulCon).moveLR("up",function(){
                                $($this.properties.preBtn).trigger("click");
                            }).moveLR("down",function(){
                                $($this.properties.nextBtn).trigger("click");
                            });
                        }
                    }catch (e){console.log("未找到touch.js");}
                },
                autoPlay : {//激活和停止定时播放器
                    start : function(){//判断是否可以自动播放
                        if(!$this.properties.auto){
                            return false;
                        }
                        $this.properties.dynamicPara.timer = setInterval(function(){
                            var _curr = $this.properties.dynamicPara.current;
                            $this.method.asynchron(null,_curr,_curr+1);
                        },$this.properties.speed*$this.properties.time);
                    },
                    stop : function(){
                        clearInterval($this.properties.dynamicPara.timer);
                    }
                },
                changeOverStyle : function(){
                    $($this.properties.preBtn).removeClass("clicking");//移除重复点击控制
                    $($this.properties.nextBtn).removeClass("clicking");//移除重复点击控制
                    if(Object.prototype.toString.apply($this.properties.callback) === "[object Function]"){
                        $this.properties.callback($this.properties.dynamicPara.current);
                    }
                },
                asynchron : function(e,current,newPage){//异步方法  在执行轮播前先执行异步方法，在异步方法执行成功后执行轮播渲染，
                    var _totalPage = $this.properties.dynamicPara.totalNum;
                    newPage == _totalPage+1?newPage=1:"";
                    newPage == 0?newPage=_totalPage:"";
                    if($this.properties.asyn.isNeedAsyn(newPage)){//判断下一页是否要重新加载
                            $.ajax({
                                data:$this.properties.asyn.data(newPage),
                                type:$this.properties.asyn.type,
                                url:$this.properties.asyn.url(newPage),
                                success:function(data){
                                    $this.properties.asyn.success(data,newPage);//执行开发需要的异步成功后的处理逻辑
                                    $this.properties.dynamicPara.current = newPage;
                                    $this.method.setPara();
                                    if(e){
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }
                                },
                                error:function(data){
                                    $this.properties.asyn.fail(data,newPage);
                                    $this.properties.dynamicPara.current = current;
                                    $this.method.setPara();
                                    if(e){
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }
                                }
                            });
                    }else{//不需要异步加载数据直接slide
                        $this.properties.dynamicPara.current = newPage;
                        $this.method.setPara();
                        if(e){
                            e.stopPropagation();
                            e.preventDefault();
                        }
                    };

                }
            };
            $this.initSlide();//初始化控件
        }
    });
})(jQuery);
