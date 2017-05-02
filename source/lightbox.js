/*********************** lightBox类 *******************************/
			
var LightBox = function(supermodal,body,lightbox){
	this.__supermodal__ = supermodal;
	this.__body__ = body;
	this.__lightbox__ = lightbox;
};

LightBox.prototype = {
	//修复构造函数指向
	constructor:LightBox,
	//加入箭头
	addArrows:function(){
		var btnnext = createElement('a',{
			'href':'javascript:;', 'class':'next-image',
			'html':'<span class="glyphicon glyphicon-chevron-right"></span>',
			'click':function(e){
				e.stopPropagation();
				this.viewNextElement();
			}.bind(this),
			'mouseover':function(){
				$(this).css('opacity',0.5);
			},
			'mouseout':function(){
				$(this).css('opacity',0);
			}
		});

		var btnprevious = createElement('a',{
			'href':'javascript:;', 'class':'previous-image',
			'html':'<span class="glyphicon glyphicon-chevron-left"></span>',
			'click':function(e){
				e.stopPropagation();
				this.viewPreviousElement();
			}.bind(this),
			'mouseover':function(){
				$(this).css('opacity',0.5);
			},
			'mouseout':function(){
				$(this).css('opacity',0);
			}
		});

		this.__body__.append(btnnext).append(btnprevious);
		this.setArrowsVisibility(btnprevious,btnnext);
	},

	//右箭头
	viewNextElement:function(){
		var elements = this.__lightbox__.group;	
		
		this.__lightbox__.order++;
		
		var next_element = elements[this.__lightbox__.order];

		this.__supermodal__.display({
			model:'modal-lightbox',
			title:next_element.title,
			draw:false,
			param:{
				'url':next_element.url,
				'onRequestReady':function(){ },
				'onRequestComplete':function(){ }
			},
			lightbox:{
				'element':next_element,
				'group':this.__lightbox__.group,
				'order':this.__lightbox__.order
			}
		});
	},

	//左箭头
	viewPreviousElement:function(){
		var elements = this.__lightbox__.group;	
				
		this.__lightbox__.order--;			
		
		var previous_element = elements[this.__lightbox__.order];
					
		this.__supermodal__.display({
			model:'modal-lightbox',
			title:previous_element.title,
			draw:false,
			param:{
				'url':previous_element.url,
				'onRequestReady':function(){ },
				'onRequestComplete':function(){ }
			},
			lightbox:{
				'element':previous_element,
				'group':this.__lightbox__.group,
				'order':this.__lightbox__.order
			}
		});	
	},

	//自动设置箭头的可见性
	setArrowsVisibility:function(left_arrow,right_arrow){		

		//设置左箭头的可见性（上一个图像）
		if (this.__lightbox__.order == 0)
			left_arrow.hide();
		else
			left_arrow.show();
	
		//设置右箭头的可见性（下一个图像）
		if (this.__lightbox__.order >= this.__lightbox__.group.length-1)
			right_arrow.hide();
		else
			right_arrow.show();
	}
};