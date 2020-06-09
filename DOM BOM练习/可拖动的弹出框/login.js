window.addEventListener('load',function(){
    var link = document.querySelector('#link');
    var login = document.getElementById('login');
    var mask = document.getElementById('bg');
    var btn = document.getElementById('login-button-submit');
    //点击显示登录窗口
    link.addEventListener('click',function(){
        login.style.display = 'block';
        mask.style.display = 'block';
    });
    //关闭窗口
    var closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click',function(){
        login.style.display = 'none';
        mask.style.display = 'none';
    });
    //拖拽效果
    //点击获取鼠标距离盒子距离d，移动距离为鼠标现坐标减d
    var title = document.getElementById('title');
    title.addEventListener('mousedown',function(e){
        var x = e.pageX - login.offsetLeft;
        var y = e.pageY - login.offsetTop;

        document.addEventListener('mousemove',move);
        function move(e){
            login.style.left = event.pageX - x + 'px';
            login.style.top = event.pageY - y + 'px';
        }

        document.addEventListener('mouseup',function(){
            document.removeEventListener('mousemove',move);
            
        });
    });
    
})