function tap(obj , callback){
    var isMove = false;
    var startTime = 0;//纪录触摸时间变量
    obj.addEventListener('touchstart',function(){
        startTime = Date.now();//记录开始触摸时间
    });
    obj.addEventListener('touchmove',function(){
        isMove = true;//查看是否滑动，有则不算点击
    });
    obj.addEventListener('touchend',function(){
        if(!isMove && (Date.now() - startTime) < 150){
            //如果手指触摸和离开时间小于150ms和不滑动 算点击
            callback &&callback();//执行回调函数
        }
        isMove = false;//重置
        startTime = 0;//重置
    });
}
/*
****调用****
*tap(div,function(){
*
*});
*/