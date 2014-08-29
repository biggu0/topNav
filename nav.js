/**
 * 
 * @param  {[Object]} options inclide 'top' 'speed'
 * @$(e).nav({'top':500,'speed':'500'})
 */
(function($) {
	 function Nav (el, options) {
		var _ = this;
		_.options = $.extend({
			type:'slide',
			top:500,
			speed:500
		}, options);
		_.initTop = 0;
		_.flag = true;
	}
	Nav.prototype = {
		constructor : Nav,
		init : function (el, options) {
			var initTop = this.initTop;
			//初始化el的样式
			var $el = $(el);
			var offset = this.options.top;
			var speed = this.options.speed;
			$('body').css('position','relative')
			$el.css({'position':'fixed','top':'0','left':'0','width':'100%'});
			if(document.all){
				$el.attr('style',$el.attr('style')+"position:absolute;top: expression(eval(document.documentElement.scrollTop))");
				$el.css({ 
				     	'position':'absolute',
				     	'top': 'expression(eval(document.documentElement.scrollTop))'
				 });
				$('html').css({
					 'background': 'url(about:black) no-repeat fixed'
				})
			}
			$el.next().css('margin-top',$el.height());
			//根据type的类型绑定滚动触发事件
			$(window).scroll(function(){
				var scrollTop = $(window).scrollTop();
				// alert(initTop)
				if(scrollTop >= initTop && scrollTop > offset&&scrollTop >= 0 ){
					$el.slideUp(speed)	
					
				}
				if(scrollTop < initTop && el.css('display')=='none'){
						$el.slideDown(speed)
				} 
				initTop = scrollTop;
			})

		}
	}

   //jQuery 插件
  $.fn.nav = function(options) {
  	return this.each(function(index){
  		var el = $(this);
  		var navEl = (new Nav).init(el,options);
  	});		
  };
  var old = $.fn.nav;
  $.fn.nav.noConflict = function () {
    $.fn.nav = old;
    return this;
  }
})(jQuery);