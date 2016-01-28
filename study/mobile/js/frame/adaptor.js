/**
 * Created by simon on 2015/11/16.
 * handler kinds of mobile screen,adaptor show correct in this mobile screen,
 * main function-targetDestitydpi psdWidth deviceWidth devicePixeRatio
 */
;(function(undefined){//defined a mobile object,after execute a colseure return a mobile object
    var $mobile = {//object attributes,device width,devide height with show mobile physical width and height,orientation what forward hand
        deviceWidth:window.screen.width,
        deviceHeight:window.screen.height,
        orientation:window.orientation||0,//mobile portrait horizen 90 -90 or vertical 0 180
        osType:window.navigator.userAgent.toLowerCase(),//mobile type ios or android
        devicePixelRatio:window.devicePixelRatio//physical screen pixel density ios=2,android=..
    };
    $mobile.init = function(psdWidth){
        $mobile.adaptor(psdWidth);
        $(window).bind("orientationchange",function(){
            $mobile.orientation = window.orientation||0;
            $mobile.adaptor(psdWidth);
        });
    };
    $mobile.adaptor = function(psdWidth){//start adaptor,set the mobile layout to psd size by dpi and mobile type
        //psdwidth(design psd img 100% content width) devicewidth uiwidth(layout width)
        //if psd>device then uiwidth=psd,dpi change width uiwidth and devicedpi else psd<device then uiwidth=devicewidth dpi no change
        var meta = "";//adaptor meta tag
        var targetDpi;//target dpi with uiwidth and devicedpi
        var dpr = this.devicePixelRatio;
        var uiWidth = psdWidth;//design psd width;dw>psdwidth psd show in screen middle uiwidth=screen width
        var deviceRealWidth = (this.orientation==0||this.orientation==180)?this.deviceWidth:this.deviceHeight;
        if (this.devicePixelRatio == 2 && (deviceRealWidth == 320 || deviceRealWidth == 360 || deviceRealWidth == 592 || deviceRealWidth == 640)) { deviceRealWidth *= 2;};
        if (this.devicePixelRatio == 1.5 && (deviceRealWidth == 320)) {deviceRealWidth *= 2;dpr = 2;};
        if (this.devicePixelRatio == 1.5 && (deviceRealWidth == 640)) {dpr = 2;};
        if(this.osType.indexOf("ipad")>-1 || this.osType.indexOf("iphone")>-1){
            targetDpi = this.devicePixelRatio;
            uiWidth = (document.documentElement.clientWidth<=768)?psdWidth:deviceRealWidth;//ipad
        }else{//android os
            if(psdWidth>deviceRealWidth){//psdwidth>devicewidth,minxuim show
                targetDpi = uiWidth/deviceRealWidth*dpr*160;
                meta = "target-densitydpi="+targetDpi+",";
                uiWidth = psdWidth;
            }else{//show psd width
                uiWidth = deviceRealWidth;
            }
        }
        meta = meta + "width="+uiWidth+"px,user-scalable=no";
        document.getElementsByName("viewport")[0].content = meta;
    };
    $mobile.init(750);//initial mobile page show
})();
