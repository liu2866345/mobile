;(function(window, $) {
	$.content_1 = (function  () {
		// 客户端手机验证
		$('#LoginId').on({
			click:function  () {
				console.log('click');
			},
			keydown:function  () {
				console.log('keidown');
			},
			blur:function  () {
				console.log('blue');
			}
		});
	})()
})(window,jQuery);