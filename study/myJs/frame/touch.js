/**
 * Created by LIUD009 on 2015/12/8.
 * listen touch left right
 * drag-left right
 */
;(function($,undefined){
    var Position = function(){
        this.start={x:0,y:0};
        this.end={x:0,y:0};
        this.click = false;//是否点击中 false不是点击
    };

    $.fn.extend({
        /*
        * funClall:回调函数
        * */
        moveLR:function(forward,funClall){//
            var tempPostion = new Position();
            $(this).unbind(".liudl");//avoid repeat bind
            $(this).unbind(".drag");
            $(this).bind("touchstart.liudl",function(event){
                //console.log("touchstart...");
                tempPostion.start.x = event.originalEvent.targetTouches[0].pageX;
                tempPostion.start.y = event.originalEvent.targetTouches[0].pageY;
                //drag relative
                forward=="drag"?tempPostion.click = true:tempPostion.click = false;//拖动开始
                //funClall.pre?funClall.pre():"";
                event.stopPropagation();
                event.preventDefault()
            });
            $(this).bind("touchmove.liudl",function(event){
                event.stopPropagation();
                if(event.originalEvent.targetTouches.length==1){//one figure
                    var endp = event.originalEvent.targetTouches[0];
                    tempPostion.end.x = endp.pageX;
                    tempPostion.end.y = endp.pageY;
                    //drag move...
                    tempPostion.click?funClall(endp.pageX, endp.pageY):console.log("drag over...");//while drag then active
                }
                event.stopPropagation();
                event.preventDefault()
            });
            $(this).bind("touchend.liudl",function(event){

                if(tempPostion.click){
                    tempPostion.click = false;//drag over
                    return;
                }
                tempPostion.end.x-tempPostion.start.x>10?$(this).trigger("right"):"";//trigger forward left or right
                tempPostion.end.x-tempPostion.start.x<-10?$(this).trigger("left"):"";
                tempPostion.end.y-tempPostion.start.y>10?$(this).trigger("down"):"";//trigger forward left or right
                tempPostion.end.y-tempPostion.start.y<-10?$(this).trigger("up"):"";

                //funClall.over?funClall.over():"";
                event.stopPropagation();
                event.preventDefault();
            });
            $(this).bind(forward,funClall);
            return this;
        }
    });
})(jQuery);