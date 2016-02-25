~function(){
    var bg = document.getElementById("gray");
    var login = document.getElementById("login");
    var boxTop= document.getElementById("boxTop");
    var btn = document.getElementById("loginBtn");
    var winW = DOM.getWin("clientWidth"),winH = DOM.getWin("clientHeight");
    login.style.top = winH/2 + "px";
    //登录框渐渐显示
    var move = function(duration,interval,callback){
        var _this = this;
        var targetW = 300;
        var targetH = 440;
        var targetO = 1;
        //求各个步长
        var stepW = (300-0)/duration*interval;
        var stepH = (440-0)/duration*interval;
        var stepO = (1-0)/duration*interval;
        ~function _move(){
            window.clearTimeout(_this.timer);
            var curW = DOM.getCss(_this,"width");
            var curH = DOM.getCss(_this,"height");
            var curO = parseFloat(DOM.getCss(_this,"opacity"));
            if(curW + stepW >= targetW){
                DOM.setGroupCss(_this,{
                    width:targetW,
                    height:targetH,
                    opacity:targetO,
                    left:winW/2-targetW/2,
                    top:winH/2-targetH/2
                });
                typeof callback == "function" ? callback.call(_this) : null;
                return;
            }
            DOM.setGroupCss(_this,{
                width:curW+stepW,
                height:curH+stepH,
                opacity:curO+stepO,
                left:winW/2-(curW+stepW)/2,
                top:winH/2-(curH+stepH)/2
             });

            _this.timer = window.setTimeout(_move,interval);
        }();
    }
    btn.onclick = function(e) {
        e = e || window.event;
        e.preventDefault = function(){e.returnValue = false;}
        bg.style.display = "block";
        login.style.display = "block";
        move.call(login,100,5,function(){
            var childs = login.getElementsByTagName("*");
            utils.each(childs,function(item,index,childs){
                var count = 0;
                var timer = window.setInterval(function(){
                    count+=0.1;
                    DOM.setCss(item,"opacity",count);
                    if(count>=1){
                        window.clearTimeout(timer);
                        return;
                    }
                },20);
                
            });
        });
    };
    var close = document.getElementById("close");
    close.onclick = function(){
        login.style.display = bg.style.display = "none";
    };
    //拖拽登录框
    //获取四个边界的值
    var minL = 0,minT=0;
    var maxL = winW - 302,maxT = winH - 444;
    var dragMove = function(e){
         e = e || window.event;
         var curX = e.clientX;
         var curY = e.clientY;

         var curLeft = this.startLeft + e.clientX - this.startX;
         var curTop = this.startTop + e.clientY - this.startY;

        
         if(curLeft < minL){
            DOM.setCss(login,"left",minL+"px");
         }else if(curLeft > maxL){
            DOM.setCss(login,"left",maxL+"px");
         }else{
            DOM.setCss(login,"left",curLeft+"px");
         }
         if(curTop < minT){
            DOM.setCss(login,"top",minT+"px");
         }else if(curTop > maxT){
            DOM.setCss(login,"top",maxT+"px");
         }else{
            DOM.setCss(login,"top",curTop+"px");
         }

    }
    var up = function(e){
         e = e || window.event;
        if(this.releaseCapture){
            this.releaseCapture();
            off(this,"mousemove",dragMove);
            off(this,"mouseup",up);
        }else{
            off(document,"mousemove",this.MOVE);
            off(document,"mouseup",this.UP);
        }
    }
    var down = function(e){
        e = e || window.event;
        //获取当前按下的鼠标盒子的起始位置
        this.startX = e.clientX;
        this.startY = e.clientY;
        //获取登录框起始的位置
        this.startTop = parseFloat(DOM.getCss(login,"top"));
        this.startLeft = parseFloat(DOM.getCss(login,"left"));
        if(this.setCapture){
            this.setCapture();
            on(this,"mousemove",dragMove);
            on(this,"mouseup",up);
        }else{
            this.MOVE = processThis(this,dragMove);
            this.UP = processThis(this,up);
            on(document,"mousemove",this.MOVE);
            on(document,"mouseup",this.UP);
        }
        e.preventDefault();//阻止鼠标按下的默认选中行为
    }
    on(boxTop,"mousedown",down);
    on(boxTop,"mouseup",up);
}();