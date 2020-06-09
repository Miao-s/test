window.addEventListener('load',function(){
    var box = document.getElementById('box');
    var mask = document.getElementById('mask');
    var big = document.getElementById('big');
    var bi = document.getElementById('bigImg');
    //鼠标经过显示隐藏层
    box.addEventListener('mouseover',function(e){
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    box.addEventListener('mouseout',function(){
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    //移动显示
    box.addEventListener('mousemove',function(e){
        var x = e.pageX - box.offsetLeft;
        var y = e.pageY - box.offsetTop;
        var mx = x - mask.offsetWidth / 2;
        var my = y - mask.offsetHeight / 2;
        var maxxy = box.offsetWidth - mask.offsetWidth;
        //限制范围
        if(mx <= 0){
            mx = 0;
        }else if(mx >= maxxy){
            mx = maxxy;
        }
        if(my <= 0){
            my = 0;
        }else if(my >= maxxy){
            my = maxxy;
        }
        mask.style.left = mx + 'px';
        mask.style.top = my + 'px';
        //移动放大
        var biMax = bi.offsetWidth - big.offsetWidth;
        var bigx = mx * biMax / maxxy;
        var bigy = my * biMax / maxxy;
        bi.style.left = - bigx +'px';
        bi.style.top = - bigy + 'px';
    });
});