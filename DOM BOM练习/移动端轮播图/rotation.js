//缓动动画
function animate(obj,target,callback){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
            if(callback){
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step +'px';
    },15);
}
//box 轮播图，用于取轮播图宽度
//ul 存放图片的ul
//ol 小圆点
function rotation(box,ul,ol){
    var w = box.offsetWidth;
    var index = 0;
    var ullength = ul.children.length;
    //添加小圆点
    for(var i = 0;i < ul.children.length ; i++){
        ol.appendChild(document.createElement('li'));
    }
    //将第一张放于后面，用于无缝滚动
    ol.children[0].classList.add('current');
    var ulfrist = ul.children[0].cloneNode(true);
    ul.appendChild(ulfrist);
    var timer = setInterval(function(){
        index++;
        var translatex = -index * w;
        ul.style.transform = 'translateX(' + translatex + 'px)';
        ul.style.transition = 'all .3s';//过渡效果
    },2000);
    //监听过度完成事件 无缝滚动
    ul.addEventListener('transitionend',function(){
        if(index >= ullength ){
            index = 0;
            ul.style.transition = 'none';//去掉过度效果，快速跳到目标位置
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }else if(index < 0){
            //倒着走
            index = 2;
            ul.style.transtition = 'none';
            var translatex = - index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
        //小圆点变化
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });
     //手指移动
     var startX = 0;
     var moveX = 0;
     var flag = false;
     ul.addEventListener('touchstart',function(e){
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
     });
     ul.addEventListener('touchmove',function(e){
        moveX = e.targetTouches[0].pageX - startX;
        var translateX = - index * w + moveX;
        ul.style.transtition = 'none';//取消拖动效果
        ul.style.transform = 'translateX(' + translateX + 'px)';
        flag = true;
     });
     ul.addEventListener('touchend',function(){
        if(flag){
            if(Math.abs(moveX) > 100 ){
                if(moveX > 0){
                    index--;
                }else{
                    index++;
                }
                var translateX = - index * w ;
                ul.style.transtition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }else{
                //回弹效果
                var translateX = - index * w ;
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
            clearInterval(timer);
            timer = setInterval(function(){
                index++;
                var translatex = -index * w;
                ul.style.transform = 'translateX(' + translatex + 'px)';
                ul.style.transition = 'all .3s';//过渡效果
            },2000);
        }
     });
}