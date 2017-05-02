/*********************** LoadContents类 *******************************/

var LoadContents = function(supermodal,target,params){
	this.__supermodal__ = supermodal;
	this.__target__ = target;
	this.__params__ = params;
};


/*------------------- 请在此处扩展静态方法 ----------------------------*/

//表达式与方法名的映射对象
LoadContents.exMapping = {};

//
LoadContents.media = function(name){

	var LoadContentFn = typeof name === 'string' ? LoadContents[name] : name;

	return function(){
		
		var modalBody = this.__target__.find('.modal-body'),
			params = this.__params__;

		var media = LoadContentFn(params);

		modalBody.append(media);

		params.onRequestReady && params.onRequestReady();
	
	};
};

//创建flash
LoadContents.createFlash = function(params){

	if(navigator.userAgent.toLowerCase().indexOf("msie") != -1){

		return createElement('OBJECT',{
			'classid':'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
			'width':'100%',
			'height':'100%',
			'codebase':'http://active.macromedia.com/flash2/cabs/swflash.cab#version=4,0,0,0',
			'html':'<param name="wmode" value="transparent">\
			<param name="quality" value="high">\
			<param name="allowScriptAccess" value="always">\
			<param name="swLiveConnect" value="false">\
			<param name="movie" value="' + params.url + '">'
		});

	}else{

		return createElement('embed',{
			'type':'application/x-shockwave-flash',
			'PLUGINSPAGE':'http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash',
			'src':params.url,
			'allowScriptAccess':'always',
			'quality':'high',
			'width':'100%',
			'height':'100%',
			'swLiveConnect':'false',
			'wmode':'transparent'
		});

	}

};

//创建Video
LoadContents.createVideo = function(params){

	var suffix = params.url.match(LoadContents.exMapping.video)[2];

	return createElement('video',{
		'width':'100%', 'height':'100%', 'controls':'controls', 'autoplay':'autoplay',
		'html':'<source src="' + params.url + '" type="video/' + suffix + '">\
	Your browser does not support the video tag.',
		'loadedmetadata':function(){
			params.onRequestComplete && params.onRequestComplete($(this));
		}
	});		

};

//创建iframe
LoadContents.createIframe = function(params){

	return createElement('iframe',{
		'width':'100%', 'height':'100%',
		'src':params.url, 'frameborder':'0',
		'load':function(){
			params.onRequestComplete && params.onRequestComplete($(this));
		}
	});

};


/*------------------- 请在此处扩展 LoadContents.exMapping ----------------------------*/

LoadContents.exMapping.lightbox = new RegExp( /([^\/\\]+)\.(jpg|png|gif)$/i );
LoadContents.exMapping.flash = new RegExp( /([^\/\\]+)\.(swf)$/i );
LoadContents.exMapping.video = new RegExp( /([^\/\\]+)\.(ogg|mp4|webm)$/i );


/*------------------- 请在此处扩展原型方法 ----------------------------*/

LoadContents.prototype.lightbox = function(){

	var supermodal = this.__supermodal__,
		modalDialog = this.__target__.find('.modal-dialog'),
		modalBody = this.__target__.find('.modal-body'),
		params = this.__params__,
		height = 0;

	var image = createElement('img',{
		'style':'width:100%;height:auto;',
		'load':function(){

			modalBody.height('auto').append($(this));
			height = modalBody.outerHeight(true);

			supermodal.setSize(undefined,'auto');
			var size = supermodal.getSize();
			supermodal.setSize(size.w,size.h);

			supermodal.__animateBody__({'height':height},function(){
				modalDialog.removeClass('loading');
				supermodal.addArrows(); $(this).fadeIn('slow');
			}.bind(this));

			$(this).hide(); supermodal.__setPosition__();
			params.onRequestComplete && params.onRequestComplete($(this));

		}
	});
	
	//兼容ie8 onload事件只执行一次，设置图片src属性放在注册onload事件之后
	image.attr('src',params.url);
	modalDialog.addClass('loading');
	params.onRequestReady && params.onRequestReady();

};

LoadContents.prototype.flash = LoadContents.media('createFlash');

LoadContents.prototype.video = LoadContents.media('createVideo');

LoadContents.prototype.iframe = LoadContents.media('createIframe');

LoadContents.prototype.ajax = function(){

	var modalBody = this.__target__.find('.modal-body'),
		params = this.__params__;

	var ajaxCallback = function(response,status){

		if(status === 'success')
			params.onRequestComplete && params.onRequestComplete(response);
		else
			params.onError && params.onError(status);
	};

	if(params.postData)
		modalBody.load(params.url, params.postData, ajaxCallback.bind(this));
	else
		modalBody.load(params.url, ajaxCallback.bind(this));

	params.onRequestReady && params.onRequestReady();

};