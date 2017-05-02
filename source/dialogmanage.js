/*********************** 对话框管理类 *******************************/

var DialogManage = function(){
	//以命名方式保存,便于快速通过id获取
	this.idDialogs = {};
	//以堆栈方式保存所有对话框，最后的元素为栈顶
	this.dialogs = [];
};

DialogManage.prototype = {
	//对话框重排序
	sortDialogIdx:function(){
		for(var i=0,len=this.dialogs.length;i<len;i++){
			var dialog = this.dialogs[i];
			dialog.__target__.css('z-index', dialog.__opts__.zindex + i);
		}
	},
	//添加dialog对话框
	add:function(dialog){
		if(!this.getDialog(dialog.__opts__.id)){
			this.dialogs.push(dialog);
			this.idDialogs[dialog.__opts__.id] = dialog;
			this.sortDialogIdx();
		} 
	},
	//删除对话框
	remove:function(dialog){
		dialog.clean();
		delete this.idDialogs[dialog.__opts__.id]; 
		var idx = this.getIdx(dialog);
		this.dialogs.splice(idx,1);
		this.sortDialogIdx();
	},
	//交换对话框位置
	swap:function(from,to){
		if(from>=0&&from<=this.dialogs.length-1
		&&to>=0&&to<=this.dialogs.length-1){
			var dialog = this.layers[from];
			this.dialogs[from] = this.dialogs[to];
			this.dialogs[to] = dialog;
			this.sortDialogIdx();
		}
	},
	//获取某个对话框的索引
	getIdx:function(dialog){		  
		return dialog.__target__.css('z-index') - dialog.__opts__.zindex;
	},
	//把某个对话框移动到最顶部
	bringToFirst:function(dialog){
		var idx = this.getIdx(dialog);
		if(idx!=this.dialogs.length-1){
			this.dialogs.splice(idx,1);
			this.dialogs[this.dialogs.length] = dialog;	
			this.sortDialogIdx();
		}
	},
	//把某个对话框移动到最底部
	bringToLast:function(dialog){
		var idx = this.getIdx(dialog);
		if(idx!=0){
			this.dialogs.splice(idx,1);
			this.dialogs.splice(0,0,dialog);
			this.sortDialogIdx();
		}
	},
	//对话框后移
	back:function(dialog){
		var idx = this.getIdx(dialog);
		if(idx>0){
			this.swap(idx,idx-1);
		}		 
	},
	//对话框前移
	forward:function(dialog){
		var idx = this.getIdx(dialog);
		if(idx<this.layers.length){			 
			this.swap(idx,idx+1);
		}
	},
	//根据id获取层
	getDialog:function(id){
		return this.idDialogs[id];
	}, 
	//获取当前对话框,顶部对话框为当前对话框
	getCurrentDialog:function(){
		return this.dialogs[this.dialogs.length-1];
	}, 
	//清除所有对话框
	clearAll:function(){
		for(var i in this.dialogs){
			this.dialogs[i].clean();
		}
		this.idDialogs = {};
		this.dialogs = [];
	}
};