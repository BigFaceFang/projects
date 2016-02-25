var searText = document.getElementById("searText");
var searchList = document.getElementById("searchList");
var liList = searchList.getElementsByTagName("li");

var searchKind = document.getElementById("search-kind");
var oDds = searchKind.getElementsByTagName("dd");
searchKind.onmouseover = function(){
	searchKind.className = "search-kind";
	oDds[0].className = oDds[1].className = "select";
}
searchKind.onmouseout = function(){
	oDds[0].className = "select";
	oDds[1].className = "";
	searchKind.className = "";
}
for (var i = 0; i < oDds.length; i++) {
	oDds[i].onclick = function(){
		var bro = DOM.prev(this) || DOM.next(this);
		searchKind.insertBefore(this,bro);
		searchKind.className = "";
		oDds[1].className = "";
		searText.value = this.innerHTML == "团购"?"请输入商品名称、地址等":"请输入商家名称、地址等";
	}
};


for (var i = 0; i < liList.length; i++) {
	liList[i].onmouseenter = function () {
		this.className = "hover";
	}
	liList[i].onmouseleave = function () {
		this.className = null;
	}
};
//实现当文本框输入内容的时候，判断有没有输入进去，有的话显示我们的列表，没有的话不管,首位空格不算
searText.onkeyup = function(){
	var val = this.value.replace(/(^ +| +$)/g,"");
	searchList.style.display = val == ""? "none" : "block";
}
//处理点击的事件不同的操作--事件委托
document.body.onclick = function(e){
	e = e || window.event;
	var ele = e.target || e.srcElement;
	//如果是文本框，判断是否有内容，有内容显示
	//如果是li，我们把文本框内容变为li的内容，列表消失
	//如果是ul，不处理
	//以上都不是的话就隐藏列表
	if(ele.id=="searText"){
		searText.onkeyup.call(ele);
	}else if(ele.tagName.toLowerCase() == "li" && ele.parentNode == searchList){
		searText.value = ele.innerHTML;
		searchList.style.display = "none";
	}else if(ele.id == searchList){

	}else{
		searchList.style.display = "none";
	}
}