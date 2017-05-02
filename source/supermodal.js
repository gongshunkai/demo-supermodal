var SuperModal = (function(){

	var dialogCache = [],
		dialog;

	return function(opts){

		opts = opts || {};

		dialog = dialogCache[opts.id];

		if(dialog){

			dialog.__init__(dialog.__opts__);
			return dialog;
		
		}else{

			dialog = new Dialog(opts);

			if(opts.id)
				dialogCache[opts.id] = dialog;
			return dialog;

		}
	};

})();


//全局快捷键
var shortcutKey = {
	'27':function(){ this.hide(); }
};

//遮罩层
var overlay;

//对话框管理
var manage = new DialogManage();



