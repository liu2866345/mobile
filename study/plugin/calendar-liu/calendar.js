/**
 * Created by LIUD009 on 2016/1/18.
 */
;(function(win,undefined){
    var _calendarL = function(paras){
        var _this = this;//当前调用对象
        config = {//配置参数
            curMonth      : new Date(),//当前月对象
            curMonthDays  : 0,//当月总天数
            lastMonthDays : 0,//上个月总天数
            nextMonthDays : "",//下个月总天数
            btnPre        : "pre",
            btnNext       : "next",
            position      : {x:0,y:0},
            size          : {width:200,height:200},
            row           : 6,//日历行数
            colum         : 7,//日历列数
            preCallFn     : function(date){},//在显示日历前执行的用户回调 date--是要显示的当期月份对象
            overCallFn    : function(){},//在显示日历后执行的用户回调 date--是要显示的当期月份对象
            calendarId    : "calendar",//最外层日历的id
            dateUL        : "date-ul", //包含日期主题的ul的id
            callObj       : "time"//调用该控件的id
        };
        _this.method = {
            init : function(){//初始化内部参数
                //合并参数
                _this.config = _this.method.tool.contactPara({},_this.config,paras);
                _this.method.tool.initDom();
                _this.method.setPara(0);//初始显示当月
                _this.method.bindEvent();
            },
            setPara : function(month){//改变当前月对象和上月总天数
                if(typeof _this.config.preCallFn==="function"){
                    _this.config.preCallFn(_this.config.curMonth);
                }
                var _curM = _this.config.curMonth;
                var y = _curM.getFullYear();
                var m = _curM.getMonth();
                var d = _curM.getDate();
                if(month>0){
                    m==11?_curM = new Date(y+1,0,d):_curM = new Date(y,m+month,d);
                }else if(month<0){
                    m==0?_curM = new Date(y-1,11,d):_curM = new Date(y,m+month,d);
                };
                _this.config.curMonth = _curM;
                //d当月总天数
                _this.config.curMonthDays = _this.method.calculate.getDaysByDate(_curM);
                //计算上月总天数
                var _lastM = _curM.getMonth()==0?new Date(_curM.getFullYear()-1,11,1):new Date(_curM.getFullYear(),_curM.getMonth()-1,1);
                _this.config.lastMonthDays = _this.method.calculate.getDaysByDate(_lastM);
                _this.method.rend();
                if(typeof _this.config.overCallFn==="function"){
                    _this.config.overCallFn(_this.config.curMonth);
                }
            },
            bindEvent : function(){
                var _preBtn  = this.tool.select(_this.config.btnPre);
                var _nextBtn = this.tool.select(_this.config.btnNext);
                _preBtn.addEventListener("click",function(){
                    _this.method.setPara(-1);
                });
                _nextBtn.addEventListener("click",function(){
                    _this.method.setPara(1);
                });
                this.tool.select(_this.config.callObj).addEventListener("click",function(){
                    var _thisSel = _this.method.tool.select("calendar");
                    var _sty =  _this.method.tool.select("calendar").style.display;
                    _sty=="block"?_thisSel.style.display="none":_thisSel.style.display="block";
                });
            },
            rend : function(){
                //显示日历视图
                var ulContainer = _this.method.tool.select(_this.config.dateUL);
                ulContainer.innerHTML="";
                var curWeek = _this.method.calculate.getWeekByDate(_this.config.curMonth);
                for(var i=0;i < _this.config.row*_this.config.colum;i++){
                    var li = document.createElement("li");
                    var lastShowDays = 0;
                    if(curWeek.one==7){//说明是第一列前面没有山个月
                        lastShowDays = 0;
                    }else{
                        lastShowDays = curWeek.one;
                    }
                    if(i<lastShowDays){//渲染上月
                        li.setAttribute("class","last-month");
                        li.appendChild(document.createTextNode(_this.config.lastMonthDays+i-lastShowDays+1));
                    }else if(i < lastShowDays+_this.config.curMonthDays){//显示上月
                        li.setAttribute("class","cur-month");
                        if((i-lastShowDays+1)==_this.config.curMonth.getDate()){
                            li.setAttribute("class","cur-month active");
                        }
                        li.appendChild(document.createTextNode(i-lastShowDays+1));
                    }else{//显示下月
                        li.setAttribute("class","next-month");
                        li.appendChild(document.createTextNode(i-_this.config.curMonthDays-lastShowDays+1));
                    }
                    ulContainer.appendChild(li);
                }
            },
            calculate : {//计算年月
                getDaysByDate : function(date){//获取date对象对应的总天数
                    var nextDate=new Date(((date.getMonth()==11)?(date.getFullYear()+1):(date.getFullYear())),((date.getMonth()==11)?(0):(date.getMonth()+1)),1);
                    var curDate = new Date(date.getFullYear(),date.getMonth(),1);
                    var lm=nextDate.getTime();//算出上个月与1970年1月1日之间有多少毫秒例如2015年12月1号
                    var totalDays=parseInt((lm-curDate.getTime())/(1000*3600*24));
                    return totalDays;
                },
                getWeekByDate : function(date){//返回当天是星期几和1号是星期几对象
                    var _days = {cur:0,one:0};
                    _days.cur = date.getDay();
                    _days.one = (_days.cur-((date.getDate()-1)%7)+7)%7;
                    return  _days;
                }
            },
            tool : {
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
                    return _this.method.tool._deapCopyPara(arg[0],this._deapCopyPara(arg[1],arg[2]));
                },
                select : function(select){//返回选择器对象
                    return document.getElementById(select);
                },
                node : function(name){
                    this.dom  = document.createElement(name);
                    this.html = function(text){
                        this.dom.appendChild(document.createTextNode(text));
                        return this;
                    };
                    this.att  = function(key,value){
                        this.dom.setAttribute(key,value);
                        return this;
                    };
                    this.append  = function(node){
                        this.dom.appendChild(node.dom);
                        return this;
                    };
                    return this;
                },
                initDom : function(){
                    var topDiv = new this.node("div").att("class","top");
                    var topDivA1 = new this.node("a").att("class","all").att("href","#");
                    var topDivA1Span1 = new this.node("span").att("id","month").html(1);
                    var topDivA1Span2 = new this.node("span").html("月全部");
                    topDivA1.append(topDivA1Span1).append(topDivA1Span2);
                    topDiv.append(topDivA1);
                    var topDivA2 = new this.node("a").att("href","#").html("今天往后");
                    var topDivA3 = new this.node("a").att("class","close").att("href","#").html("关闭");
                    topDiv.append(topDivA2).append(topDivA3);

                //    中间部分
                    var mid = new this.node("div").att("class","middle");
                        var year = new this.node("div").att("class","year");
                            var ya1 = new this.node("a").att("href","#").att("id","pre").html("<");
                            var ya2 = new this.node("span").att("id","this_year_month");
                            var ya3 = new this.node("a").att("href","#").att("id","next").html(">");
                        year.append(ya1).append(ya2).append(ya3);
                        var week = new this.node("div").att("class","week");
                        var weekUL = new this.node("ul");
                        var weekULli1 = new this.node("li").att("class","sunday").html("日");
                        var weekULli2 = new this.node("li").html("一");
                        var weekULli3 = new this.node("li").html("二");
                        var weekULli4 = new this.node("li").html("三");
                        var weekULli5 = new this.node("li").html("四");
                        var weekULli6 = new this.node("li").html("五");
                        var weekULli7 = new this.node("li").att("class","satday").html("六");
                        weekUL.append(weekULli1).append(weekULli2).append(weekULli3).append(weekULli4).append(weekULli5).append(weekULli6).append(weekULli7);
                        week.append(weekUL);
                    mid.append(year).append(week);
                //    底部
                    var bot = new this.node("div").att("class","bottom");
                    var botUL = new this.node("ul").att("id","date-ul");
                    bot.append(botUL);
                    var outer = new this.node("div").att("class","calendar").att("id","calendar");
                    outer.append(topDiv).append(mid).append(bot);
                    var outerStyle = "position:absolute;left:0px;top:"+document.getElementById("time").offsetHeight+"px";
                    outer.att("style",outerStyle);
                    var hostDom = document.getElementById(_this.config.callObj);
                    var hostP = hostDom.parentNode;
                    hostP.style.position="relative";
                    hostP.appendChild(outer.dom);

                    hostP.appendChild(document.createTextNode("<a href='#'>文本创建a</a>"))
                }
            }
        };

        _this.init = function(){//初始化控件
            _this.method.init();
        };
        return _this.init();
    };
    win.calendar = _calendarL;
})(window);
