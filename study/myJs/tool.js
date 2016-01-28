/**
 * Created by LIUD009 on 2016/1/12.
 */
(function(window,undefined){
    window.prototype.tool = {
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
            /**
             * 深拷贝对象数组，拷贝后2个参数的属性到第一个对象中
             * @returns {*}
             */
            contactPara : function (){//保证传入3个参数如：contactPara({},testObj,testObjNew);
                var arg = arguments;
                return this._deapCopyPara(arg[0],this._deapCopyPara(arg[1],arg[2]));
            }
        }
    }
})(window);
