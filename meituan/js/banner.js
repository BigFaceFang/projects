~function(){
	var banner = document.getElementById("banner");
	var bannerImg = document.getElementById("bannerImg");
	var liList = bannerImg.getElementsByTagName("li");
	var first = liList[0].cloneNode(true),last = liList[liList.length-1].cloneNode(true);
	bannerImg.appendChild(first);
	bannerImg.insertBefore(last,liList[0]);
	//console.log(liList.length);
	var bannerW = banner.offsetWidth;
	var totalW = bannerW*(liList.length);
	var count = liList.length;
	var bannerLeft = document.getElementById("bannerLeft");
	var bannerRight = document.getElementById("bannerRight");
	var tip = document.getElementById("bannerTip");
	var bannerTipList = document.getElementById("bannerTip").getElementsByTagName("span");
	bannerTipList[1].innerHTML = count-2;

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
				DOM.setCss(bannerImg, "left", -1 * bannerW);
				step=2;
			}
		}else if(dir == "left"){
			step--;
			if(step < 0){
				DOM.setCss(bannerImg, "left", -(count-2)* bannerW);
				step=count-3;
			}
			setTip(step);
		}else if(dir == "tip"){
			step = this.index+1;
		}
		animate(bannerImg,{"left":-step*bannerW},500);
		setTip(step-1);
	}
	//自动轮播
	bannerImg.autotimer = window.setInterval(move,4000);
	//鼠标滑过显示左右切换
	banner.onmouseenter = function(){
		window.clearInterval(bannerImg.autotimer);
		bannerLeft.style.display = bannerRight.style.display = tip.style.display = "block";
	}
	banner.onmouseleave = function(){
		bannerImg.autotimer = window.setInterval(move,4000);
		bannerLeft.style.display = bannerRight.style.display = tip.style.display = "none";
	}

	//实现左右点击切换
	bannerLeft.onclick = function(){
		move("left");
	}
	bannerRight.onclick = function(){
		move("right");
	}
}();