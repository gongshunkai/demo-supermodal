/*********************** 按钮类 *******************************/

//按钮基类
var BaseButtons = function(context,container,options){
	//按钮集合
	this.__buttons__ = [];
	//执行上下文
	this.__context__ = context;
	//容器对象
	this.__container__ = container;
	//配置参数
	this.__opts__ = options;
};

BaseButtons.prototype = {
	//修复构造函数指向
	constructor:BaseButtons,
	//创建按钮
	__createButton__:function(label,classe,clickEvent){
		return createElement('button',{
			'type':'button',
			'html':label,
			'class':classe,
			'click':clickEvent.bind(this.__context__)
		});
	},
	//添加按钮
	addButton:function(/*label,classe,clickEvent,callback*/){
		var args = [].slice.call(arguments),
			callback = args[3],
			self = this;			

		var btn = function(){
			callback && callback.apply(self,args);
			return self.__createButton__.apply(self,args);
		}();
		
		this.__buttons__.push(btn);
		return btn;
	},
	//添加按钮代理
	proxyAddButton:function(label,classe,clickEvent,shortcutKey){
		return this.addButton(label,classe,clickEvent,function(){
			this.__context__.addShortcutKey(shortcutKey,clickEvent);
		});	
	},
	//安装按钮
	injectAllButtons:function(){
		this.__buttons__.forEach(function(e){
			this.__container__.append(e);
		},this);
	}
};


//模态框头部的按钮:继承按钮基类
var HeaderButtons = function(){
	//继承属性
    BaseButtons.apply(this,arguments);
};


//模态框底部的按钮:继承按钮基类
var FooterButtons = function(){
	//继承属性
    BaseButtons.apply(this,arguments);
};



//继承基类的方法
$.extend(HeaderButtons.prototype,BaseButtons.prototype);
$.extend(FooterButtons.prototype,BaseButtons.prototype);

//重写安装按钮
HeaderButtons.prototype.injectAllButtons = function(){
	this.__buttons__.forEach(function(e){
		this.__container__.prepend(e);
	},this);
};


/*------------------- 请在此处扩展按钮的方法 ----------------------------*/

//加入关闭按钮
HeaderButtons.prototype.addCloseButton = function(){
	return this.proxyAddButton(this.__opts__.btn_close_type === 'img' ? '<span></span>' : this.__opts__.btn_close, 'close', function(){ this.fire('__CLOSE__'); }, this.__opts__.btn_close_shortcutKey);
};

//加入最小化按钮
HeaderButtons.prototype.addMinButton = function(){
	return this.proxyAddButton('<span></span>', 'min', function(){ this.fire('__MIN__'); }, this.__opts__.btn_min_shortcutKey);
};

//加入最大化按钮
HeaderButtons.prototype.addMaxButton = function(){
	return this.proxyAddButton('<span></span>', 'max', function(){ this.fire('__MAX__'); }, this.__opts__.btn_max_shortcutKey);
};

//加入确定按钮
FooterButtons.prototype.addConfirmButton = function(){
	return this.proxyAddButton(this.__opts__.btn_ok, 'btn btn-primary', function(){ this.fire('__CONFIRM__'); }, this.__opts__.btn_ok_shortcutKey);
};

//加入取消按钮
FooterButtons.prototype.addCancelButton = function(){
	return this.proxyAddButton(this.__opts__.btn_cancel, 'btn btn-default', function(){ this.fire('__CANCEL__'); }, this.__opts__.btn_cancel_shortcutKey);
};