//头部双击最大化
//拖动遮罩层

var Dialog = function(){
	this.__init__.apply(this,arguments);
};

//继承全局自定义事件
$.extend(Dialog.prototype,Event,{
	//修复构造函数指向
	constructor:Dialog,
	//初始化
	__init__:function(options){
		//设置参数
		this.__opts__ = $.extend({}, Dialog.defaults, options);

		//自定义事件集合:继承自全局自定义事件集合
		this.__clients__ = $.extend(true,{},Event.__clients__);

		//按钮对象集合
		this.__btnObjs__ = [new BaseButtons(this)];

		//快捷键集合
		this.__shortcutKey__ = this.__shortcutKey__ || [];

		//层集合
		this.__layers__ = this.__layers__ || [];
	},

	//显示模态窗
	__display__:function(options){

		var opts = $.extend({}, options);

		//防止重复创建
		opts.draw = opts.draw == undefined ? true : opts.draw;

		this.__opts__.draw = true;

		this.__opts__.id = this.__opts__.id || Dialog.getTimeTick();

		//渲染模态框
		var appendWindow = this.__drawWindow__(opts);

		this.fire('__DISPLAY__',opts);

		//切换不同的模式
		this[opts.model] && this[opts.model](opts);

		//加入键盘事件
		this.__addBehaviour__();

		//加入Resize事件
		this.__addResizeBehaviour__();

		//安装按钮
		this.__injectAllButtons__();

		//初始化层
		this.__initAllLayers__();

		//把窗体添加到文档
		appendWindow();
	},

	//销毁模态窗
	__distory__:function(){

		//移除键盘事件
		this.__removeBehaviour__();

		//移除resize事件
		this.__removeResizeBehaviour__();

		this.__opts__.draw = false;

		this.fire('__DISTORY__');

		this.__clients__ = 
			this.__btnObjs__ = 
				this.__layers__ = 
					this.__shortcutKey__ = [];
	},

	//渲染模态窗
	__drawWindow__:function(opts){

		var self = this;

		//设置内容
		var html = $(Dialog.template(this.__opts__.template, {
			"_TITLE_":opts.title || "Untitled",
			"_CONTENTS_":opts.contents || ""
		}));

		//防止重复创建
	    if(opts.draw)
	    	this.target = html;
	    else
	    	this.target.html(html.html());

		//延迟执行
		return function(){

			//加入模态窗
			$(document.body).append(self.target);

			self.__show__();
			
		};	
	}
});

//解析模板
Dialog.template = function(s,d){
	for(var p in d)
		s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
	return s;
};

//遮罩层
Dialog.overlay = {
	//显示
	show:function(supermodal,opts){

		if(!overlay){

			//创建遮罩层
			overlay = createElement('div',{
				'class':'modal-backdrop'
			});

			//加入遮罩层
			$(document.body).append(overlay);

			//创建遮罩层实例对象
			overlay = new Overlay(supermodal,overlay,$.extend({},opts,{
				id:Dialog.getTimeTick(),
				w:'100%',h:'100%',
				color:opts.overlayColor,opacity:opts.overlayOpacity
			}));

			//把遮罩层实例对象添加到对话框管理
			manage.add(overlay);
		}
	},
	//销毁
	distory:function(){

		if(overlay){
			manage.remove(overlay);
			overlay = null;
		}

	}
};

Dialog.getTimeTick = function(){
	return new Date().getTime();
};

//默认配置
Dialog.defaults = {
	width:         600, //模态框宽度
	height:        300, //模态框高度
	zindex:        9999,
	position: '5', //窗体初始位置 1-左上角 2-中上 3-右上角 4-左中 5-居中 6-右中 7-左下角 8-中下 9-右下角 'custom'-自定义
	leftX: 0, //自定义位置 x
	topY: 0, //自定义位置 y
	loading:       '正在加载，请稍候...',
	iconType: '', //'warning','confirm','question','error','info'
	autoClose:     false, //是否自动关闭
	autoMin:     false, //是否自动最小化
	autoMax:     false, //是否自动最大化
	timeout:       3000, //倒计时，单位:毫秒
	closeType:     'close', //关闭方式 'close','hide'
	clickBgClose: 'dblclick', //true,'dblclick','click',false
	clickBoxClose: false, //true,'dblclick',false
	overlayOpacity:0.5, //遮罩层透明度
	overlayColor:  '#000000', //遮罩层颜色
    keyEsc:        true, //键盘上的 esc 键被按下时关闭模态框
    minButton:     false, // 最小化按钮
    maxButton:     false, // 最大化按钮
    closeButton:   true, // X close button
    hideHeader:    false, //隐藏模态框头部
    hideFooter:    false, //隐藏模态框底部
    max: false, //默认最大化，true:最大化，false:标准大小
	min: false, //默认最小化，true:最小化，false:标准大小
    show:          false, //模态框初始化之后就立即显示出来
    backdrop:      true, //是否遮罩
    btn_ok:        '确定', // Label
    btn_cancel:    '取消', // Label
    btn_close:     '关闭',
    btn_close_type: 'img', //关闭按钮类型样式 'img','text'
    btn_ok_shortcutKey:null,
    btn_cancel_shortcutKey:null,
    btn_close_shortcutKey:null,
    btn_min_shortcutKey:null,
    btn_max_shortcutKey:null,
    skinClassName: null, //皮肤样式名
    callback:null, //确认框回调函数

    dragAble: true, //是否允许拖动
	dragMask: true, //移动遮盖层
	dragRangeLimit: true, //窗体拖动范围限制 true,false (为true时下面参数有用,可以是负数)
	mxLeft: 0, //左边限制
	mxRight: 9999, //右边限制
	mxTop: 0, //上边限制
	mxBottom: 9999, //下边限制
	mxContainer: $(window), //指定限制在容器内
	dragAnchor: 200, //当窗体被拖离200px时，锚定拖动位置作为窗体起始位置
	anchor: false, //窗体是否被锚定
	fixed: true, //是否固定位置
	lockX: false, //是否锁定水平方向拖放
	lockY: false, //是否锁定垂直方向拖放
	lock: false, //是否锁屏
	topMost: false, //是否允许显示在其它窗体最上面
	topMostType: 1, //顶层窗体交换方式：1-冒泡排序，2-直接交换
	build: 'new', //当存在重复的ID时重建新的窗体 'new','rebuild','refurbish','append','show'
	reload: true, //是否重新加载内容，若不需要重新加载内容 reload:false 与 build:'show' 组合使用
	memory: false, //是否记录上次的位置
	dlgEvent: {  //事件代理
		'onStart':null,'onMove':null,'onStop':null
	},
		
    onShow:    null, //模态框显示前立即触发该事件
    onShown:     null, //模态框已经显示出来（并且同时在动画效果完成）之后被触发
    onHide:    null, //模态框隐藏前立即触发该事件
    onHidden:     null, //此事件在模态框被隐藏（并且同时在动画效果完成）之后被触发
    onMinimize:     null, //模态框最小化前立即触发该事件
    onMinimized:null, //模态框已经最小化（并且同时在动画效果完成）之后被触发
    onMaximize:     null, //模态框最大化前立即触发该事件
    onMaximized:null, //模态框已经最大化（并且同时在动画效果完成）之后被触发
    onNormalize:  null, //模态框标准化前立即触发该事件
	onNormalized:  null, //模态框已经标准化（并且同时在动画效果完成）之后被触发
    template:'<div class="modal">\
    	<div class="modal-dialog">\
        	<div class="modal-content">\
      			<div class="modal-header">\
      				<h4 class="modal-title"><i></i> {_TITLE_}</h4>\
      			</div>\
      			<div class="modal-body">{_CONTENTS_}</div>\
				<div class="modal-footer"></div>\
      		</div>\
      </div></div>'
};




/*------------------- 请在此处扩展私有方法 ----------------------------*/


//显示模态框
Dialog.prototype.__show__ = function(){

	this.fire('show');

	this.__layers__['modal'].show();

	if(this.__opts__.backdrop){
		
		//遮罩层可能已被销毁，再创建一次并防止遮罩层位于模态窗上面
		!overlay && Dialog.overlay.show(this,$.extend({},this.__opts__,{
			zindex:this.__opts__.zindex-2
		}));
		
		overlay.fadeIn(this.__opts__.speed);
	}

};

//隐藏模态框
Dialog.prototype.__hide__ = function(){

	this.fire('hide');

	this.__layers__['modal'].hide();

	overlay && overlay.fadeOut(this.__opts__.speed);

};

//加入关闭按钮
Dialog.prototype.__addCloseButton__ = function(){
	this.__btnObjs__[0].addCloseButton();
};

//加入最小化按钮
Dialog.prototype.__addMinButton__ = function(){
	this.__btnObjs__[0].addMinButton();
};

//加入最大化按钮
Dialog.prototype.__addMaxButton__ = function(){
	this.__btnObjs__[0].addMaxButton();
};

//加入确认按钮
Dialog.prototype.__addConfirmButton__ = function(){
	this.__btnObjs__[1].addConfirmButton();
};

//加入取消按钮
Dialog.prototype.__addCancelButton__ = function(){
	this.__btnObjs__[1].addCancelButton();
};

//安装按钮
Dialog.prototype.__injectAllButtons__ = function(){
	this.__btnObjs__.forEach(function(e){
		e.injectAllButtons();
	});
};

//初始化层
Dialog.prototype.__initAllLayers__ = function(){
	for(var i in this.__layers__){
		var layer = this.__layers__[i];
		layer.init && layer.init();
	}
};

//是否最小化
Dialog.prototype.__isMinimize__ = function(){
	return this.target.find('.modal-dialog').hasClass('minimize');
};

//最小化
Dialog.prototype.__minimize__ = (function(){

	var isMin = false, //是否最小化标识
		lastSize = {}; //缓存模态窗尺寸

	return function(mode){

		if(mode || !isMin){

			//保存最后一次的尺寸
			lastSize = this.getSize();

			//设置尺寸
			this.setSize(undefined,'auto');
			//触发最小化事件
			this.fire('minimize');

			//隐藏主体
			this.__slideUpBody__(function(){
				this.fire('minimized');
			}.bind(this));
			//隐藏底部
			!this.__opts__.hideFooter && this.__slideUpFooter__();

		}else{

			//还原尺寸
			this.setSize(undefined,lastSize.h);
			//触发标准化事件
			this.fire('normalize','minimize');

			//显示主体
			this.__slideDownBody__(function(){
				this.fire('normalized','minimize');
			}.bind(this));
			//显示底部
			!this.__opts__.hideFooter && this.__slideDownFooter__();
	
		}
		
		isMin = mode || !isMin;

	};

})();

//最大化
Dialog.prototype.__maximize__ = (function(){

	var isMax = false, //是否最大化标识
		lastSize = {}, //缓存模态窗尺寸
		lastPos = {}, //缓存模态窗位置
		lastBodyHeight;//缓存主体高度

	return function(mode){

		if(mode || !isMax){

			//保存最后一次的尺寸和位置
			lastSize = this.getSize();
			lastPos = this.getPos();

			//保存主体高度
			lastBodyHeight = this.getBodyHeight();

			//获取最大化主体高度
			var maxBodyHeight = this.__getMaxBodyHeight__();

			//是否最小化
			var isMin = this.__isMinimize__();

			//设置最大化窗口resize事件
			this.__setMaxResize__();
			//触发最大化事件
			this.fire('maximize');

			//设置尺寸和位置
			this.__animateModal__({'width':$(window).width(),'height':isMin ? lastSize.h : $(window).height(),'top':0,'left':0},function(){
				this.fire('maximized');
			}.bind(this));
			this.__animateBody__({'height':maxBodyHeight});

		}else{

			//设置标准窗口resize事件
			this.__setNormalResize__();
			//触发标准化事件
			this.fire('normalize','maximize');

			//还原尺寸和位置
			this.__animateModal__({'width':lastSize.w,'height':'auto','left':lastPos.x,'top':lastPos.y},function(){
				this.fire('normalized','maximize');
			}.bind(this));
			this.__animateBody__({'height':lastBodyHeight},function(){
				this.setSize(lastSize.w,'auto');
				var size = this.getSize();
				this.setSize(size.w,size.h);
			}.bind(this));

		}

		isMax = mode || !isMax;
	};

})();


//加入键盘事件
Dialog.prototype.__addBehaviour__ = function(){
	//先off再on防止重复绑定事件
	this.target.off('keydown').on('keydown',function(e){
		typeof this.__shortcutKey__[e.keyCode] === 'function' && this.__shortcutKey__[e.keyCode].call(this);
	}.bind(this));
};

//删除键盘事件
Dialog.prototype.__removeBehaviour__ = function(){
	this.target.off('keydown');
};

//添加resize事件
Dialog.prototype.__addResizeBehaviour__ = function(max){

	//先off再on防止重复绑定事件
	$(window).off('resize',this.__resizeFn__).on('resize',(function(context){
		return context.__resizeFn__ = throttle(function(){

			if(max){

				context.setSize($(window).width(),$(window).height());
				context.setBodyHeight(context.__getMaxBodyHeight__());

			}else{
				context.__setPosition__();
			}
			
		},100);

	})(this));
};

//删除resize事件
Dialog.prototype.__removeResizeBehaviour__ = function(){
	$(window).off('resize',this.__resizeFn__);	
};

//设置最大化窗口resize事件
Dialog.prototype.__setMaxResize__ = function(){
	this.__addResizeBehaviour__(true);
};

//设置标准窗口resize事件
Dialog.prototype.__setNormalResize__ = function(){
	this.__addResizeBehaviour__();
};

//隐藏模态框头部
Dialog.prototype.__hideHeader__ = function(){
	this.__layers__['modal-header'].hide();
};

//隐藏模态框主体
Dialog.prototype.__hideBody__ = function(){
	this.__layers__['modal-body'].hide();
};

//隐藏模态框底部
Dialog.prototype.__hideFooter__ = function(){
	this.__layers__['modal-footer'].hide();
};

//显示模态框头部
Dialog.prototype.__showHeader__ = function(){
	this.__layers__['modal-header'].show();
};

//显示模态框头部
Dialog.prototype.__showBody__ = function(){
	this.__layers__['modal-body'].show();
};

//显示模态框底部
Dialog.prototype.__showFooter__ = function(){
	this.__layers__['modal-footer'].show();
};

//获取最大化主体高度
Dialog.prototype.__getMaxBodyHeight__ = function(){

	var height = 0, self = this;

	['modal-header','modal-footer'].forEach(function(name){

		//克隆头部与底部的节点，获取它们的高度之和
		Layer.cloneNode.call(self.__layers__[name],function(node){
			height += node.width('100%').outerHeight(true);
		});

	});

	//返回主体高度 ( 文档高度 - 头部高度 - 底部高度 = 主体高度 )
	return $(window).height() - height;

};

Dialog.prototype.__setPosition__ = function(){
	Layer.position[this.__opts__.position].call(this.__layers__['modal']);
};

//主体向下滑动
Dialog.prototype.__slideDownBody__ = function(callback){
	this.__layers__['modal-body'].slideDown(this.__opts__.speed,callback);
};

//底部向下滑动
Dialog.prototype.__slideDownFooter__ = function(){
	this.__layers__['modal-footer'].slideDown(this.__opts__.speed);
};

//主体向上滑动
Dialog.prototype.__slideUpBody__ = function(callback){
	this.__layers__['modal-body'].slideUp(this.__opts__.speed,callback);
};

//底部向上滑动
Dialog.prototype.__slideUpFooter__ = function(){
	this.__layers__['modal-footer'].slideUp(this.__opts__.speed);
};

//模态窗动画
Dialog.prototype.__animateModal__ = function(params,callback){
	this.__layers__['modal'].animate(params,this.__opts__.speed,callback);
};

//主体动画
Dialog.prototype.__animateBody__ = function(params,callback){
	this.__layers__['modal-body'].animate(params,this.__opts__.speed,callback);
};

//模态Ajax异步请求
Dialog.prototype.__loadContents__ = function(params){

	var loadContents, loadContentExpr, loadContentFn, expr;

	loadContents = new LoadContents(this,this.target,params);
	
	for(var name in loadContentExpr = LoadContents.exMapping){

		expr = loadContentExpr[name];

		if(params.url.match(expr))
			loadContentFn = loadContents[name];
	}

	if(!loadContentFn){

		var regex = /([^\.\/]+\.[^\.\/]+)\//, //匹配顶级域名
			hostname = location.hostname + '/', //域名
    		domain = hostname.match(regex); //顶级域名
			
		//是否域名跨域
		var isCrossDomain = regex.test(params.url) && params.url.indexOf(domain) == -1;

		//如果域名跨域则调用iframe
		loadContentFn = loadContents[ isCrossDomain ? 'iframe' : 'ajax' ];

	}

	loadContentFn.call(loadContents);
	
};



/*------------------------- 请在此处扩展公有方法 ---------------------------------*/

//添加快捷键
Dialog.prototype.addShortcutKey = function(shortcutKey,clickEvent){
	this.__shortcutKey__[shortcutKey] = clickEvent;
};

//获取对话框位置
Dialog.prototype.getPos = function(){
	return this.__layers__['modal'].getPos();
};

//设置对话框位置
Dialog.prototype.setPos = function(x,y){
	this.__layers__['modal'].setPos(x,y);
};

//获取对话框大小
Dialog.prototype.getSize = function(){
	return this.__layers__['modal'].getSize();
};

//设置对话框大小
Dialog.prototype.setSize = function(w,h){
	return this.__layers__['modal'].setSize(w,h);
};

//获取主体高度
Dialog.prototype.getBodyHeight = function(){
	var size = this.__layers__['modal-body'].getSize();
	return size.h;
};

//设置主体高度
Dialog.prototype.setBodyHeight = function(h){
	this.__layers__['modal-body'].setSize(undefined,h);
};

Dialog.prototype.addArrows = function(){

	var supermodal = this,
		modalbody = this.target.find('.modal-body'),
		params = this.lightbox;

	var lightbox = new LightBox(supermodal,modalbody,params);

	lightbox.addArrows();
	
};

Dialog.prototype.display = function(options){
	this.__display__(options);
};


/*------------------- 请在此处扩展模态框的模式 ----------------------------*/

//提示框模式
Dialog.prototype['modal-alert'] = function(){
	//加入确认按钮
	this.__addConfirmButton__();
};

//确认框模式
Dialog.prototype['modal-confirm'] = function(){
	//加入取消按钮
	this.__addCancelButton__();
	//加入确认按钮
	this.__addConfirmButton__();
};

//消息框模式
Dialog.prototype['modal-message'] = function(){
	//隐藏模态框头部
    this.__hideHeader__();
    //加入确认按钮
	this.__addConfirmButton__();
};

//ajax模式
Dialog.prototype['modal-ajax'] = function(opts){

	this.__loadContents__({
		'url':opts.param.url,
		'onRequestReady':opts.param.onRequestReady,
		'onRequestComplete':opts.param.onRequestComplete,
		'onError':opts.param.onError
	});

};

//lightbox模式
Dialog.prototype['modal-lightbox'] = function(opts){

	//隐藏模态框底部
    this.__hideFooter__();

	//设置lightbox参数
	this.lightbox = {
		'element':opts.lightbox.element,
		'group':opts.lightbox.group,
		'order':opts.lightbox.order
	};

	this.__loadContents__({
		'url':opts.param.url,
		'order':this.lightbox.order,
		'onRequestReady':opts.param.onRequestReady,
		'onRequestComplete':opts.param.onRequestComplete
	});

};



/*------------------------- 请在此处扩展外部调用的方法 ---------------------------------*/


Dialog.prototype.show = function(options){

	if(!this.__opts__)
		throw new Error('模态窗已经被销毁');

	if(this.__opts__.draw)
		this.__show__();
	else
		this.__display__(options);

	return this;
};

Dialog.prototype.hide = function(){
	this.__hide__();
	return this;
};

Dialog.prototype.distory = function(){
	this.__distory__();
	return this;
};

Dialog.prototype.min = function(mode){
	this.__minimize__(mode);
	return this;
};

Dialog.prototype.max = function(mode){
	this.__maximize__(mode);
	return this;
};

//加入按钮 ( 形参顺序换了一下，方便外部调用 )
Dialog.prototype.addButton = function(label,classe,shortcutKey,clickEvent){
	this.__btnObjs__[0].proxyAddButton(label,classe,clickEvent,shortcutKey);
	return this;
};