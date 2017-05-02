/*********************** 层类 *******************************/

var Layer = function(supermodal,target,options){

	this.__supermodal__ = supermodal;
	this.__target__ = target;
	this.__opts__ = $.extend({},options);
};

Layer.prototype = {
	//修复构造函数指向
	constructor:Layer,
	//获取位置
	getPos:function(){
		return {
			x:this.__target__.offset().left,
			y:this.__target__.offset().top
		};
	},
	//设置位置
	setPos:function(x,y){
		this.__opts__.x = x || this.__opts__.x;
		this.__opts__.y = y || this.__opts__.y;
		this.__target__.css('left',this.__opts__.x);
		this.__target__.css('top',this.__opts__.y);
	},
	//获取大小
	getSize:function(){
		return {
			w:this.__target__.outerWidth(true),
			h:this.__target__.outerHeight(true)
		};
	},
	//设置大小
	setSize:function(w,h){
		this.__opts__.w = w || this.__opts__.w;
		this.__opts__.h = h || this.__opts__.h;
		this.__target__.width(this.__opts__.w);
		this.__target__.height(this.__opts__.h);
	},
	//设置背景色
	setColor:function(color){
		this.__opts__.color = color || this.__opts__.color;
		this.__target__.css('background-color',this.__opts__.color);
	},
	//显示
	show:function(){
		this.__target__.show();
	},
	//隐藏
	hide:function(){
		this.__target__.hide();
	},
	//淡出
	fadeOut:function(speed,callback){
		this.__target__.fadeOut(speed,callback);
	},
	//淡入
	fadeIn:function(speed,callback){
		this.__target__.fadeIn(speed,callback);
	},
	//向下滑动
	slideDown:function(speed,callback){
		this.__target__.stop().slideDown(speed,callback);
	},
	//向上滑动
	slideUp:function(speed,callback){
		this.__target__.stop().slideUp(speed,callback);
	},
	//动画
	animate:function(params,speed,callback){
		this.__target__.stop().animate(params,speed,callback);
	},
	//删除元素
	clean:function(){
		this.__target__.remove();
	}
};


/*------------------- 请在此处扩展静态方法 ----------------------------*/

Layer.position = {
	//左上
	'1':function(){
		this.__target__.css({
			'top':0,'right':'auto',
			'bottom':'auto','left':0
		});
	},
	//中上
	'2':function(){
		this.__target__.css({
			'top':0,'right':'auto',
			'bottom':'auto','left':Layer.center(this.__opts__.w)
		});
	},
	//右上
	'3':function(){
		this.__target__.css({
			'top':0,'right':0,
			'bottom':'auto','left':'auto'
		});
	},
	//左中
	'4':function(){
		this.__target__.css({
			'top':Layer.middle(this.__opts__.h),'right':'auto',
			'bottom':'auto','left':0
		});
	},
	//居中
	'5':function(){
		this.__target__.css({
			'top':Layer.middle(this.__opts__.h),'right':'auto',
			'bottom':'auto','left':Layer.center(this.__opts__.w)
		});
	},
	//右中
	'6':function(){
		this.__target__.css({
			'top':Layer.middle(this.__opts__.h),'right':0,
			'bottom':'auto','left':'auto'
		});
	},
	//左下
	'7':function(){
		this.__target__.css({
			'top':'auto','right':'auto',
			'bottom':0,'left':0
		});
	},
	//中下
	'8':function(){
		this.__target__.css({
			'top':'auto','right':'auto',
			'bottom':0,'left':Layer.center(this.__opts__.w)
		});
	},
	//右下
	'9':function(){
		this.__target__.css({
			'top':'auto','right':0,
			'bottom':0,'left':'auto'
		});
	},
	//自定义
	'custom':function(){
		this.__target__.css({
			'top':this.__opts__.topY,'right':0,
			'bottom':0,'left':this.__opts__.leftX
		});
	}
};

//水平居中
Layer.center = function(w){
	var x = $(window).width() * 0.5 - w * 0.5;
	return Math.max(x,0);
};

//垂直居中
Layer.middle = function(h){
	var y = $(window).height() * 0.5 - h * 0.5;
	return Math.max(y,0);
};

//克隆节点
Layer.cloneNode = function(target,callback){

	//参数重载
	if(typeof target === 'function'){
		callback = target;
		target = this.__target__;
	}
	
	//克隆节点
	var tempNode = target.clone();

	//设置样式在页面不可见，但是可以获取到宽高
	tempNode.css({'position':'absolute','visibility':'hidden'}).show();

	//添加克隆节点到页面
	$(document.body).append(tempNode);

	//执行回调函数
	callback && callback.call(this,tempNode);

	//删除克隆节点
	tempNode.remove();

};



//模态窗对话框：继承自Layer基类
var Modal = function(){
	Layer.apply(this,arguments);
};

//遮罩层：继承自Layer基类
var Overlay = function(){
	Layer.apply(this,arguments);
	this.setPos();
	this.setSize();
	this.setColor();
	this.setOpacity();
	this.__bindEvent__();
};


//继承基类的方法
$.extend(Modal.prototype,Layer.prototype);
$.extend(Overlay.prototype,Layer.prototype);


/*------------------- 请在此处扩展Layer层子类的方法 ----------------------------*/

Modal.prototype.init = function(){
	this.__setSize__();
	this.__setPos__();
	this.__setTabindex__();
	this.__bindEvent__();
	this.setSize();	
};

Modal.prototype.show = function(){

	this.fadeIn(this.__opts__.speed,function(){
		this.__supermodal__.fire('shown');
	}.bind(this));

};

Modal.prototype.hide = function(){

	this.fadeOut(this.__opts__.speed,function(){

		this.__supermodal__.fire('hidden');

		//销毁模态窗
		if(this.__opts__.closeType == 'close'){
			manage.remove(this);
			Dialog.overlay.distory();
			this.__supermodal__.distory();
		}

	}.bind(this));

};

Modal.prototype.__bindEvent__ = function(){

	this.__opts__.clickBoxClose && this.__target__.on('dblclick',this.hide.bind(this));
	
	this.__target__.on('mousedown',function(){
		manage.bringToFirst(this);
	}.bind(this));

};

//设置tabindex
Modal.prototype.__setTabindex__ = function(){
	this.__target__.attr('tabIndex','-1');
};

Modal.prototype.__setSize__ = function(){

	Layer.cloneNode.call(this,function(node){

		var w = node.outerHeight(true),
			h = node.outerHeight(true);

		this.__opts__.w = this.__opts__.width === 'auto' ? w : this.__opts__.width;
		this.__opts__.h = this.__opts__.height === 'auto' ? h : this.__opts__.height;

		var bodyHeight = node.find('.modal-body').height();

		this.__supermodal__.setBodyHeight(this.__opts__.h - h + bodyHeight);
	});
};

Modal.prototype.__setPos__ = function(){
	Layer.position[this.__opts__.position].call(this);
};


//设置透明度
Overlay.prototype.setOpacity = function(opacity){
	this.__opts__.opacity = opacity || this.__opts__.opacity;
	this.__target__.css('opacity',this.__opts__.opacity);
};

Overlay.prototype.__bindEvent__ = function(){

	if(this.__opts__.backdrop){
		this.__target__.on(this.__opts__.clickBgClose,this.__supermodal__.hide.bind(this.__supermodal__));
	}

};