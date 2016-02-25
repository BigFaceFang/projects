~function(){
	function getWin(attr) {
    	return document.documentElement[attr] || document.body[attr];
    }
    //获取元素
	var floorList = DOM.getElementsByClass("floorTitle");
	var floorFirst = DOM.getElementsByClass("floorTitle")[0];
	var floorTop = DOM.offset(floorFirst).top;
	console.log(floorFirst.className);
	var floorPosi = document.getElementById("floor-posi");//获取左侧楼层
	var liList = floorPosi.getElementsByTagName("li");
	floorPosi.style.top = floorTop + "px";
	//让兄弟元素失去select
	function sibsUnSelect(ele){
		var sibs = DOM.siblings(ele);
		utils.each(sibs,function(item,index,sibs){
			item.className = "";
		});
	};
	function scrollMove(){
		var curT=getWin("scrollTop");
		if(curT > floorTop-40){
			floorPosi.style.position = "fixed";
			floorPosi.style.left = 10 + "px";
			floorPosi.style.top = 10 + "px";
		}else{
			floorPosi.style.position = "absolute";
			floorPosi.style.left = 10 + "px";
			floorPosi.style.top = floorTop + "px";
		}
		for (var i = 0; i < liList.length-1; i++) {
			var curItem = liList[i];
			var preTop = DOM.offset(floorList[i]).top-40;
			var nextTop = DOM.offset(floorList[i+1]).top-40;
			if(curT>=preTop && curT<nextTop){
				curItem.className="select";
				sibsUnSelect(curItem);
			}else if(curT > DOM.offset(floorList[liList.length-1]).top-40){
					liList[liList.length-1].className = "select";
					sibsUnSelect(liList[liList.length-1]);
			}
		}
	}
	//on(window,"onscroll",scrollMove);
	window.onscroll = scrollMove;
	for (var i = 0; i < liList.length; i++) {
		liList[i].index = i;
		liList[i].onclick = function(){
			var bodyT=getWin("scrollTop");
			var curTop = DOM.offset(floorList[this.index]).top;
			var changeT = curTop - bodyT;
			var step = (changeT / 500) * 10;
			var times=0;
		    var timer = window.setInterval(function (){
		    	times+=10;
		    	if(times<=500){
		    		document.documentElement.scrollTop += step;
			    	document.body.scrollTop += step;
		    	}else{
		    		document.documentElement.scrollTop = curTop;
			    	document.body.scrollTop = curTop;
		    		window.clearTimeout(timer);
			    	return;
		    	}
		    }, 10);	
		}
	};


	/*返回顶部*/
    var goTo = document.getElementById("goTop");
    var curH = getWin("clientHeight");//获取当前浏览器一屏幕的高度
    
    //当我们页面滚动的时候,我们获取当前浏览器卷去的高度,如果高度大于curH,让我们的goTo显示,反之让goTo隐藏~~
    function scrollMoveTop() {
        var curT = getWin("scrollTop");//获取body滚动的距离
        goTo.style.display = curT > curH/2 ? "block" : "none";
    }

    on(window,"onscroll",scrollMoveTop);/*绑定滚动事件*/
    
    //给我们的goTo绑定点击事件,当点击的时候让页面的scrollTop从当前位置变为0
    goTo.onclick = function () {
        var curT=getWin("scrollTop");
        //为了防止用户的重复点击,我们点击的时候让当前的按钮隐藏
        this.style.display = "none";
        //但是我们发现,触发了onscroll事件,又从新的计算,从新的让我们的按钮显示
        off(window,"onscroll",scrollMoveTop);
       //实现动画逐步运动到开始的位置
        var tarT = getWin("scrollTop") - 0;
        var step = (tarT / 500) * 10;
        var timer = window.setInterval(function () {
            document.documentElement.scrollTop -= step;
            document.body.scrollTop -= step;
            if (getWin("scrollTop") <= 0) {
                on(window,"onscroll",scrollMoveTop);
                window.clearInterval(timer);
            }
        }, 10);
    };
}();