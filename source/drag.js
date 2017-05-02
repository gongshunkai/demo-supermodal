/*********************** 拖拽类 *******************************/

//基类
var Drag = function(supermodal,drag,options){
	this.__supermodal__ = supermodal;
	this.__drag__ = drag;
	this.__opts__ = $.extend({},options);
};

Drag.prototype = {
	//修复构造函数指向
	constructor:Drag,
	start:function(e){},
	
	repair:function(){},
	move:function(){},
	stop:function(e){},
};

//拖拽
var DragDrop = function(){
	Drag.apply(this,arguments);
	this.__opts__.handle.css('cursor','move').on('mousedown',this.start.bind(this));
};

//缩放
var DragResize = function(){
	Drag.apply(this,arguments);
};

//继承基类的方法
$.extend(DragDrop.prototype,Drag.prototype);
$.extend(DragResize.prototype,Drag.prototype);



DragDrop.prototype.start = function(e){

	if(this.__opts__.lock)
		return;

	//修正范围
	this.repair();

	//记录鼠标相对拖放对象的位置
	this.__x__ = e.clientX - this.__drag__.position().left;
	this.__y__ = e.clientY - this.__drag__.position().top;

	//记录margin
	this.__marginLeft__ = parseInt(this.__drag__.css('marginLeft')) || 0;
	this.__marginTop__ = parseInt(this.__drag__.css('marginTop')) || 0;

	//mousemove时移动
	$(document).on('mousemove',(function(context){
		return context.__moveFn__ = context.move.bind(context);
	})(this));

	//mouseup时停止
	$(document).on('mouseup',(function(context){
		return context.__stopFn__ = context.stop.bind(context);
	})(this));

	//附加程序
	this.__opts__.dlgEvent.onStart && this.__opts__.dlgEvent.onStart(e);

};

//修正范围
DragDrop.prototype.repair = function(){

	if(this.__opts__.dragRangeLimit){
		//修正错误范围参数
		this.__opts__.mxRight = Math.max(this.__opts__.mxRight, this.__opts__.mxLeft + this.__drag__.outerWidth());
		this.__opts__.mxBottom = Math.max(this.__opts__.mxBottom, this.__opts__.mxTop + this.__drag__.outerHeight());

		//如果有容器必须设置position为relative或absolute来相对或绝对定位，并在获取offset之前设置
		//!this.__opts__.mxContainer || this.__opts__.mxContainer.css('position') == "relative" || this.__opts__.mxContainer.css('position') == "absolute" || (this.__opts__.mxContainer.css('position','relative'));
	}

};

DragDrop.prototype.move = function(e){

	//判断是否锁定
	if(this.__opts__.lock){
		this.stop(); return;
	};

	//设置移动参数
	var iLeft = e.clientX - this.__x__,
		iTop = e.clientY - this.__y__;

	//设置范围限制
	if(this.__opts__.dragRangeLimit){

		//如果设置了容器，再修正范围参数
		if(!!this.__opts__.mxContainer){
			this.__opts__.mxLeft = Math.max(this.__opts__.mxLeft, 0);
			this.__opts__.mxTop = Math.max(this.__opts__.mxTop, 0);
			this.__opts__.mxRight = Math.min(this.__opts__.mxRight, this.__opts__.mxContainer.innerWidth());
			this.__opts__.mxBottom = Math.min(this.__opts__.mxBottom, this.__opts__.mxContainer.innerHeight());
		}

		//修正移动参数
		iLeft = Math.max(Math.min(iLeft, this.__opts__.mxRight - this.__drag__.outerWidth()), this.__opts__.mxLeft);
		iTop = Math.max(Math.min(iTop, this.__opts__.mxBottom - this.__drag__.outerHeight()), this.__opts__.mxTop);
	}

	//设置位置，并修正margin
	if(!this.__opts__.lockX)
		this.__drag__.css('left',iLeft - this.__marginLeft__);

	if(!this.__opts__.lockY)
		this.__drag__.css('top',iTop - this.__marginTop__);

	//附加程序
	this.__opts__.dlgEvent.onMove && this.__opts__.dlgEvent.onMove(e);

};

DragDrop.prototype.stop = function(e){

	$(document).off('mousemove',this.__moveFn__);
	$(document).off('mouseup',this.__stopFn__);

	//附加程序
	this.__opts__.dlgEvent.onStop && this.__opts__.dlgEvent.onStop(e);

};



DragResize.prototype.start = function(e){

};
DragResize.prototype.move = function(e){

};
DragResize.prototype.stop = function(e){

};