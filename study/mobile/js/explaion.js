//1.规范操作方式
;(function(win,$,undefined){//undefined为了获取未改变的undefined
	//defined object
	 win.obj = function(){//定义一个需要操作的对象
		this.attribute1=1;
		this.attribute2=2;
	};
	obj.prototype.fun = function(para){//给对象附上方法
		var getOnselfAttr1 = this.attribute1;//获取对象自身属性
		$("body").css("color",para);
		console.log("getOnselfAttr1 = "+getOnselfAttr1);
		console.log("config para = "+para);
	};
	$.fn.plugin = function(options){
	    var option = {color:"red"};//定义插件默认参数
	    option = $.extend({},option,options);//扩展插件默认参数，可定制
	    var obj1 = new obj();//创建流程对象
		obj1.fun(option.color);//执行流程方法
	};
	var li = document.getElementsByTagName("li");
    for(var i=0;i<3;i++){
        // (function(kk){
            var clouseVar = (function(){return i;})();
            li[i].addEventListener("click",function(){
            this.innerHTML = clouseVar;
        });
        // })(i);
    }
})(window,jQuery);

// console.log(window.obj.fun());
