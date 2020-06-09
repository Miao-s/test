$(function(){
    $('button').click(function(){
        var zt = $('#zt').val();
        var sj = $('#sj').val();
        var sf = $('#sf').val();
        var te1 = zt +sj+'是怎么回事呢？'+zt+'相信大家都很熟悉，但'+zt+sj+'是怎么回事呢，下面让小编带大家一起了解吧。'
        var te2 = zt+sj+'，其实就是'+sf+'，大家可能会惊讶'+zt+'怎么会'+sj+'呢？但事实就是这样，小编也感到非常惊讶。'
        var te3 = '这就是关于'+zt+sj+'的事情了，大家还有什么想法呢，欢迎在评论区告诉小编一起讨论哦！'
        $('textarea').html('    '+te1+'&#10;'+'     '+te2+'&#10;'+'     '+te3);
    });
});