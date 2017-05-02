/*********************** 工具方法 *******************************/

function createElement(tag,obj){

	if(typeof tag !== 'string') return;

	var node = $('<' + tag + '>'),
		prop, value;

	for(prop in obj){

		value = obj[prop];

		if(prop === 'html')
			value && node.html(value);
		else if(typeof value === 'function')
			value && node.on(prop,value);
		else
			value && node.attr(prop,value);
	}

	return node;
};

//函数节流的通用方法
function throttle(fn,interval){

    var _self = fn,//保存需要被延迟执行的函数引用
        timer,//定时器
        firstTime = true;//是否是第一次调用

    return function(){
        var args = arguments,
            _me = this;

        if(firstTime){//如果是第一次调用，不需延迟执行
            _self.apply(_me,args);
            return firstTime = false;
        }

        if(timer){//如果定时器还在，说明前一次延迟执行还没有完成
            return false;
        }

        timer = setTimeout(function(){//延迟一段时间执行
            clearTimeout(timer);
            timer = null;
            _self.apply(_me,args);
        },interval || 500);
    };

};


//用bind改变this指向
Function.prototype.bind = Function.prototype.bind || function(context) {
    var self = this; //保存原函数
    return function() { //返回一个新的函数
        return self.apply(context, arguments); //执行新的函数的时候，会把之前传入的context当作新的函数体内的this
    }
};

Array.prototype.forEach = Array.prototype.forEach || function(fun /*, thisp*/){  
    var len = this.length;  
    if (typeof fun != "function")  
        throw new TypeError();  
        var thisp = arguments[1];  
    for (var i = 0; i < len; i++){  
        if (i in this)  
            fun.call(thisp, this[i], i, this);  
    }
};