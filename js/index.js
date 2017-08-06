var slide = {
	index:1,
	scrollB:true,
	scroll:function(e){
		var e = e || window.event;
		if(!slide.scrollB) return;
		slide.scrollB = false;
		var top = [0,-890,-1695,-2485,-3271,-3600];//设置滚动高度
		var box = document.getElementById("slide");//找到滚动元素

/*
		在 Firefox 中使用detail，其余浏览器使用的是wheelDelta；两者虽在取值上不一致，但实际意思是一样的，detail与wheelDelta只各取两个值，detail只取±3，wheelDelta只取±120，其中正数表示为向上，负数表示向下。

		在非firefox浏览器中，滚轮向上滚动返回的数值是120，向下滚动返回-120

		而在firefox浏览器中，滚轮向上滚动返回的数值是-3，向下滚动返回3
*/
		setTimeout(function(){
			//针对火狐
			if(e.detail){
				//向下滚动
				if(e.detail>0){
					slide.index++;
					if(slide.index>=6) slide.index=6;
					box.style.cssText = "-webkit-transform:translateY("+top[slide.index-1]+"px);transform:translateY("+top[slide.index-1]+"px)";
				}else{
					//向上滚动
					slide.index--;
					if(slide.index<=1) slide.index=1;
					if(slide.index==5){
						slide.index=4;
					}
					box.style.cssText = "-webkit-transform:translateY("+top[slide.index-1]+"px);transform:translateY("+top[slide.index-1]+"px)";
				}
			//除火狐之外的浏览器
			}else if(e.wheelDelta){
				//向上滚动
				if(e.wheelDelta>0){
					slide.index--;
					if(slide.index<=1) slide.index=1;
					if(slide.index==5){
						slide.index=4;
					}
					box.style.cssText = "-webkit-transform:translateY("+top[slide.index-1]+"px);transform:translateY("+top[slide.index-1]+"px)";
				}else{
					//向下滚动
					slide.index++;
					if(slide.index>=6) slide.index=6;
					box.style.cssText = "-webkit-transform:translateY("+top[slide.index-1]+"px);transform:translateY("+top[slide.index-1]+"px)";
				}
			}
			
			setTimeout(function(){
				//设置添加current
				var child = box.getElementsByTagName("section");
				var len = child.length;
				for( i in child ){
					var s = child[i].className;
					if(s && s.indexOf("current")>-1){
						s = s.replace("current","");
						child[i].className = s ;
					}
				}
				if(slide.index==6){
					slide.index=5;
				}
				//滚动到的当前区域添加current
				child[slide.index-1].className = 'sec'+slide.index+" current";
				slide.scrollB = true;
			},500);
			e.preventDefault();
		},300);
		
	},
	scrollEvent:function(){
		//判断浏览器 滚轮事件
		if(window.addEventListener){
			window.addEventListener("DOMMouseScroll",this.scroll,false);
		}
		window.onmousewheel = this.scroll;
	},
	init:function(){
		this.scrollEvent();
	}
};
slide.init();
