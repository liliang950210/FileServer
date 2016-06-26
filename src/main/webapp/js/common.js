
var EventUtil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent('on' + type,handler);
		}else{
			element['on' + type] = handler;
		}
	},
	getEvent: function(event){
		return event ? event : window.event;
	},
	getTarget: function(event){
		return event.target || event.srcElement;
	}
};
var CookieUtil = {
	get: function (name){
		var cookieName = encodeURIComponent(name) + '=',
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
		if(cookieStart > -1){
			var cookieEnd = document.cookie.indexOf(';', cookieStart);
			if(cookieEnd === -1){
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
		}
		return cookieValue;
	},
	set: function(name, value, expires, path, domain, secure){
		var date = new Date(),
			cookieText = encodeURIComponent(name) + '='+ 
						 encodeURIComponent(value);
		
		date.setTime(date.getTime()+expires*24*60*60*1000);
		cookieText += '; expires=' + date.toGMTString();
	
		if(path){
			cookieText += '; path=' + path;
		}
		if(domain){
			cookieText += '; domain=' + domain;
		}
		if(secure){
			cookieText += '; secure';
		}
		document.cookie = cookieText;
	},
	unset: function(name, path, domain, secure){
		this.set(name, '', new Date(0), path, domain, secure);
	}
};
/*ajax提交数据*/
function submitData(type, url, data, callback, key){
	var xhr = null;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else if(window.ActiveXObject){
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	if(xhr){
		xhr.onreadystatechange = function(event){
			if(xhr.readyState == 4){
				if((xhr.status >=200 && xhr.status < 300) || xhr.status == 304){
					callback(JSON.parse(xhr.response));
				}else{
					window.alert('网络错误，请求失败');
				}
			}	
		}
		if(type.toLowerCase() === 'post'){
			xhr.open('post', url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(data);
		}else if(type.toLowerCase() === 'get'){
			var url = url + '?' + key + '=' + data;
			xhr.open('get', url, true);
			xhr.send(null);
		}
	}else{
		window.alert('浏览器版本太低，请及时升级');
	}
}
/*返回顶部按钮*/
$(function(){
	var $reTop = $('.return-top'),
		$aReTop = $('#a-return-top');
	$(window).scroll(function(){
		if($(document).scrollTop() == 0){
			$reTop.hide();
		}else{
			$reTop.show();
		}
	});
	$aReTop.click(function(){
		$('html,body').animate({'scrollTop' : 0},1000);
		return false;
	});	
});

/*导航栏的实现*/
$(function(){
	$('.nav').on('mouseover','.toggle-show',function(){
		$(this)
			.find('.toggle').show().on('mouseover','a',function(){
				$(this)
				.siblings('a').removeClass('toggle-show-hover');
				$(this).addClass('toggle-show-hover');	
		});
	})
	.on('mouseout','.toggle-show',function(){
		$(this)
			.find('.toggle').hide();
	});
	$('.nav').on('mouseover','li',function(){
		$(this)
		.siblings('li')
			.children('a').removeClass('selected');
		$(this)
			.children('a').addClass('selected');
	});
	$('#head-nav').on('mouseleave',function(){
		$(this)
			.children('.nav')
				.children('li')
					.children('a').each(function(index,element){
						$(element).removeClass('selected');	
		});
		$(this)
			.children('.nav')
				.children('li')
					.children('a').eq(0).addClass('selected');

	});
});
 
/*字符串获取值*/
function getQueryStringArgs(string){
	var qs = string,
		args = {},
		items = qs.length ? qs.split('&') : [],
		item = null,
		name = null,
		value = null,
		i = 0,
		len = items.length;
		/*逐个将每一项添加到args对象中*/
	for(i = 0; i < len; i++){
		item = items[i].split('=');
		name = item[0];
		value = item[1];
		if(name.length){
			args[name] = value;
		}
	}  
	return args;
}

$(function(){
	EventUtil.addHandler(document, 'click', docClickFun);
	
	function docClickFun(event){
		var event = EventUtil.getEvent(event),
			target = EventUtil.getTarget(event);
		switch(target.id){
			case 'platform-logo': {
				location.href='forward?pageName=index';
				break;
			}
		}
	}
});

