//var adaptUILayout = (function () {
//	var regulateScreen = (function () {
//		var cache = {};
//		var defSize = {width: window.screen.width,height: window.screen.height};
//		var ver = window.navigator.appVersion;
//		var s = window.orientation;
//		var _ = null;
//		var check = function (key) {
//			return key.constructor == String ? ver.indexOf(key) > -1 : ver.test(key);
//		};
//		var add = function (name, key, size) {if (name && key)cache[name] = {key: key,size: size};};
//		var del = function (name) {if (cache[name])delete cache[name];};
//		var cal = function () {
//			if (_ != null)return _;
//			for (var name in cache) {
//				if (check(cache[name].key)) {
//					_ = cache[name].size;
//					break;
//				}
//			}
//			if (_ == null)_ = defSize;
//			return _;
//		};
//		return {add: add,del: del,cal: cal,s: s};
//	})();
//	var adaptViewport=function(width){
//		var flag=false;
//		if(navigator.userAgent.match(/iPad/i)&&document.documentElement.clientWidth<=768)flag=true;
//		if(!navigator.userAgent.match(/iPad/i)&&document.documentElement.clientWidth<=width)flag=true;
//		return flag;
//	};
//	var adapt = function (uiWidth) {
//		var deviceWidth,devicePixelRatio,targetDensitydpi,initialContent,head,viewport,ua;
//		ua = navigator.userAgent.toLowerCase();
//		isiOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;
//		devicePixelRatio = window.devicePixelRatio;
//		devicePixelRatio < 1.5 ? 2 : devicePixelRatio;
//		if (window.orientation == 0 || window.orientation == 180) {//竖屏-选宽高中的小的，
//			if (regulateScreen.s != 0) {//window.orientation;usual orientation
//				if (regulateScreen.cal().width < regulateScreen.cal().height) {
//					deviceWidth = regulateScreen.cal().width;
//				} else {//180^
//					deviceWidth = regulateScreen.cal().height;
//				}
//			} else {
//				deviceWidth = regulateScreen.cal().width;
//			}
//		} else {//横屏--选宽高中的大的
//			if (regulateScreen.s != 0) {
//				if (regulateScreen.cal().width > regulateScreen.cal().height) {
//					deviceWidth = regulateScreen.cal().width;
//				} else {
//					deviceWidth = regulateScreen.cal().height;
//				}
//			} else {
//				deviceWidth = regulateScreen.cal().height;
//			}
//		}
//		var s = window.orientation;
//		deviceWidth = (s==0||s==180)?regulateScreen.cal().width:regulateScreen.cal().height;
//		if (devicePixelRatio == 2 && (deviceWidth == 320 || deviceWidth == 360 || deviceWidth == 592 || deviceWidth == 640)) { deviceWidth *= 2;};
//		if (devicePixelRatio == 1.5 && (deviceWidth == 320)) {deviceWidth *= 2;devicePixelRatio = 2;};
//		if (devicePixelRatio == 1.5 && (deviceWidth == 640)) {devicePixelRatio = 2;};
//		targetDensitydpi = uiWidth / deviceWidth * devicePixelRatio * 160;
//		initialContent = isiOS ? 'width=' + uiWidth + 'px' + ', user-scalable=no': 'target-densitydpi=' + targetDensitydpi + ', width=' + uiWidth + ', user-scalable=no';
//		meta=meta=document.getElementsByName("viewport")[0];
//		meta.content = initialContent;
//	};
//	return {regulateScreen: regulateScreen,adapt: adapt,viewport:adaptViewport};
//})();
//var isViewport=adaptUILayout.viewport(750);
//if(isViewport){
//    adaptUILayout.adapt(750);
//    $(window).bind('orientationchange', function (e) {adaptUILayout.adapt(750);});
//}
//$(function(){$("body").addClass('show');try{viewport(adaptUILayout.regulateScreen.cal())}catch(e){}});




/**
 * Created by liudl on 2015/11/16.
 * handler kinds of mobile screen,adaptor show correct in this mobile screen,
 * main function-targetDestitydpi psdWidth deviceWidth devicePixeRatio
 */
;(function($,undefined){//defined a mobile object,after execute a colseure return a mobile object
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
		$(document).ready(function(){
			$("body").addClass('show');
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
		meta = meta = meta + "width="+uiWidth+"px,user-scalable=no";
		document.getElementsByName("viewport")[0].content = ""+meta;
	};
	try{$mobile.init(750);}catch(e){console.error("initial adaptor screen fail!")};//initial mobile page show
})(jQuery);

