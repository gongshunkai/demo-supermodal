//全局自定义事件
var Event = {

	//事件集合
	__clients__:[],

	//绑定事件
	on:function(key,fn){
		if(!this.__clients__[key])
			this.__clients__[key] = [];

		//订阅的消息加进缓存列表
		this.__clients__[key].push(fn);

		return this;
	},

	//触发事件
	fire:function(){
		var key = [].shift.call(arguments),
			fns = this.__clients__[key];
		
		//如果没有绑定对应的消息
		if(!fns || fns.length === 0) return this;
		
		for(var i =0, fn; fn=fns[i++];)
			fn.apply(this,arguments);

		return this;
	},

	//移除事件
	off:function(key,fn){
		var fns = this.__clients__[key];
	
		//如果key对应的消息没有被人订阅，则直接返回
		if(!fns) return this;

		//如果没有传入具体的回调函数，表示需要取消key对应的所有订阅
		if(!fn){
			fns && (fns.length = 0);
		}else{
			for(var i=fns.length - 1; i>=0;i--){
				var _fn = fns[i];
				if(_fn === fn){
					//删除订阅者的回调函数
					fns.splice(i,1);
				}
			}
		}
		return this;
	}
};


/*------------------- 请在此处扩展自定义事件 ----------------------------*/

//全局自定义事件集合clients将拷贝到SuperModal的属性clients上面
//

//固定位置
Event.on('__DISPLAY__',function(){
	this.__opts__.fixed && this.target.css('position','fixed');
});

//动画速度
Event.on('__DISPLAY__',function(){
	this.__opts__.speed = this.__opts__.show ? 0 : 'slow';
});

//加入遮罩层
Event.on('__DISPLAY__',function(){
	this.__opts__.backdrop && Dialog.overlay.show(this,this.__opts__);
});

//加入拖拽
Event.on('__DISPLAY__',function(){
	this.__opts__.dragAble && new DragDrop(this,this.target,$.extend(this.__opts__,{
		handle:this.target.find('.modal-' + (this.__opts__.hideHeader ? 'body' : 'header'))
	}));
});

//加入ESC键盘事件
Event.on('__DISPLAY__',function(){
	this.__opts__.keyEsc && $.extend(this.__shortcutKey__,shortcutKey);
});

//添加皮肤样式名
Event.on('__DISPLAY__',function(){
	this.__opts__.skinClassName && this.target.addClass(this.__opts__.skinClassName);
});

//添加标题图标样式名
Event.on('__DISPLAY__',function(){
	this.__opts__.iconType && this.target.find('.modal-header').addClass(this.__opts__.iconType);
});

//加入模态框按钮
Event.on('__DISPLAY__',function(){

	var temp = this.__btnObjs__[0];

	var hbs = new HeaderButtons(this,this.target.find('.modal-header'),this.__opts__);
	var fbs = new FooterButtons(this,this.target.find('.modal-footer'),this.__opts__);

	this.__btnObjs__ = [hbs,fbs];

	fbs.__buttons__ = temp.__buttons__;
	
});

Event.on('__DISPLAY__',function(){
	//加入最小化按钮
	this.__opts__.minButton && this.__addMinButton__();
	//加入最大化按钮
	this.__opts__.maxButton && this.__addMaxButton__();	
	//加入关闭按钮
	this.__opts__.closeButton && this.__addCloseButton__();
});

Event.on('__DISPLAY__',function(){
	//加入对话框
	this.__layers__['modal'] = new Modal(this,this.target,this.__opts__);
	//加入对话框
	this.__layers__['modal-dialog'] = new Layer(this,this.target.find('.modal-dialog'),this.__opts__);
	//加入模态框头部
	this.__layers__['modal-header'] = new Layer(this,this.target.find('.modal-header'),this.__opts__);
	//加入模态框主体
	this.__layers__['modal-body'] = new Layer(this,this.target.find('.modal-body'),this.__opts__);
	//加入模态框底部
	this.__layers__['modal-footer'] = new Layer(this,this.target.find('.modal-footer'),this.__opts__);
});

//把对话框对象添加到对话框管理
Event.on('__DISPLAY__',function(){
	manage.add(this.__layers__['modal']);
});

//隐藏模态框头部
Event.on('__DISPLAY__',function(){
	this.__opts__.hideHeader && this.__hideHeader__();
});

//隐藏模态框底部
Event.on('__DISPLAY__',function(){
	this.__opts__.hideFooter && this.__hideFooter__();
});


//注册关闭
Event.on('__CLOSE__',function(){
	this.hide();
});

//注册最小化
Event.on('__MIN__',function(){
	this.min();
});

//注册最大化
Event.on('__MAX__',function(){
	this.max();
});

//注册确认
Event.on('__CONFIRM__',function(){
	this.__opts__.callback && this.__opts__.callback();
});

//注册取消
Event.on('__CANCEL__',function(){
	this.hide();
});

//注册模态框显示前
Event.on('show',function(){
	this.__opts__.onShow && this.__opts__.onShow();
});

//注册模态框显示后
Event.on('shown',function(){
	this.__opts__.onShown && this.__opts__.onShown();
	//自动关闭模态窗
	this.__opts__.autoClose && setTimeout(this.hide.bind(this),this.__opts__.timeout);
	//自动最小化模态窗
	this.__opts__.autoMin && setTimeout(this.min.bind(this,true),this.__opts__.timeout);
	//自动最大化模态窗
	this.__opts__.autoMax && setTimeout(this.max.bind(this,true),this.__opts__.timeout);
	//默认最小化
	this.__opts__.min && this.min(true);
	//默认最大化
	this.__opts__.max && this.max(true);
});

//注册模态框隐藏前
Event.on('hide',function(){
	this.__opts__.onHide && this.__opts__.onHide();
});

//注册模态框隐藏后
Event.on('hidden',function(){
	this.__opts__.onHidden && this.__opts__.onHidden();
});

//注册模态框最小化前
Event.on('minimize',function(){
	this.target.find('.modal-dialog').addClass('minimize');
	this.__opts__.onMinimize && this.__opts__.onMinimize();
});

//注册模态框最小化后
Event.on('minimized',function(){
	this.__opts__.onMinimized && this.__opts__.onMinimized();
});

//注册模态框最大化前
Event.on('maximize',function(){
	this.target.find('.modal-dialog').addClass('maximize');
	this.__opts__.onMaximize && this.__opts__.onMaximize();
});

//注册模态框最大化后
Event.on('maximized',function(){
	this.__opts__.onMaximized && this.__opts__.onMaximized();
});

//注册模态框标准化前
Event.on('normalize',function(type){
	this.target.find('.modal-dialog').removeClass(type);
	this.__opts__.onNormalize && this.__opts__.onNormalize(type);
});

//注册模态框标准化后
Event.on('normalized',function(type){
	this.__opts__.onNormalized && this.__opts__.onNormalized(type);
});