function animate(obj,target,callback){
    //先清除之前的定时器
    clearInterval(obj.timer);
    //定时器
    obj.timer = setInterval(function(){
        //步值 = 目标位置 - 页面卷起长度，缓动则加上/10 为负值
        var step = (target - window.pageYOffset) / 10;
        //让其取整，小数会出现结果有问题
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(window.pageYOffset == target){
            //停止动画，即停止定时器
            clearInterval(obj.timer);
            //回调函数，存于结束器里
            if(callback){
                callback();
            }
        }
        //页面卷起长度+步值 = 卷起长度 步值为负值
        window.scroll(0,window.pageYOffset + step);
    },15);
}