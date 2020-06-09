function animate(obj,target,callback){
    //先清除之前的定时器
    clearInterval(obj.timer);

    obj.timer = setInterval(function(){
        //步值 = 目标位置 - 现在位置，缓动则加上/10
        var step = (target - obj.offsetLeft) / 10;
        //让其取整，小数会出现结果有问题
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft == target){
            //停止动画，即停止定时器
            clearInterval(obj.timer);
            //回调函数，存于结束器里
            if(callback){
                callback();
            }
        }
        //原来位置+增加长度 = 现在长度
        obj.style.left = obj.offsetLeft + step +'px';
    },15);
}