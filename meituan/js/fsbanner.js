~function(){
	var fsbanner = document.getElementById("fsbanner");
	var fsbannerImg = document.getElementById("fsbannerImg");
	var liList = fsbannerImg.getElementsByTagName("li");
	var first = liList[0].cloneNode(true),last = liList[liList.length-1].cloneNode(true);
	fsbannerImg.appendChild(first);
	fsbannerImg.insertBefore(last,liList[0]);
	//console.log(liList.length);
	var fsbannerW = fsbanner.offsetWidth;
	//console.log(fsbannerW);
	var totalW = fsbannerW*(liList.length);
	var count = liList.length;
	var fsbannerLeft = document.getElementById("fsbannerLeft");
	var fsbannerRight = document.getElementById("fsbannerRight");
	var bannerTipList = document.getElementById("fsbannerTip").getElementsByTagName("span");
	bannerTipList[1].innerHTML = count-2;
	for (var i = 0; i < liList.length; i++) {
		var divList = DOM.children(liList[i]);
		for (var j = 0; j < divList.length; j++) {
			divList[divList.length-1].style.border = "none";
		};
	};

	//实现焦点同步
	var setTip = function(index){
		index < 0 ? index = count-3 : null;
		index >= count-2?index = 0 : null;
		bannerTipList[0].innerHTML = index+1;
	}
	//实现图片的切换
	var step = 1;
	var move = function(dir){
		if(typeof dir == "undefined" || dir == "right"){
			step++;
			if(step>=count){
				DOM.setCss(fsbannerImg, "left", -1 * fsbannerW);
				step=2;
			}
		}else if(dir == "left"){
			step--;
			if(step < 0){
				DOM.setCss(fsbannerImg, "left", -(count-2)* fsbannerW);
				step=count-3;
			}
			setTip(step);
		}else if(dir == "tip"){
			step = this.index+1;
		}
		animate(fsbannerImg,{"left":-step*fsbannerW},500);
		setTip(step-1);
	}

	//自动轮播
	//fsbannerImg.autoTimer = window.setInterval(move,4000);
	//鼠标滑过显示左右切换
	fsbanner.onmouseenter = function(){
		//window.clearInterval(fsbannerImg.autoTimer);
		fsbannerLeft.style.display = fsbannerRight.style.display = "block";
	}
	fsbanner.onmouseleave = function(){
		//fsbannerImg.autoTimer = window.setInterval(move,3000);
		fsbannerLeft.style.display = fsbannerRight.style.display = "none";
	}

	//实现左右点击切换
	fsbannerLeft.onclick = function(){
		move("left");
	}
	fsbannerRight.onclick = function(){
		move("right");
	}
}();