<h2># demo-supermodal</h2>
<p>模态窗 supermodal v2.0</p>
<p>以 Bootstrap 为皮肤，基于jquery，最低支持IE8</p>
<p><b>supermodal v2.0 演示地址：</b><a href="http://gongshunkai.github.io/demo/%E6%A8%A1%E6%80%81%E7%AA%97/demo-2.html">http://gongshunkai.github.io/demo/%E6%A8%A1%E6%80%81%E7%AA%97/demo-2.html</a></p>
<p><b>supermodal v1.0 演示地址：</b><a href="http://gongshunkai.github.io/demo/%E6%A8%A1%E6%80%81%E7%AA%97/demo-1.html">http://gongshunkai.github.io/demo/%E6%A8%A1%E6%80%81%E7%AA%97/demo-1.html</a></p>
<p><b>supermodal v2.0 使用方法：</b></p>
<p>初始化：var sm = new SuperModal();</p>
<p>宽300高200：var sm = new SuperModal({width:300, height:200});</p>
<p>初始化提供1个配置项参数</p>
<p>{<br>&nbsp;&nbsp;&nbsp;&nbsp;
  width:600, //模态框宽度<br>&nbsp;&nbsp;&nbsp;&nbsp;
  height:300, //模态框高度<br>&nbsp;&nbsp;&nbsp;&nbsp;
  zindex:9999, //层级<br>&nbsp;&nbsp;&nbsp;&nbsp;
  position:'5' //窗体初始位置 1-左上角 2-中上 3-右上角 4-左中 5-居中 6-右中 7-左下角 8-中下 9-右下角 'custom'-自定义<br>&nbsp;&nbsp;&nbsp;&nbsp;
  leftX:0, //自定义位置 x<br>&nbsp;&nbsp;&nbsp;&nbsp;
  topY:0, //自定义位置 y<br>&nbsp;&nbsp;&nbsp;&nbsp;
  iconType:'', //'warning','confirm','question','error','info'<br>&nbsp;&nbsp;&nbsp;&nbsp;
  autoClose:false, //是否自动关闭<br>&nbsp;&nbsp;&nbsp;&nbsp;
  autoMin:false, //是否自动最小化<br>&nbsp;&nbsp;&nbsp;&nbsp;
  autoMax:false, //是否自动最大化<br>&nbsp;&nbsp;&nbsp;&nbsp;
  timeout:3000, //倒计时，单位:毫秒<br>&nbsp;&nbsp;&nbsp;&nbsp;
  closeType:'close', //关闭方式 'close','hide'<br>&nbsp;&nbsp;&nbsp;&nbsp;
  clickBgClose:'dblclick', //true,'dblclick','click',false<br>&nbsp;&nbsp;&nbsp;&nbsp;
  clickBoxClose:false, //true,'dblclick',false<br>&nbsp;&nbsp;&nbsp;&nbsp;
  overlayOpacity:0.5, //遮罩层透明度<br>&nbsp;&nbsp;&nbsp;&nbsp;
  overlayColor:'#000000', //遮罩层颜色<br>&nbsp;&nbsp;&nbsp;&nbsp;
  keyEsc:true, //键盘上的 esc 键被按下时关闭模态框<br>&nbsp;&nbsp;&nbsp;&nbsp;
  minButton:false, //最小化按钮<br>&nbsp;&nbsp;&nbsp;&nbsp;
  maxButton:false, //最大化按钮<br>&nbsp;&nbsp;&nbsp;&nbsp;
  closeButton:true, //X close button<br>&nbsp;&nbsp;&nbsp;&nbsp;
  hideHeader:false, //隐藏模态框头部<br>&nbsp;&nbsp;&nbsp;&nbsp;
  hideFooter:false, //隐藏模态框底部<br>&nbsp;&nbsp;&nbsp;&nbsp;
  max:false, //默认最大化，true:最大化，false:标准大小<br>&nbsp;&nbsp;&nbsp;&nbsp;
  min:false, //默认最小化，true:最小化，false:标准大小<br>&nbsp;&nbsp;&nbsp;&nbsp;
  show:false, //模态框初始化之后就立即显示出来<br>&nbsp;&nbsp;&nbsp;&nbsp;
  backdrop:true, //是否遮罩<br>&nbsp;&nbsp;&nbsp;&nbsp;
  btn_ok:'确定', //Label<br>&nbsp;&nbsp;&nbsp;&nbsp;
  btn_cancel:'取消', //Label<br>&nbsp;&nbsp;&nbsp;&nbsp;
  btn_close:'关闭', <br>&nbsp;&nbsp;&nbsp;&nbsp;
  btn_close_type:'img', //关闭按钮类型样式 'img','text'<br>&nbsp;&nbsp;&nbsp;&nbsp;
  btn_ok_shortcutKey:null, //确定按钮快捷键<br>&nbsp;&nbsp;&nbsp;&nbsp;
  btn_cancel_shortcutKey:null, //取消按钮快捷键<br>&nbsp;&nbsp;&nbsp;&nbsp;
  btn_close_shortcutKey:null, //关闭按钮快捷键<br>&nbsp;&nbsp;&nbsp;&nbsp;
  btn_min_shortcutKey:null, //最小化按钮快捷键<br>&nbsp;&nbsp;&nbsp;&nbsp;
  btn_max_shortcutKey:null, //最大化按钮快捷键<br>&nbsp;&nbsp;&nbsp;&nbsp;
  skinClassName:null, //皮肤样式名<br>&nbsp;&nbsp;&nbsp;&nbsp;
  callback:null, //确认框回调函数<br>&nbsp;&nbsp;&nbsp;&nbsp;
  dragAble:true, //是否允许拖动<br>&nbsp;&nbsp;&nbsp;&nbsp;
  dragMask:true, //移动遮盖层<br>&nbsp;&nbsp;&nbsp;&nbsp;
  dragRangeLimit:true, //窗体拖动范围限制 true,false (为true时下面参数有用,可以是负数)<br>&nbsp;&nbsp;&nbsp;&nbsp;
  mxLeft:0, //左边限制<br>&nbsp;&nbsp;&nbsp;&nbsp;
  mxRight:9999, //右边限制<br>&nbsp;&nbsp;&nbsp;&nbsp;
  mxTop:0, //上边限制<br>&nbsp;&nbsp;&nbsp;&nbsp;
  mxBottom:9999, //下边限制<br>&nbsp;&nbsp;&nbsp;&nbsp;
  mxContainer:$(window), //指定限制在容器内<br>&nbsp;&nbsp;&nbsp;&nbsp;
  fixed:true, //是否固定位置<br>&nbsp;&nbsp;&nbsp;&nbsp;
  lockX:false, //是否锁定水平方向拖放<br>&nbsp;&nbsp;&nbsp;&nbsp;
  lockY:false, //是否锁定垂直方向拖放<br>&nbsp;&nbsp;&nbsp;&nbsp;
  lock:false, //是否锁屏<br>&nbsp;&nbsp;&nbsp;&nbsp;
  topMost:true, //是否允许显示在其它窗体最上面<br>&nbsp;&nbsp;&nbsp;&nbsp;
  dlgEvent:{'onStart':null,'onMove':null,'onStop':null},//拖拽事件代理<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onShow:null, //模态框显示前立即触发该事件<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onShown:null, //模态框已经显示出来（并且同时在动画效果完成）之后被触发<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onHide:null, //模态框隐藏前立即触发该事件<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onHidden:null, //此事件在模态框被隐藏（并且同时在动画效果完成）之后被触发<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onMinimize:null, //模态框最小化前立即触发该事件<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onMinimized:null, //模态框已经最小化（并且同时在动画效果完成）之后被触发<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onMaximize:null, //模态框最大化前立即触发该事件<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onMaximized:null, //模态框已经最大化（并且同时在动画效果完成）之后被触发<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onNormalize:null, //模态框标准化前立即触发该事件<br>&nbsp;&nbsp;&nbsp;&nbsp;
  onNormalized:null, //模态框已经标准化（并且同时在动画效果完成）之后被触发<br>
  };</p>
<p><b>模态窗对外提供了7个方法：</b></p>
<p>sm.show({<br>
&nbsp; &nbsp; model:'modal-alert',<br>
&nbsp; &nbsp; title:'提示消息',<br>
&nbsp; &nbsp; contents:'&lt;p&gt;这是一条提示信息！&lt;/p&gt;'<br>
}); </p>
<p>sm.show({<br>
&nbsp; &nbsp; model:'modal-confirm',<br>
&nbsp; &nbsp; title:'确认操作',<br>
&nbsp; &nbsp; contents:'&lt;p&gt;是否确认将该商品从购物车移除？&lt;/p&gt;'<br>
});</p>
<p>sm.show({<br>
&nbsp; &nbsp; model:'modal-message',<br>
&nbsp; &nbsp; contents:'&lt;p&gt;这是一条 ' + Date() + ' 的消息&lt;/p&gt;'<br>
});</p>
<p>sm.show({<br>
&nbsp; &nbsp; model:'modal-ajax',<br>
&nbsp; &nbsp; title:'ajax加载html',<br>
&nbsp; &nbsp; param:{<br>
&nbsp; &nbsp; &nbsp; &nbsp; 'url':'data/goods.html',<br>
&nbsp; &nbsp; &nbsp; &nbsp; 'onRequestReady':function(){<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; console.log('ajax准备');<br>
&nbsp; &nbsp; &nbsp; &nbsp; },<br>
&nbsp; &nbsp; &nbsp; &nbsp; 'onRequestComplete':function(){<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; console.log('ajax完成');<br>
&nbsp; &nbsp; &nbsp; &nbsp; },<br>
&nbsp; &nbsp; &nbsp; &nbsp; 'onError':function(){<br>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; console.log('ajax错误');<br>
&nbsp; &nbsp; &nbsp; &nbsp; }<br>
&nbsp; &nbsp; }<br>
});</p>
<p>sm.show({<br>&nbsp;&nbsp;&nbsp;&nbsp;
model:'modal-lightbox',<br>&nbsp;&nbsp;&nbsp;&nbsp;
title:'图片1',<br>&nbsp;&nbsp;&nbsp;&nbsp;
param:{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  'url':'https://img.alicdn.com/imgextra/i3/2180723028/TB20GAGaFXXXXaIXpXXXXXXXXXX_!!2180723028.jpg',<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  'onRequestReady':function(){<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp; &nbsp; console.log('lightbox准备');<br>&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp; &nbsp; },<br>&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp; &nbsp; 'onRequestComplete':function(){<br>
  &nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; console.log('lightbox完成');<br>&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp; &nbsp; }<br>&nbsp;&nbsp;&nbsp;&nbsp;
},<br>&nbsp;&nbsp;&nbsp;&nbsp;
lightbox:{<br>&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp; &nbsp; 'group':[<br>
  &nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; {'url':'https://img.alicdn.com/imgextra/i3/2180723028/TB20GAGaFXXXXaIXpXXXXXXXXXX_!!2180723028.jpg','title':'图片1'},<br>&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; {'url':'https://img.alicdn.com/imgextra/i1/2180723028/
    TB20UQIaFXXXXc5XXXXXXXXXXXX_!!2180723028.jpg','title':'图片2'},<br>&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; {'url':'https://img.alicdn.com/imgextra/i3/2180723028/
    TB2sKsIaFXXXXXrXpXXXXXXXXXX_!!2180723028.jpg','title':'图片3'},<br>
    &nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; {'url':'https://img.alicdn.com/imgextra/i1/2180723028/TB2f9UGaFXXXXXVXpXXXXXXXXXX_!!2180723028.jpg','title':'图片4'},<br>&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; {'url':'https://img.alicdn.com/imgextra/i4/2180723028/
    TB2KT3OaFXXXXXIXXXXXXXXXXXX_!!2180723028.jpg','title':'图片5'},<br>&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp; &nbsp; &nbsp; &nbsp; {'url':'https://img.alicdn.com/imgextra/i1/2180723028/
    TB2ImMFaFXXXXaWXpXXXXXXXXXX_!!2180723028.jpg','title':'图片6'}<br>&nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp; &nbsp; ],<br>&nbsp;&nbsp;&nbsp;&nbsp;
  'order':0<br>
&nbsp;}) //显示</p>
<p>sm.show({<br>
&nbsp; &nbsp; title:'提示消息',<br>
&nbsp; &nbsp; contents:'&lt;p&gt;欢迎您回来，现在将转入登录前页面&lt;/p&gt;\<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p&gt;&lt;a href=&quot;http://www.baidu.com&quot;&gt;如果您的浏览器没有自动跳转，请点击此链接&lt;/a&gt;&lt;/p&gt;'<br>
});</p>
<p><br>
  sm.hide() //隐藏<br>
  sm.min(true) //最小化<br>
  sm.min() //切换最小化<br>
  sm.max(true) //最大化<br>
  sm.max() //切换最大化<br>
  sm.addButton(label,classe,shortcutKey,clickEvent) //添加按钮</p>
<p><b>模态窗对外提供了10个自定义事件：</b></p>
<p>sm.on('show',function(){}) //模态框显示前<br> 
sm.on('shown',function(){}) //模态框显示后<br>
sm.on('hide',function(){}) //模态框隐藏前<br>
sm.on('hidden',function(){}) //模态框隐藏后<br>
sm.on('minimize',function(){}) //模态框最小化前<br>
sm.on('minimized',function(){}) //模态框最小化后<br>
sm.on('maximize',function(){}) //模态框最大化前<br>
sm.on('maximized',function(){}) //模态框最大化后<br>
sm.on('normalize',function(){}) //模态框标准化前<br>
sm.on('normalized',function(){}) //模态框标准化后</p>