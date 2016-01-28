//获取系统日期
	var date=new Date();
	var curYear=function(){return date.getFullYear();}
	var curMonth=function(){return date.getMonth()+1;}
	var curWeek=function(){return date.getDay();}
	var curDate=function(){return date.getDate();}


//通过今天是星期几判断1号是星期几
function getWeekOfFirstDay(curDate,curWeek){
	var a=(curDate-1)%7;
	var b=(curWeek)-a+7;
	var result=b%7;
	return result;
	}
	
//根据传入的年、月算出该月总共有多少天
function getDaysInMonth(curYear,curMonth){
	var thisDate=new Date(curYear,(curMonth-1),1);
	var x=thisDate.getTime();//算出当前年月1号跟1970年1月1日之间有多少毫秒例如2016年1月1号
	var nextDate=new Date(((curMonth==12)?(curYear+1):(curYear)),((curMonth==12)?(0):(curMonth)),1);
	var y=nextDate.getTime();//算出下个月与1970年1月1日之间有多少毫秒例如2016年2月1号
	var thisDays=(y-x)/(1000*3600*24); 
	return thisDays;
	}
	
//根据传入的年、月算出上个月总共有多少天
function getDaysInLastMonth(curYear,curMonth){
	var thisDate=new Date(curYear,(curMonth-1),1);
	var x=thisDate.getTime();//算出当前年月1号跟1970年1月1日之间有多少毫秒例如2016年1月1号
	var lastDate=new Date(((curMonth==1)?(curYear-1):(curYear)),((curMonth==1)?(11):(curMonth-2)),1);
	var y=lastDate.getTime();//算出上个月与1970年1月1日之间有多少毫秒例如2015年12月1号
	var lastDays=(x-y)/(1000*3600*24); 
	return lastDays;
}

//填充上月、本月、下月日期
function newFunction(curYear,curMonth,curDays){

	var week = getWeekOfFirstDay(date.getDate(),date.getDay());//获取本月1号为星期几
	var curDays =getDaysInMonth(curYear,curMonth);//获取当月天数
	var lastdays=getDaysInLastMonth(curYear,curMonth);//获取上月天数
	var str='';
	if(week==7){
		week = 0;
	}
	for( var i=0;i<curDays+week;i++){
		if(i>=week){
			str+= '<li class="'+(curDate==i-week+1?'active':'')+'">'+(i-week+1)+'</li>';
		}
		else{
			var curLast = lastdays-(week-i-1);  
			str+= '<li class="disabled">'+curLast+'</li>'
		};
	}
	var lastShowDay = week==7?0:week;
	for(var j=1;j<=42-curDays-lastShowDay;j++){
		str+= '<li class="disabled">'+j+'</li>'
	}
	document.getElementById('dateBox').innerHTML=str;
	document.getElementById("this_year_month").innerHTML=curYear+"年"+curMonth+"月";
	document.getElementById("month").innerHTML=curMonth;

	}
	

//点击左击按钮<对应年月减少并显示
function lFunction(){
		var cy = curMonth()==1?curYear()-1:curYear();
		var cm = curMonth()==1?12:curMonth()-1;
		getDaysInMonth(cy,cm);
		getDaysInLastMonth(cy,cm);
	date=new Date(cy,cm-1,date.getDate());//新建date对象，根据此date对象去显示当前页面的月份
		newFunction(cy,cm,getDaysInMonth(cy,cm));

		}

//点击左击按钮>对应年月增加并显示
function nFunction(){
		var cy = curMonth()==12?curYear()+1:curYear();
		var cm = curMonth()==12?1:curMonth()+1;
		getDaysInMonth(cy,cm);
		getDaysInLastMonth(cy,cm);
	date=new Date(cy,cm-1,date.getDate());//新建date对象，根据此date对象去显示当前页面的月份
		newFunction(cy,cm,getDaysInMonth(cy,cm));

		}

		
//调用方法显示

newFunction(curYear(),curMonth(),curDate());

	