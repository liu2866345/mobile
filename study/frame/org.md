参考对象 京东淘宝

html 必要加载项出现在head内，其余加载项都放在页面底部
css 样式尽量不要复用，定义通用css规范
js js全部在页面底部加载

如果业务需求必须要优先使用jQuery 建议使用 zepto.js来替代jQuery 执行完了后 使用 $.noConflict() 再加载 jquery

（懒加载[js]）
img 只加载用户可视范围内的img 
其他图片为次要加载项，可以通过用户移动滚动条后，当次要图片到达用户可视范围内后才开始加载。
重要控件必须优先加载，不可使用懒加载
JD 做法[添加懒加载标签lazy-fn,css 只有一个高度，这样可以防止页面高度判断错误，js路径]
js方法 闭包自执行，jsonp,success 后使用数据流的方式嵌入DOM对象中，
最后去掉DOM标签上的加载信息，直流id
<div class="floor-banner-body lazy-fn" id="lazy-floor-banner-1"  data-path="floor1-floor_banner.js" data-time="285a9d8a916ebefb24530f90e8485170"></div>

（预加载[html]）
<link rel="prefetch" href="(url)">
火狐浏览器可以禁用预加载

预加载(Link prefetch)不能跨域工作，包括跨域拉取cookies。
预加载(Link prefetch)会污染你的网站访问量统计，因为有些预加载到浏览器的页面用户可能并未真正访问。

<meta http-equiv='x-dns-prefetch-control' content='on'>
<link rel='dns-prefetch' href='http://g-ecx.images-amazon.com'>

应用场景1：我们的资源存在在不同的 CDN 中，那提前声明好这些资源的域名，就可以节省请求发生时产生的域名解析的时间。
应用场景2：如果我们知道用户接下来的操作一定会发起一起资源的请求，那就可以将这个资源进行 DNS-Prefetch，加强用户体验。

----------------------------------------
----------------------------------------

命名规则：

CSS 规范 (louis)

文件名命名规则, a_b格式，包含有：图片名称，文件夹名称，js名称，css名称，html名称等，如：demo_home.html, demo_home.js…;
class命名规则, 自身html中class按照aBc格式（驼峰），插件中出来的class按照a_b, 

JS 规范 (louis)


js对象命名规则, aBc格式（驼峰），如：function demoJs(){};
js命名规则： 入口js命名对应html命名，如：user_address.html对应user_address.js;

HTML 规范 (louis)


如：html：class="demoClass",frame：class="demo_class";
html命名规则, 模块名+page.html，如：user_address.html;

注释规则：


css注释, /*module namespace:mFunction date name*/ , 如：/* common namespace:cReset 20150609 louis*/, /* userForm namespace:ufSelect 20150609 louis*/;
[!--pagename,yourname.start,date--]

html注释, [!-- pagename,yourname,start,data --], 每个模块都需要添加start和end注释;

js注释，每个大模块用：/*******大模块********/，每个小功能或者方法注释;

----------------------------------------
----------------------------------------

JS 接口说明：

前端接口

1.	弹层异步请求
请求说明
功能：请求弹层url;
方法类型：js方法重写;
方法名称：getPopUrl();
数据返回格式：String
包含范围: 迷你购物车，加入购物车完成后弹层， 地址弹层

参数说明
key：对应弹层的key值

返回结果
	"component/popup.html";
案例
     function getPopUrl(key:String){
		if(key==")return"component/popup.html";
}

2.	请求的ajax需要的url及其他参数
请求说明
功能：请求ajax需要的数据;
方法类型：js方法重写;
方法名称：getAjaxUrl();
数据返回格式：Obiect
包含范围：迷你购物车，联想功能，产品列表分页，评论列表分页

参数说明
key：对应数据的key值

返回结果
{url:"xxx",type:"GET",dataType:"json",data:{}}
url: 请求ajax需要的url;
type: 请求ajax的类型， GET, POST, DELETE…..
dataType:返回数据的格式, json, html… //前端都是按照json 去解析
data：请求ajax需要的参数

案例
	function getAjaxUrl(key:String){
		if(key==")return {url:"xxx",type:"GET",dataType:"json",data:{}}
}

3.	Ajax请求，数据分析及html呈现

请求说明
功能： ajax请求api;
方法类型：访问api;
方法名称：无
数据返回格式：json
包含范围：迷你购物车，联想功能，产品列表分页，评论列表分页

参数说明


返回结果
'{"code":1,info:[{"id":1,"title":"xxx"}]}

案例
     无


4.	加入购物车

请求说明
功能：执行加入购物车功能;
方法类型：js方法重写;
方法名称：setAddCart();
数据返回格式：无
包含范围：整个项目的加入购物车

参数说明
el：当前点击的元素
callback: 在功能完成之后的执行返回结果
		
返回结果
无

案例
 function setAddCart(el:Element,callback:Function){
	//开始加入购物车
	//加入购物车完成或者失败后回调
	callback({result:"success"}); or callback({result:"fail"});
	//注：callback返回无， 前端将不做任何显示。
}

5.	删除购物车

请求说明
功能：执行删除购物车功能;
方法类型：js方法重写;
方法名称：setDeleteCart();
数据返回格式：无
包含范围：整个项目的删除购物车

参数说明
el：当前点击的元素
callback: 在功能完成之后的执行返回结果
		
返回结果
无

案例
 function setDeleteCart(el:Element,callback:Function){
	//开始删除购物车
	//删除购物车完成或者失败后回调
	callback({result:"success"}); or callback({result:"fail"});
	//注：callback返回无， 前端将不做任何显示。
}

6.	数字加减

请求说明
功能：执行数字加减功能;
方法类型：js方法重写;
方法名称：setNumberCart();
数据返回格式：无
包含范围：整个项目的数字加减功能

参数说明
el：当前点击的元素
callback: 在功能完成之后的执行返回结果
		
返回结果
无

案例
 function setNumberCart(el:Element,callback:Function){
	//开始执行加减功能
	//加减完成或者失败后回调
	callback({result:"success"}); or callback({result:"fail"});
	//注：callback返回无， 前端将不做任何显示。
}

7.	倒计时

请求说明
功能：倒计时功能;
方法类型：js方法重写;
方法名称：setCountDown();
数据返回格式：无
包含范围：整个项目倒计时功能

参数说明
data: 前端显示的倒计时的数据
obj:	前端当前对象和key的对应值//element, key
status: 状态为progress, complete两种状态
		
返回结果
无

案例
 function setCountDown (data:object,obj:Object,status:String){}

8.	初始列表数据方法

请求说明
功能：初始数据方法;
方法类型：执行前端js方法;
方法名称：getListData();
数据返回格式：无
包含范围：含有"加载更多"的初始化数据

参数说明
key：当前为哪个模块的数据， 默认可为null
data: 初始的json数据，根据不同模块给到不同数据
isUpdata: 当前数据是更新还是添加， 基本为true
		
返回结果
无

案例
$common.dev.getListData(key:String, data:Json, isUpdata:Boolean);

9.	百度地图

请求说明
功能：初始数据方法;
方法类型：执行前端js方法;
方法名称：getBaiduMap();
数据返回格式：无
包含范围：整个项目的地图功能

参数说明
key：当前为哪个模块的数据， 默认可为null
data: 初始给到object数据
		 isDefault：true//根据ip显示地图
		 size：18//地图缩放比例
		 isControl：true//是否显示地图标尺
		 address："xxxx"//根据地址显示地图
		 point：[x,y]//根据经纬度显示地图
		 des:"<div>我是描述</div>"//气泡显示描述
		 markers:[{point:[],des:"}]//显示多个点及气泡，des字段没有，则只显示icon，不显示气泡
		 isInfoWindow:true//初始显示气泡。默认不显示
		icon:[width,height,url,type]//自定义红点， type为lable或者icon，lable则显示数字标号

		
返回结果
无

案例
$common.dev.getBaiduMap(key:String, data:Json);


前端功能

1.	倒计时

使用方法
	<div class="time" data-time="2015-8-30,18:00:00" data-key="home"></div>

更新方法：
	$(". time").data("countDown").updata("2015-8-30,18:00:00");
参数说明：
	无
2.	全局loading

使用方法
	显示loading：$common.loading.show(obj);//参数可无，默认全屏添加loading
	取消loading:	$common.loading.hide();

更新方法：
	无
参数说明：
	obj: {dom:xx,mask:xx}
    	dom:指定元素内部显示loading
mask:建议传递body,为遮住指定元素以外的其它操作



3.	自定义平台分享

使用方法
	$common.share.weixin(url:String);
	$common.share.weibo(key:String,url:String,title:String,pic:String);

更新方法：
	无
参数说明：
	key: 对应什么平台//sina(新浪微博),renren(人人网),douban(豆瓣网),qzone(腾讯空间),qq(腾讯微博)
	url：分享的地址
	title：分享的内容
	pic：分享的图片


4.	Input相关限制

使用方法
	前端直接限制
更新方法：
	无
参数说明：
	无
功能描述：
a.	只能输入数字及长度限制// 如：手机号码, 价格等
b.	只能输入数字和字母及限制长度//如：验证码， 密码，身份证等 
c.	只能输入哪些字符
d.	禁止输入哪些字符
e.	前端的基本判断, $common.format.result(class:Class);
a)	文本为空 //code:1
b)	格式不对，// code:2, 如手机号码， 邮箱地址的基本判断
c)	字数超出或不够//code:3
返回结果：
 有错误信息：[{el:Element,code:1,message:"不能为空"},{el:Element,code:2,message:"手机号码不对"},…..]
 无错误信息:[]



5.	Video播放

使用方法
	<div class="div" data-video-img="默认图片路径" data-video-mp4="mp4视频路径" data-video-swf="flash路径"></div>
更新方法：
new $.video(".div",{ append: ".video", width:400, height:300, mp4:"video.mp4", img:"images.jpg", swf:"video.swf"});
参数说明：
	无


