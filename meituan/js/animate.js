var animate = function(curEle,tarObj,duration,callback){
	var times = 0,interval = 15,oBegin = {},oChange = {};
	for(var key in tarObj){
		if(tarObj.hasOwnProperty(key)){
			oBegin[key] = DOM.getCss(curEle,key);
			oChange[key] = tarObj[key] - oBegin[key];
		}
	}
	/*oChange[key]/duration*times;*/
	var move = function(){
		window.clearTimeout(curEle.timer);
		times += interval;
		if(times > duration){
			for(var key in tarObj){
				if(tarObj.hasOwnProperty(key)){
					DOM.setCss(curEle,key,tarObj[key]);
				}
			}
			typeof callback == "function" ? classback() : null;
			return;
		}
		for(var key in tarObj){
			if(tarObj.hasOwnProperty(key)){
				var val = oChange[key]/duration*times + oBegin[key];
				DOM.setCss(curEle,key,val);
			}
		}
		curEle.timer = setTimeout(move,interval);
	};
	move();
}