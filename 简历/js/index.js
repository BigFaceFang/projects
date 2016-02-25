~(function () {
    var main = document.querySelector("#main");
    var oLis = document.querySelectorAll("#list>li");
    var winW = document.documentElement.clientWidth;
    var winH = document.documentElement.clientHeight;
    var desW = 640, desH = 960,fontSize=100;
    var rem = desW/fontSize;
    if(winW>desW){
        winW = desW;
    }
    document.documentElement.style.fontSize = winW/rem + "px";

    //oLis[0].firstElementChild.id = "a1";
    if (winW / winH < desW / desH) {//按照高度比例去缩放
        main.style.webkitTransform = "scale(" + winH / desH + ")";
    } else {//按照宽度比例去缩放
        main.style.webkitTransform = "scale(" + winW / desW + ")";
    }

    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);
    });

    function start(e) {
        this.startY = e.changedTouches[0].pageY;
    };
    function move(e) {
        e.preventDefault();//阻止默认移动
        this.flag = true;//区分点击事件还是触摸事件
        var moveTouch = e.changedTouches[0].pageY;
        var movePos = moveTouch - this.startY;
        var curIndex = this.index;
        [].forEach.call(oLis, function () {
            arguments[0].className = "";
            if (arguments[1] != curIndex) {
                arguments[0].style.display = "none";
            }
            arguments[0].firstElementChild.id = "";
        });
        if (movePos > 0) {//往下滑
            this.prevIndex = curIndex == 0 ? oLis.length - 1 : curIndex - 1;
            var prePos = -winH + movePos;
        } else if (movePos < 0) {
            this.prevIndex = curIndex == oLis.length - 1 ? 0 : curIndex + 1;
            var prePos = winH + movePos;
        }
        oLis[curIndex].style.webkitTransform = "scale(" + (1 - Math.abs(movePos) / winH * 1 / 2) + ") translate(0," + movePos + "px)";
        oLis[this.prevIndex].style.webkitTransform = "translate(0," + prePos + "px)";
        oLis[this.prevIndex].style.display = "block";
        oLis[this.prevIndex].className = "zIndex";

    };
    function end(e) {
        if (this.flag) {
            oLis[this.prevIndex].style.webkitTransform = "translate(0,0)";
            oLis[this.prevIndex].style.webkitTransition = "0.5s ease-out";
            oLis[this.prevIndex].addEventListener("webkitTransitionEnd", function (e) {
                if (e.target.tagName == "LI") {
                    this.style.webkitTransition = "";
                }
                this.firstElementChild.id = "a" + (this.index + 1);
            }, false);
        }
    };
})();
