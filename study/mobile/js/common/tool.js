/**
 * Created by liudl on 2015/12/29.
 */
//判断设备类型


function getDeviceType(){
    var bForcepc = query("dv") == "pc";

    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if(bIsIpad){
        if(!bForcepc){
            alert("ipad");
        }
    }else if(bIsIphoneOs || bIsAndroid){
        if(!bForcepc){
            alert("手机");
        }
    }else if(bIsMidp||bIsUc7||bIsUc||bIsCE||bIsWM){
        if(!bForcepc){
            alert("bIsUcbIsUc");
        }
    } else{
        alert("电脑");
    }
}

//获取参数值
function query(name){
    var sUrl = window.location.search.substr(1);
    var r = sUrl.match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
    return (r == null ? null : (r[2]));
}