/*
 * aifangDOM Which contains the common method of operating DOM
 * by Aifang on 2015/11/17
 */
(function () {
    var _utils = {};
    //1.遍历数组或者类数组的每一项,每一次循环的时候，都执行我们的fn
    _utils.each = function (curAry, fn) {
        for (var i = 0; i < curAry.length; i++) {
            var item = curAry[i];
            var index = i;
            typeof fn == "function" ? fn(item, index, curAry) : null;
        }
        ;
    };
    //1.将类数组转换成数组
    _utils.listToArray = function (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            this.each(likeAry, function (item, index, curAry) {
                ary[ary.length] = item;
            });
        }
        return ary;
    };

    //2.将字符串转换成JSON对象的数据格式
    _utils.toJSON = function (str) {
        "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    };
    window.utils = _utils;
})();

/*
 获取相关DOM元素的方法
 */
(function () {
    var _DOM = {};
    //1.通过元素的类名来获取元素
    _DOM.getElementsByClass = function (strClass, context) {
        context = context || document;
        //判断当前浏览器是否兼容getElementsByClassName(IE6 7 8 都有兼容性)
        if ("getElementsByClassName" in document) {
            return utils.listToArray(context.getElementsByClassName(strClass));
        }

        var strAry = strClass.replace(/(^ +)|( +$)/g, "").split(/\s+/), tagList = context.getElementsByTagName("*"), ary = [];
        for (var i = 0; i < tagList.length; i++) {
            var curTag = tagList[i];
            curTag.flag = true;//假设curTag包含strAry，那么flag=true
            for (var k = 0; k < strAry.length; k++) {
                var reg = new RegExp("(^| +)" + strAry[k] + "( +|$)");
                if (!reg.test(curTag.className)) {
                    curTag.flag = false;
                    break;
                }
            }
            curTag.flag ? ary[ary.length] = curTag : null;
        }
        return ary;
    };

    //2.获取当前元素下面的所有元素节点,tagName不传的话，获取的就是ele的所有元素节点，如果tagName传的话，获取的就是名字为   tagName的元素节点
    _DOM.children = function (ele, tagName) {
        var nodeList = ele.childNodes, ary = [];
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            if (curNode.nodeType === 1) {
                if (typeof tagName === "string") {
                    if (curNode.nodeName.toUpperCase() === tagName.toUpperCase()) {
                        ary[ary.length] = curNode;
                    }
                    continue;
                }
                ary[ary.length] = curNode;
            }
        }
        return ary;
    };

    //3.获取当前元素上一个哥哥元素节点
    _DOM.prev = function (ele) {
        if ("previousElementSibling" in ele) {
            return ele.previousElementSibling;
        }
        var prev = ele.previousSibling;
        while (prev && prev.nodeType !== 1) {
            prev = prev.previousSibling;
        }
        return prev;
    };

    //4.获取当前元素的所有哥哥元素节点
    _DOM.prevAll = function (ele) {
        var ary = [];
        var prev = this.prev(ele);
        while (prev) {
            ary.unshift(prev);
            prev = this.prev(prev);
        }
        return ary;
    };

    //5.获取当前元素的索引
    _DOM.getIndex = function (ele) {
        return this.prevAll(ele).length;
    };

    //6.获取当前元素的下一个弟弟元素节点
    _DOM.next = function (ele) {
        if ("nextElementSibling" in ele) {
            return ele.nextElementSibling;
        }
        var next = ele.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    };

    //7.获取当前元素的所有弟弟元素节点
    _DOM.nextAll = function (ele) {
        var ary = [];
        var next = this.next(ele);
        while (next) {
            ary[ary.length] = next;
            next = this.next(next);
        }
        return ary;
    };

    //8.获取当前元素相邻的两个兄弟
    _DOM.sibling = function (ele) {
        var ary = [];
        var prev = this.prev(ele);
        var next = this.next(ele);
        prev ? ary[ary.length] = prev : null;
        next ? ary[ary.length] = next : null;
        return ary;
    };

    //9.获取当前元素所有的兄弟
    _DOM.siblings = function (ele) {
        var prevA = this.prevAll(ele);
        var nextA = this.nextAll(ele);
        return prevA.concat(nextA);
    };

    //10.获取当前元素的第一个孩子
    _DOM.firstChild = function (ele, tagName) {
        return this.children(ele, tagName)[0];
    };

    //11.获取当前元素的最后一个孩子
    _DOM.lastChild = function (ele, tagName) {
        var ary = this.children(ele, tagName);
        return ary[ary.length - 1];
    };

    /*获取DOM样式*/
    //12.获取当前元素样式或者给当前元素设置样式
    _DOM.getCss = function (curEle, attr) {
        var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/, val = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                var temp = curEle.currentStyle["filter"], tempReg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = tempReg.test(temp) ? tempReg.exec(temp)[1] : "1";
                val = parseFloat(val) / 100;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        return reg.test(val) ? parseFloat(val) : val;
    };
    _DOM.setCss = function (curEle, attr, value) {
        var reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
        if (attr === "opacity") {
            if (value >= 0 && value <= 1) {
                curEle["style"]["opacity"] = value;
                curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            }
        } else if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (reg.test(attr)) {
            curEle["style"][attr] = isNaN(value) ? value : value + "px";
        } else {
            curEle["style"][attr] = value;
        }
    };
    //13.给当前元素批量设置样式
    _DOM.setGroupCss = function (ele, options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {//如果不写hasOwnProperty，for in循环会输出options的公有属性
                this.setCss(ele, key, options[key]);
            }
        }
    };
    
    //14.获取当前元素距离body的上偏移量和左偏移量
    _DOM.offset = function (ele) {
        var p = ele.offsetParent;
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        while (p) {
            if (window.navigator.userAgent.indexOf("MSIE 8.0") < 0) {
                //不是IE8的浏览器要加上边
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {top: t, left: l};
    };

    //15.设置或者获取和浏览器有关的盒模型
    _DOM.getWin = function (attr, value) {
        if (typeof value == "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    };

    //16.检测当前元元素是否包含这个样式类名
    _DOM.hasClass = function (ele, strClass) {
        var reg = new RegExp("(^| +)"+strClass+" +|$","g");
        return reg.test(ele.className);
    };

    //17.给当前元素添加样式类名
    _DOM.addClass = function(ele, strClass){
        ele.className+=" "+strClass;
        var reg=RegExp("(^| )"+strClass+"( |$)");
        if(!reg.test(ele.className)){
            ele.className+=" "+strClass;
        }
    };

    //18.删除当前元素样式类名
    _DOM.removeClass = function(curEle, strClass){
        var reg = new RegExp("(^| +)" + strClass + "( +|$)", "g");
        if (this.hasClass(curEle, strClass)) {
            curEle.className = curEle.className.replace(reg, " ");
        }
    };

    //19.判断之前是否存在样式类名，有的话就删除，没有的话就增加
    _DOM.tollageClass = function(ele, strClass){
         this.hasClass(ele, strClass) ? this.removeClass(ele, strClass) : this.addClass(ele, strClass);
    };

    /*关于DOM的增删改*/
    //20.设置或获取当前元素的自定义属性的值
    _DOM.attr = function (curEle, attr, value) {
        //不传value：获取属性值
        if (typeof value == "undefined") {
            return attr === "class" ? curEle.className : curEle.getAttribute(attr);
        }
        //传value：设置属性值
        attr === "class" ? curEle.className = value : curEle.setAttribute(attr, value);
    };

    //21.设置或者获取非表单元素的内容
    _DOM.html = function (curEle, value) {
        if (typeof value === "undefined") {
            return curEle.innerHTML;
        }
        curEle.innerHTML = value;
    };

    //22.设置或者获取表单元素的内容
    _DOM.val = function (curEle, value) {
        if (typeof value === "undefined") {
            return curEle.value;
        }
        curEle.value = value;
    };

    //23.向容器的开头增加元素
    _DOM.prePend = function (curContainer, newEle) {
        var first = this.firstChild(curContainer);
        first ? curContainer.insertBefore(first) : curContainer.appendChild(newEle);
    };

    //24.把新元素插入到指定的元素的后面
    _DOM.insertAfter = function (oldEle, newEle) {
        var nex = this.next(oldEle), par = oldEle.parentNode;
        nex ? par.insertBefore(newEle, nex) : par.appendChild(newEle);
    };

    //25.扩展：作为一个合格的类库，我们需要给别人一个接口来扩展我们的方法，并且我们通常写一个叫做扩展的方法。
    _DOM.extend = function(options){
        for(var key in options){
          if(options.hasOwnProperty(key)){
             this[key] = options[key];
          }
        }
    };

    window.DOM = _DOM;
})();


//utils.isNum(val):Test data type
~function (utils) {
    var numObj = {
        isNum: "Number",
        isStr: "String",
        isBoo: "Boolean",
        isNul: "Null",
        isUnd: "Undefined",
        isObj: "Object",
        isAry: "Array",
        isFun: "Function",
        isReg: "RegExp",
        isDate: "Date"
    }, isType = function () {
        var outerArg = arguments[0];
        return function () {
            var innerArg = arguments[0], reg = new RegExp("^\\[object " + outerArg + "\\]$", "i");
            return reg.test(Object.prototype.toString.call(innerArg));
        }
    };
    for (var key in numObj) {
        if (numObj.hasOwnProperty(key)) {
            utils[key] = isType(numObj[key]);
        }
    }
}(utils);


//内置类原型的扩展方法
~function () {
    var aryPro = Array.prototype, strPro = String.prototype, regPro = RegExp.prototype;

    //数组去重
    aryPro.unique = function unique() {
        var obj = {};
        for (var i = 0; i < this.length; i++) {
            var cur = this[i];
            obj[cur] == cur ? (this[i] = this[this.length - 1], this.length -= 1, i--) : obj[cur] = cur;
        }
        obj = null;
        return this;
    };

    //解决forEach在IE6,7,8的兼容性
    aryPro.myForEach = function myForEach(callBack, context) {
        context = context || window;
        if(typeof callBack !== "function" ) return;
        if ("forEach" in Array.prototype) {
            this.forEach(callBack, context);
            return;
        }
        for (var i = 0; i < this.length; i++) {
            callBack.call(context, this[i], i, this);
        }
    };

    //myMap：解决map的兼容性
    aryPro.myMap = function myMap(callBack, context) {
        if (Array.prototype.map) {
            return this.map(callBack, context);
        }
        for (var i = 0; i < this.length; i++) {
            this[i] = callBack.call(context, this[i], i, this);
        }
        return this;
    };

    //myTrim：去除字符串的首位空格
    strPro.myTrim = function myTrim() {
        return this.replace(/(^\s+|\s+$)/g, "");
    };

    //mySub：截取字符串：这个方法区分中英文（中文按照两个英文单词来截取）
    strPro.mySub = function mySub() {
        var len = arguments[0] || 10, isD = arguments[1] || false, str = "", n = 0;
        for (var i = 0; i < this.length; i++) {
            var s = this.charAt(i);
            /[\u4e00-\u9fa5]/.test(s) ? n += 2 : n++;
            if (n > len) {
                isD ? str += "..." : void 0;
                break;
            }
            str += s;
        }
        return str;
    };

    //myFormatTime：格式化时间
    strPro.myFormatTime = function myFormatTime() {
        var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})$/g, ary = [];
        this.replace(reg, function () {
            ary = ([].slice.call(arguments)).slice(1, 7);
        });
        var format = arguments[0] || "{0}年{1}月{2}日 {3}:{4}:{5}";
        return format.replace(/{(\d+)}/g, function () {
            var val = ary[arguments[1]];
            return val.length === 1 ? "0" + val : val;
        });
    };

    //queryURLParameter：获取url地址栏的参数
    strPro.queryURLParameter = function queryURLParameter() {
        var reg = /([^?&=]+)=([^?&=]+)/g, obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    };

    //myExecAll：一次性捕获正则中的所有需要捕获的内容
    regPro.myExecAll = function myExecAll(str) {
        var reg = !this.global ? eval(this.toString() + "g") : this;
        var ary = [], res = reg.exec(str);
        while (res) {
            ary[ary.length] = res[0];
            res = reg.exec(str);
        }
        return ary.length === 0 ? null : ary;
    };
}();