;
(function(window, $) {
	// 'use strict'

	$.ncommon = (function() {

		var
			_globInit = function() {},
			// 主程序入口
			_params = function() {},
			// 参数合并
			_typeof = function() {},
			// 数据类型检测
			_string = function() {},
			// 字符串类型检测
			_async = function() {},
			// 异步操作
			_request = function() {},
			// 文件操作
			_event = function() {},
			// 事件操作
			_cookie = function() {},
			// cookie操作
			_localStorage = function() {},
			// 本地存储
			_array = function() {},
			// 数组操作
			_device = function() {}
			// 设备检测
		_print = function() {}

		_params.prototype = {
			/**
			 * [parameter 合并对象]
			 * @param  {[type]} arg     [参数]
			 * @param  {[type]} bearg   [原始对象]
			 * @param  {[type]} boolean [是否需要深合并]
			 * @return {[type]}         [新对象]
			 */
			parameter: function(arg, bearg, boolean) {
				return $.extend(boolean || {}, bearg, arg || {});
			}
		}

		_typeof.prototype = {
			/**
			 * [isEmpty 是否为空]
			 * @param  {[type]}  obj  [对象]
			 * @param  {[type]}  bool [description]
			 * @return {Boolean}      [description]
			 */
			isEmpty: function(obj, bool) {
				if ((typeof obj === "undefined") || (obj === null) || (!bool ? obj === "" : false) || (this.isArray(obj) && obj.length === 0)) {
					return true
				} else {
					if (this.isObject(obj)) {
						for (var i in obj) {
							if (Object.prototype.hasOwnProperty.call(obj, i)) {
								return false
							}
						}
						return true
					};
				}
				return false
			},
			/**
			 * [isBlank 是否带有空格]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [空对象|去除空格]
			 */
			isBlank: function(obj) {
				return this.isEmpty(obj) ? true : this.isEmpty(String(obj).replace(/^\s+|\s|$/g, ""));
			},
			/**
			 * [isDefined 是否存在]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isDefined: function(obj) {
				return obj === "undefined";
			},
			/**
			 * [isObject 是否为对象]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isObject: function(obj) {
				if (Object.prototype.toString.call(null) === "[object Object]") {
					return obj !== null && obj !== undefined && Object.prototype.toString.call(obj) === "[object Object]" && obj.ownerDocument === undefined
				} else {
					return Object.prototype.toString.call(obj) === "[object Object]"
				}
			},
			/**
			 * [isFunction 是否为方法]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isFunction: function(obj) {
				return Object.prototype.toString.apply(obj) === "[object Function]"
			},
			/**
			 * [isArray 是否为数组]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isArray: function(obj) {
				return Object.prototype.toString.apply(obj) === "[object Array]"
			},
			/**
			 * [isDate 是否为日起对象]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isDate: function(obj) {
				return Object.prototype.toString.apply(l) === "[object Date]"
			},
			/**
			 * [isNumber 是否为数字]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isNumber: function(obj) {
				return typeof obj === "number" && isFinite(obj);
			},
			/**
			 * [isString 是否为字符串]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isString: function(obj) {
				return typeof obj === "string"
			},
			/**
			 * [isBoolean 是否为布尔值]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isBoolean: function(obj) {
				return typeof obj === "boolean"
			},
			/**
			 * [isJson 是否为Json]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isJson: function(obj) {
				return typeof obj === "object" && this.isObject(obj) && !obj.length;
			}
		}

		_string.prototype = { //字符串相关
			relRandom: function() {
				return ~~(Math.random() * 2e9);
			},
			isFind: function(obj, find) {
				return obj.indexOf(find) != -1;
			},
			/**
			 * [isUrl 是否为有效URL]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isUrl: function(obj) {
				if (new _typeof().isEmpty(obj)) {
					return false
				};
				var tmp = /^(https|http|ftp|rtsp|igmp|file|rtspt|rtspu):\/\/((((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d))|([0-9a-z_!~*'()-]*\.?))([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.([a-z]{2,6})(:[0-9]{1,4})?([a-zA-Z/?_=]*)\.\w{1,5}$/;
				return tmp.test(obj)
			},
			/**
			 * [isUnsignedNumeric 是否为正整数]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isUnsignedNumeric: function(obj) {
				if (new _typeof().isEmpty(obj)) {
					return false
				}
				var tmp = /^\d+(\.\d+)?$/;
				return tmp.test(obj)
			},
			/**
			 * [isInteger 是否为整数]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isInteger: function(obj) { //整数
				if (new _typeof().isEmpty(obj)) {
					return false
				}
				var tmp = /^(-|\+)?\d+$/;
				return tmp.test(obj)
			},
			/**
			 * [isUnsignedInteger 是否为服务号整数]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isUnsignedInteger: function(obj) { //无符号整数
				var tmp = /^\d+$/;
				return tmp.test(obj)
			},
			/**
			 * [isFloat 是否为浮点小数]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F][规则{/^[0-9]+\.{0,1}[0-9]{0,2}$/}]
			 */
			isFloat: function(obj) {
				if (new _typeof().isEmpty(obj)) {
					return false
				}
				var tmp = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
				return tmp.test(obj)
			},
			/**
			 * [isPhoneNum 是否为手机号码]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isPhoneNum: function(obj) {
				if (new _typeof().isEmpty(obj)) {
					return false
				};
				var tmp = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				return tmp.test(obj)
			},
			/**
			 * [isEmail 是否为邮箱]
			 * @param  {[type]}  obj [对象]
			 * @return {Boolean}     [T/F]
			 */
			isEmail: function(obj) {
				if (new _typeof().isEmpty(obj)) {
					return false
				};
				var tmp = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				return tmp.test(obj)
			}
		}

		_async.prototype = {
			/**
			 * [ajax 异步参数设置]
			 * @param  {[type]} url      [地址(必填)]
			 * @param  {[type]} timeout  [超时设置]
			 * @param  {[type]} type     [POST|GET]
			 * @param  {[type]} dataType [defaults]
			 * @param  {[type]} donecl   [完成回调]
			 * @param  {[type]} errorcl  [失败回调]
			 * @param  {[type]} alwayscl [成功|失败都执行]
			 * @return {[type]}          [返回data]
			 *
			 * 调用方法 new _async().ajax({url:<% url %>}).init();
			 * 如果有回调 new _async().ajax({url:<% url %>,done:function(){}}).init();
			 * 回调类型可以定义 done,error,always
			 */
			ajax: function() {
				var _this = this,
					_argu = arguments[0];
				// this.getType = "string";
				this.url = _argu.url || "";
				this.timeout = _argu.timeout || 0;
				this.type = _argu.type || 'GET';
				this.dataType = _argu.dataType || 'html';
				this.donecl = _argu.donecl || function() {};
				this.failcl = _argu.errorcl || function() {};
				this.alwayscl = _argu.alwayscl || function() {};
				return this
			},
			/**
			 * [init 执行异步]
			 * @param  {[type]} done     [执行预设donecl|function(){}]
			 * @param  {[type]} error    [failcl|function(){}]
			 * @param  {[type]} always   [执行预设alwayscl|function(){}]
			 * 
			 */
			init: function() {
				var _this = this;
				$.ajax({
						timeout: _this.timeout,
						url: _this.url,
						type: _this.type,
						dataType: _this.dataType,
					})
					.done(function(data) {
						_this.donecl(data);
					})
					.fail(function(error) {
						_this.failcl(error);
					})
					.always(function(always) {
						_this.alwayscl(always);
					});
				return this;
			},
			/**
			 * [script SCRIPT标签异步加载]
			 * @param  {[type]} url [SCRIPT路径]
			 * @return {[type]}     [N/A]
			 */
			script: function(url) {
				this.url = url;
				var script = document.createElement("script");
				// script.type = "text/javascript";
				script.async = true;
				script.src = this.url;
				var nodetype = document.getElementsByTagName("script")[0];
				nodetype.parentNode.insertBefore(script, nodetype);
			}
		}

		_request.prototype = {
			/**
			 * [file 获取文件by懒加载]
			 * @param  {[type]} el [DOM对象]
			 * @return {[type]}    [N/A]
			 */
			file: function(el) {
				var _this = this;
				this.el = $(el);
				/**
				 * [params 处理参数]
				 * @return {[type]} [N/A]
				 */
				this.callback = function() {};
				this.params = function() {
						_this.filehtml = this.el.data('filehtml');
						_this.filejs = this.el.data('filejs');
						_this.id = this.el.prop('id');
						return this;
					}
					/**
					 * [init 懒加载执行程序]
					 * @return {[type]} [N/A]
					 */
				this.init = function(fn) {
						// 确认回调
						if (new _typeof().isFunction(fn)) {
							_this.callback = fn;
						}
						// 取参
						_this.params().getFile();
						// 删除参数
						_this.delDate();
					}
					/**
					 * [getFile 获得文件-文件加载]
					 * @return {[type]} [N/A]
					 */
				this.getFile = function() {
						var _this = this;
						new _async().ajax({
							url: _this.filehtml + "?=" + new _string().relRandom(),
							done: function(cl) {
								_this.el.wrapInner(cl)
							}
						}).init()

						new _async().script(_this.filejs);

						return this
					}
					/**
					 * [delDate 删除参数]
					 * @return {[type]} [N/A]
					 */
				this.delDate = function() {
					_this.el.removeAttr('data-filehtml data-filejs')
				}
				return this
			}
		}

		_event.prototype = {
			lazyload: function() {
				var _argu = arguments[0];
				var _this = this;
				this.lazname = 'Js_lazyfn',
					this.lazdonname = "Js_lazyfn_done";
				this.container = $(window);
				this.params = {
					cache: []
				};
				this.total = []
				this.callback = function() {}
				this.endcallback = _argu.endcallback || function() {}
				this.cache = function() {
					$('.' + _this.lazname).each(function() {
						var node = this.nodeName.toLowerCase();
						var data = {
							obj: $(this),
							tag: node
						}
						_this.params.cache.push(data);
						_this.total.push(data.obj);
					})
					return this
				}
				this.reload = function() {
					var contHeight = $(window).height();
					if ($(window).get(0) === window) {
						contop = $(window).scrollTop();
					} else {
						contop = _this.params.container.offset().top;
					}
				}
				this.init = function(fn) {
					// 确认回调
					if (new _typeof().isFunction(fn)) {
						_this.callback = fn;
					}

					// 合并数据,绑定数据,第一次执行(必须)
					_this.cache().loading();
					// 绑定事件
					$(window).bind('scroll', _this.loading);

					return this

				}
				this.loading = function() {

					var contHeight = $(window).height(),
						contop;

					if ($(window).get(0) === window) {
						contop = $(window).scrollTop();
					} else {
						contop = _this.params.container.offset().top;
					}

					$.each(_this.params.cache, function(i, data) {
						var object = data.obj,
							tag = data.tag,
							post, posb;
						if (object) {
							post = object.offset().top - contop, post + object.height();
							if (object.hasClass(_this.lazname) && (post >= 0 && post < contHeight) || (posb > 0 && posb <= contHeight)) {
								if (_this.callback) {
									_this.callback(object)
								};
								object.addClass(_this.lazdonname);
								data.obj = _this.total[i] = null;
								var tmpnum = 0;
								for (var n = 0; n < _this.total.length; n++) {
									if (_this.total[n] == _this.total[n + 1]) {
										tmpnum += 1;
									}
								}
								if (tmpnum === _this.total.length) {
									if (_this.endcallback) {
										_this.endcallback();
									};
								};
							}
						}
					})
				}
				return this
			}
		}

		_cookie.prototype = {
			/**
			 * [getCookie 获得Cookie]
			 * @param  {[type]} name [cookiename]
			 * @return {[type]}      [cookie|null]
			 */
			getCookie: function(name) {
				var tim, rep = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
				tim = document.cookie.match(rep);
				if (tim) {
					return unescape(tim[2]);
				} else {
					return null
				}
			},
			/**
			 * [setCookie 设置Cookie]
			 * @param {[type]} name   [cookiename]
			 * @param {[type]} value  [cookievalue]
			 * @param {[type]} day    [cookie天]
			 * @param {[type]} path   [path]
			 * @param {[type]} domain [domain]
			 */
			setCookie: function(name, value, day, path, domain) {
				var rel = name + "=" + escape(value);
				if (day != "") {
					var tim = new Date();
					tim.setTime(tim.getTime() + day * 24 * 3600 * 1000);
					rel += ";expires=" + tim.toGMTString()
				}
				if (path != "") {
					rel += ";path=" + path
				}
				if (domain != "") {
					rel += ";domain=" + domain
				}
				document.cookie = rel;
			},
			/**
			 * [delCookie 删除指定Cookie]
			 * @param  {[type]} name [cookiename]
			 * @return {[type]}      [N/A]
			 */
			delCookie: function(name) {
				var tim = new Date();
				tim.setTime(tim.getTime() - 1);
				document.cookie = name + "=; expires=" + tim.toGMTString();
			},
			/**
			 * [delAllCookie 删除所有Cookie]
			 * @return {[type]} [N/A]
			 */
			delAllCookie: function() {
				var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				if (keys) {
					for (var i = keys.length; i--;) {
						document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
					}
				}
			}
		}

		_localStorage.prototype = {
			/**
			 * [isLocal 是否支持本地存储]
			 * @return {Boolean} [T/F]
			 */
			isLocal: function() {
				return window.localStorage ? true : false;
			},
			/**
			 * [getLocal 获得执行存储]
			 * @param  {[type]} name [localname]
			 * @return {[type]}      [localvalue]
			 */
			getLocal: function(name) {
				var tmp = null;
				if (this.isLocal() && name) {
					tmp = window.localStorage.getItem(name);
				};
				return tmp
			},
			/**
			 * [setLocal 设置本地存储]
			 * @param {[type]} name  [localname]
			 * @param {[type]} value [localvalue]
			 */
			setLocal: function(name, value) {
				var _this = this;
				if (this.isLocal() && name) {
					try {
						window.localStorage.setItem(name, value);
					} catch (t) {
						_this.removeAll();
						window.localStorage.setItem(name, value);
					}
				};
			},
			/**
			 * [removeLocal 删除指定本地存储]
			 * @param  {[type]} name [localname]
			 * @return {[type]}      [N/A]
			 */
			removeLocal: function(name) {
				if (this.isLocal() && name) {
					window.localStorage.removeItem(name);
				};
			},
			/**
			 * [removeAllLocal 删除所有本地存储]
			 * @return {[type]} [N/A]
			 */
			removeAllLocal: function() {
				if (this.isLocal()) {
					$.each(window.localStorage, function(name, value) {
						window.localStorage.removeItem(name)
					})
				}
			},
			/**
			 * [listLocal 显示所有本次存储with(console)]
			 * @return {[type]} [N/A]
			 */
			listLocal: function() {
				if (this.isLocal()) {
					$.each(window.localStorage, function(name, value) {
						console.log("{'" + name + "':'" + value + "''}")
					})
				};
			}

		}

		_array.prototype = {
			/**
			 * [indexOf 查找参数所属数组位置]
			 * @param  {[type]} array [数组]
			 * @param  {[type]} val   [参数]
			 * @return {[type]}       [返回位置|-1]
			 */
			indexOf: function(array, val) {
				for (var i = 0; i < array.length; i++) {
					if (array[i] == val) return i;
				}
				return -1;
			},
			/**
			 * [remove 值的位置删除]
			 * @param  {[type]} array [数组]
			 * @param  {[type]} val   [值]
			 * @return {[type]}       [返回新数组]
			 */
			remove: function(array, val) {
				var index = this.indexOf(array, val);
				if (index > -1) {
					array.splice(index, 1);
					return array;
				}
				return index;
			},
			/**
			 * [removeindex 底数删除]
			 * @param  {[type]} array [数组]
			 * @param  {[type]} index [底数]
			 * @return {[type]}       [返回新数组]
			 */
			removeindex: function(array, index) {
				return array.splice(index, 1);
			}
		}

		_device.prototype = {
			document: window.document.documentElement,
			style: window.document.body.style || window.document.documentElement.body.style,
			userAgent: window.navigator.userAgent.toLowerCase(),
			init: function() {
				this.device();
			},
			is_supportTouch: function() {
				return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
			},
			is_weixin: function() {
				if (this.userAgent.match(/MicroMessenger/i) == 'micromessenger') {
					return 'is_weixin'
				}
			},
			getVendorPrefix: function() {
				var vendor = ["webkit", "khtml", "moz", "ms", "o"],
					i = 0;
				while (i < vendor.length) {
					if (typeof this.style[vendor[i] + "Transition"] === "string") {
						return vendor[i]
					}
					i++;
				}
			},
			ios: function() {
				return this.iphone() || this.ipod() || this.ipad();
			},
			iphone: function() {
				return !this.windows() && new _string().isFind(this.userAgent, 'iphone');
			},
			ipod: function() {
				return new _string().isFind(this.userAgent, 'ipod');
			},
			ipad: function() {
				return new _string().isFind(this.userAgent, 'ipad');
			},
			android: function() {
				return !this.windows() && new _string().isFind(this.userAgent, 'android');
			},
			androidPhone: function() {
				return this.android() && new _string().isFind(this.userAgent, 'mobile');
			},
			androidTablet: function() {
				return this.android() && !new _string().isFind(this.userAgent, 'mobile');
			},
			blackberry: function() {
				return new _string().isFind(this.userAgent, 'blackberry') || new _string().isFind(this.userAgent, 'bb10') || new _string().isFind(this.userAgent, 'rim');
			},
			blackberryPhone: function() {
				return this.blackberry() && !new _string().isFind(this.userAgent, 'tablet');
			},
			blackberryTablet: function() {
				return this.blackberry() && new _string().isFind(this.userAgent, 'tablet');
			},
			windows: function() {
				return new _string().isFind(this.userAgent, 'windows')
			},
			windowsPhone: function() {
				return this.windows() && new _string().isFind(this.userAgent, 'phone');
			},
			windowsTablet: function() {
				return this.windows() && (new _string().isFind(this.userAgent, 'touch') && !this.windowsPhone());
			},
			fxos: function() {
				return (new _string().isFind(this.userAgent, '(mobile;') || new _string().isFind(this.userAgent, '(tablet;')) && new _string().isFind(this.userAgent, '; rv:');
			},
			fxosPhone: function() {
				return this.fxos() && new _string().isFind(this.userAgent, 'mobile');
			},
			fxosTablet: function() {
				return this.fxos() && new _string().isFind(this.userAgent, 'tablet');
			},
			meego: function() {
				return new _string().isFind('meego');
			},
			cordova: function() {
				return window.cordova && $location.protocol === 'file:';
			},
			nodeWebkit: function() {
				return typeof window.process === 'object';
			},
			mobile: function() {
				return this.androidPhone() || this.iphone() || this.ipod() || this.windowsPhone() || this.blackberryPhone() || this.fxosPhone() || this.meego();
			},
			tablet: function() {
				return this.ipad() || this.androidTablet() || this.blackberryTablet() || this.windowsTablet() || this.fxosTablet();
			},
			desktop: function() {
				return !this.tablet() && !this.mobile();
			},
			television: function() {
				var i, tvString;
				tvString = [
					"googletv",
					"viera",
					"smarttv",
					"internet.tv",
					"netcast",
					"nettv",
					"appletv",
					"boxee",
					"kylo",
					"roku",
					"dlnadoc",
					"roku",
					"pov_tv",
					"hbbtv",
					"ce-html"
				];
				i = 0;
				while (i < tvString.length) {
					if (new _string().isFind(this.userAgent, tvString[i])) {
						return true;
					}
					i++;
				}
				return false;
			},
			device: function() {
				if (this.ios()) {
					if (this.ipad()) {
						return "ios ipad tablet";
					} else if (this.iphone()) {
						return "ios iphone mobile";
					} else if (this.ipod()) {
						return "ios ipod mobile";
					}
				} else if (this.android()) {
					if (this.androidTablet()) {
						return "android tablet";
					} else {
						return "android mobile";
					}
				} else if (this.blackberry()) {
					if (this.blackberryTablet()) {
						return "blackberry tablet";
					} else {
						return "blackberry mobile";
					}
				} else if (this.windows()) {
					if (this.windowsTablet()) {
						return "windows tablet";
					} else if (this.windowsPhone()) {
						return "windows mobile";
					} else {
						return "desktop";
					}
				} else if (this.fxos()) {
					if (this.fxosTablet()) {
						return "fxos tablet";
					} else {
						return "fxos mobile";
					}
				} else if (this.meego()) {
					return "meego mobile";
				} else if (this.nodeWebkit()) {
					return "node-webkit";
				} else if (this.television()) {
					return "television";
				} else if (this.desktop()) {
					return "desktop";
				}
				if (this.cordova()) {
					return "cordova";
				}
			},
			portrait: function() {
				return (window.innerHeight / window.innerWidth) > 1;
			},
			landscape: function() {
				return (window.innerHeight / window.innerWidth) < 1;
			},
			handleOrientation: function() {
				if (this.portrait()) {
					return 'portrait';
				} else {
					return 'landscape';
				}
			}
		}

		_print.prototype = {

		}

		_globInit.prototype = {
			// 懒加载入口
			refer: function() {
				// 主程序.传值.执行,反传对象.执行对相对应参数
				new _event().lazyload({

					endcallback: function() {

						console.log('页面所有预加载DOM加载完毕后的回调!');

					}
				}).init(function(obj) {
					// 主程序.传值.执行
					new _request().file(obj).init();

			})

				return this
			},
			device: function() {
				new _device().init();
			}
		}

		var GLO = new _globInit();

		GLO.refer().device()

		var rel = {
			_typeof: new _typeof(),
			_string: new _string(),
			_async: new _async(),
			_cookie: new _cookie(),
			_localStorage: new _localStorage(),
			_array: new _array(),
			_device: new _device()
		}

		return rel

	})()
})(window, jQuery);


// 基类 ncommon;
// 字符串类 _string 校验字符串
// 类型类 _typeof 校验类型

// ncommon内部类 下划线+fnName
// ncommon内部方法 全小写
// 面向对象 保证new 出来的新对象可以方便使用其衍生方法
// 公共方法单独包装，并在需要的地方继承
// 链式调用原型返回this

// 懒加载标签 Js_lazyfn,Js_lazyfn_done

// 懒加载运作方式遍历网站上所有带有 .lazy_fn 标签的对象
// 当浏览器滚动到带有次标签的对象时
// 获取此对象的所有信息

// 异步此对象上的信息(html,js)
// 再地区过的对象上添加Js_lazyfn_done 类
// 并在下次便利时不遍历此对象

// 可开放接口

// var rel = {
// 	开放接口名称:所要开放的接口
// }
// revealing module pattern