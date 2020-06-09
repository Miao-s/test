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
//al 左按钮
//ar 右按钮
//ul 存放图片的ul
//ol 小圆点
function rotation(box,ul,ol,al,ar){
    var boxX = box.offsetWidth;//轮播图宽度
    //动态生成小圆点 小圆点相关事件
    for(var i = 0 ; i < ul.children.length ; i++){
        var li = document.createElement('li');
        li.setAttribute('index',i);
        ol.appendChild(li);
        //点击小圆点事件
        li.addEventListener('click',function(){
            for(var a = 0 ; a < ol.children.length ; a++){
                ul.children[a].className = '';
            }
            //对选中小圆点用current类的css样式，其他默认样式
            this.className = 'current';
            //点击圆点移动轮播图 -小圆点索引*图片宽度等于位置
            var index = this.getAttribute('index');
            num = index;//将位置告诉num
            circle = index;
            animate(ul , - index * boxX);
        });
    }
    //开始默认第一个小圆点用current类的样式
    ol.children[0].className = 'current';
    //显示/隐藏按钮 停止/启动定时器播放
    box.addEventListener('mouseenter',function(){
        al.style.display = 'block';
        ar.style.display = 'block';
        clearInterval(timer);
        timer = null;//清除定时器
    });
    box.addEventListener('mouseleave',function(){
        al.style.display = 'none';
        ar.style.display = 'none';
        timer = setInterval(function(){
            ar.click();
        },2000);
    });
    //左右按钮滚动 无缝滚动
    //最后一张用克隆(克隆一定放在小圆圈函数后面，不然小圆圈数量不对)
    var num = 0;
    var first = ul.children[0].cloneNode(true);
    var circle = 0;//控制小圆圈播放
    ul.appendChild(first);
    var flag = true;//节流阀控制
    al.addEventListener('click',function(){
        if(flag){
            flag = false;
            if(num == 0){
                num = ul.children.length - 1;
                ul.style.right  = -num * boxX +'px';
            }
            num--;
            anumate(ul,- num * boxX ,function(){
                flag = true;
            });
            circle--;
            // if(circle < 0){
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });
    ar.addEventListener('click',function(){
        if(flag){
            flag = false;
            if(num == ul.children.length - 1){
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul,- num * boxX,function(){
                flag = true;
            });
        //控制小圆圈播放
            circle++;
        // if(circle == ol.children.length){
        //     circle = 0;
        // }
        circle = circle == ol.children.length ? 0 : circle;
        circleChange();
        }
    });
    //按钮点击的小圆点控制
    function circleChange(){
        for(var i = 0;i < ol.children.length;i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //定时器播放
    var timer = setInterval(function(){
        ar.click();
    },2000);
}