(function(){
	//全部分类菜单
	var nav = document.getElementById("sub-nav");
	console.log(nav);
	var liList = nav.getElementsByTagName("li");
	for (var i = 0; i < liList.length; i++) {
		var oIn = DOM.getElementsByClass("sub-nav-inner",liList[i])[0];
		var oDl = oIn.getElementsByTagName("dl");
		oIn.style.width = oDl.length == 2 ? "290px" : "160px";
		oIn.style.top = -(i*51)+"px";
		liList[i].index = i;
		liList[i].inner = oIn;
		if(i == 3){continue;}
		liList[i].onmouseover = function(){
			this.className = "select";
			this.inner.style.display = "block";
		}
		liList[i].onmouseout = function(){
			this.className = " ";
			this.inner.style.display = "none";	
		}
	};
})();
