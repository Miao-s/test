window.addEventListener('load',function(){
    var header = document.getElementById('header');
    var content = document.getElementById('content');
    var footer = document.getElementById('footer');
    var re = document.getElementById('re');
    var headerY = header.offsetHeight / 2;
    window.addEventListener('scroll',function(){
        if(window.pageYOffset >= headerY){
            re.style.display = 'block';
        }else{
            re.style.display = 'none';
        }
    });
    re.addEventListener('click',function(){
        window.scroll(0,0);
    });
});