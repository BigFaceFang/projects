   function addZero(value) {
        return value < 10 ? "0" + value : value;
    }
    function computedTime() {
        var nowTime = new Date();
        var tarTime = new Date("2016/02/27");
        var str = "00:00:00";

        //1、获取目标时间和当前时间之间相差的毫秒数 -> tarTime-nowTime
        var spanTime = tarTime.getTime() - nowTime.getTime();

        //只有当前时间还没有到达目标时间我们才计算包含了多少个小时\分钟\秒
        if (spanTime > 0) {
            //2、计算毫秒差中包含了多少个小时
            var hour = Math.floor(spanTime / (1000 * 60 * 60));
            spanTime = spanTime - (hour * 60 * 60 * 1000);

            //3、计算剩余的毫秒差中包含了多少个分钟
            var minute = Math.floor(spanTime / (1000 * 60));
            spanTime = spanTime - (minute * 60 * 1000);

            //4、计算剩下的毫秒差中包含了多少个秒
            var second = Math.floor(spanTime / 1000);

            str = "<span>"+addZero(hour) + "</span><span>" + addZero(minute) + "</span><span>" + addZero(second)+"</span>";
        } else {
            //当我们当前的时间已经超过目标时间的时候,我们清除正在运行的定时器
            window.clearInterval(timer);
            timer = null;
        }
        return str;
    }

    var boxTime = document.getElementById("timer");
    boxTime.innerHTML = computedTime();

    var timer = window.setInterval(function () {
        boxTime.innerHTML = computedTime();
    }, 1000);