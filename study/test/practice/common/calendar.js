(function(window,undefined){
    var _calendar = {
        config : function(paras){//参数配置
            var _defaultP = {

            };
            return _tool.copy.contactPara({},_defaultP,paras);
        },
        init   : {//初始化日历控件方法
            config : function(paras){
                var signObj = new _calendar.init.initUi(paras);
            },
            initUi : function(paras){
                this.events.bind();
                this.data.bind();
            }
        },
        data   : {//日历控件数据模型
            bind : function(){
                this.render.bind();
            }
        },
        render : {//根据数据变化触发渲染方法
            bind : function(){}
        },
        events : {//绑定控件所有触发事件
            bind : function(){}
        }
    };
    var _tool = {
        date : {
            getDaysInMonth : function(year,month){//获取某年某月的总天数
                month = parseInt(month,10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
                var temp = new Date(year,month-1,1);
                var next = new Date(month==12?year+1:year,month==12?0:month,1);
                var days = parseInt((next.getTime()-temp.getTime())/(3600*24*1000));
                return days;
            },
            getCurrentDate : function(){
                return new Date();
            }
        },
        copy : {
            _deapCopyPara : function (){
                var newPara = arguments[0];
                var _argu = arguments[1];
                for(var item in _argu){
                    switch (Object.prototype.toString.call(_argu[item])){
                        case '[Object Array]' : newPara[item] = _argu[item].contact();break;
                        case '[Object Object]': newPara[item] = _deapCopyPara(_argu[item]);break;
                        default : newPara[item] = _argu[item];
                    }
                }
                return newPara;
            },
            contactPara : function (){//保证传入3个参数如：contactPara({},testObj,testObjNew);
                var arg = arguments;
                return _deapCopyPara(arg[0],this._deapCopyPara(arg[1],arg[2]));
            }
        }
    }
    window.calendar = _calendar.init.config;
})(window);
calendar({});