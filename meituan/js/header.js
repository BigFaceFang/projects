~function(){
    //手机二维码
    var phoneCode = document.getElementById("phone-code");
    var phoneCodeTit = DOM.getElementsByClass("phone-code-title",phoneCode)[0];
    var appPhone = document.getElementById("app-phone");
    phoneCode.onmouseover = function(e){
        e = e || window.event;
        e.preventDefault = function(){
            e.returnValue = false;
        }
        dropList.call(this,true);
    };
    phoneCode.onmouseout = function(){dropList.call(this,false);};

    //我的美团
    var myMeituan = document.getElementById("myMeituan");
    var oDl = myMeituan.getElementsByTagName("dl")[0];
    myMeituan.onmouseover =function(){dropList.call(this,true);};
    myMeituan.onmouseout =function(){dropList.call(this,false);};

    function dropList(type){
        if(type){
             DOM.lastChild(this).style.display = "block";
             DOM.firstChild(this).id = DOM.firstChild(this).className;
        }else{
             DOM.lastChild(this).style.display = "none";
             DOM.firstChild(this).id = "";
        }   
    };

    //广告
    var ad = document.getElementById("header-ad");
    var close = ad.getElementsByTagName("b")[0];
    close.onclick = function(){
        ad.style.display = "none";
    }

}();  