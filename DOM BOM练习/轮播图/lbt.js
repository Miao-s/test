window.addEventListener('load',function(){
    var box = document.getElementById('box');
    var boxX = box.offsetWidth;//宽度
    //左右按钮
    var al = document.getElementById('arrow-l'); 
    var ar = document.getElementById('arrow-r');
    //轮播图ul
    var ul = box.querySelector('ul');
    //小圆点
    var ol = box.querySelector('ol');
    for(var i = 0;i < ul.children.length; i++){
        //动态生成 并生成标记
        var li = document.createElement('li');
        li.setAttribute('index',i);
        ol.appendChild(li);
        //小圆圈点击选定状态
        li.addEventListener('click',function(){
            for(var a = 0; a < ol.children.length; a++){
                ol.children[a].className = '';
            }
            this.className = 'current';
            //点击圆点移动轮播图 小圆点索引号*图片宽度 的负值
            var index = this.getAttribute('index');
            num = index;//将位置赋值给num
            circle = index;
            animate(ul, - index * boxX);
        });
    }
    //设置第一个小圆点的类名,该类名的圆点为选定颜色
    ol.children[0].className = 'current';

    //显示隐藏按钮 停止启动定时器播放
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
    //点击滚动一张 无缝滚动 
    //最后最前一张用克隆(克隆一定放在小圆圈后面，小圆圈数量才不变)
    var num = 0;
    var first = ul.children[0].cloneNode(true);
    var circle = 0;//控制小圆圈播放
    ul.appendChild(first);
    var flag = true;//节流阀，控制操作完才可以接下来操作
    al.addEventListener('click',function(){
        if(flag){
            flag = false;
            if(num == 0){
                num = ul.children.length - 1;
                ul.style.right = -num * boxX + 'px';
            }
            num--;
            animate(ul,- num * boxX,function(){
                flag = true;
            });
        //控制小圆圈播放
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
    function circleChange(){
        for(var i = 0;i < ol.children.length;i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //定时器自动播放（自动点击右按钮）
    var timer = setInterval(function(){
        ar.click();//调用点击事件
    },2000);
    
});