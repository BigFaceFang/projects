~function(){
    var tabbox = DOM.getElementsByClass("tabbedPanels")[0];
    var oLis = DOM.getElementsByClass("tab",tabbox);
    for(var i=0;i<oLis.length;i++){
        oLis[i].onclick=changeTab;
    }
    function changeTab(){
        DOM.addClass(this,"selectedTab");
        var tabSiblings=DOM.siblings(this);
        for(var i=0;i<tabSiblings.length;i++){
            var oTab=tabSiblings[i];
            DOM.removeClass(oTab,"selectedTab");
        }
        var aContents=DOM.children(DOM.next(this.parentNode));
        var n=DOM.getIndex(this);
        var selectedContent=aContents[n];
        DOM.addClass(selectedContent,"selectedContent");
        var contentSiblings=DOM.siblings(selectedContent);
        for(var i=0;i<contentSiblings.length;i++){
            DOM.removeClass(contentSiblings[i],"selectedContent");
        }
    }
}();  