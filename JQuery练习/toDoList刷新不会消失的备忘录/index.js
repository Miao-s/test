/*基本流程
按下回车把数据存放到本地存储里
1.页面中的数据，都要从本地存储中获取，这样刷新页面就不会丢失数据，所以先要把数据保存到本地存储里面；
2.利用事件对象.keyCOde判断用户按下回车键(13)
3.声明一个数组，保存数据
4.先要读取本地存储原来的数据(声明函数getData())，放到这个数组里面
5.之后把最新从表单获取过来的数据，追加到数组里面
6.最后把数组存储给本地存储(声明函数savaDate())
*/
/**渲染
 * 因为后面也会经常渲染加载操作，所以声明一个函数load,方便后面调用
 * 先读取本地存储数据，数据需要转换为对象格式
 * 之后遍历这个数据($.each()),有几条数据，生成几个li到ol里面
 * 每次渲染之前，先把ol里的内容清空，不然会重叠生成
 */
/**删除
 * 先获取本地存储的数据，删除对应的数据，保存给本地存储，重新进行渲染
 * 点击里面的a链接，删除的不是li，而是删除本地存储对应的数据
 * 给每个a链接自定义属性记录当前索引号 兄弟关系的可以直接拿到索引号
 * 根据索引号删除相关数据——数组的splice(i,1)方法
 * 修改后的数据重新存储，放到本地存储
 * 重新渲染加载列表
 * 因为a是动态创建的，需要用on方法绑定事件
 */
/**正在进行与已完成
 * 点击复选框，修改本地存储，再重新进行渲染
 * 点击之后，获取本地存储数据
 * 修改数据属性done为复选框的checked状态
 * 再保存到本地存储，重新渲染列表
 * load加载函数里面，增加一个条件，如果done为true，则加载到已完成列表里
 * 如果done为false，则加载到进行时列表里
 */
/**统计个数
 * 在load函数内设置
 * 声明两个变量，todoCount代办个数 doneCount已完成个数
 * 遍历时，如果done为true，doneCount++，done为false，todeCount++
 * 最后修改元素的text()
 */
$(function(){
    load();
    //回车存储数据
    $('#title').on('keydown',function(e){
        if(e.keyCode === 13){
            if($(this).val() === ''){
                alert('请输入内容！！！');
            }else{
                //先读取数据
                var local = getDate();
                //追加最新数据-更新数据
                local.push({title:$(this).val(),done:false});
                //追加最新数据-存储到本地存储
                saveDate(local);
                //渲染
                load();
                $(this).val('');
            }
        }
    })
    //删除
    $('ol,ul').on('click','a',function(){
        //获取本地存储
        var data = getDate();
        //修改数据
        var index = $(this).attr('id');
        data.splice(index,1);//删
        //保存到本地存储
        saveDate(data);
        //渲染
        load();
    });
    //正在进行与已经完成 获取本地数据-->修改-->保存-->渲染
    $('ol,ul').on('click','input',function(){
        var data = getDate();
        var index = $(this).siblings('a').attr('id');
        data[index].done = $(this).prop('checked');
        saveDate(data);
        load();
    });
    //读取数据
    function getDate(){
        var data = localStorage.getItem('todolist');
        if(data != null){
            //本地存储里面的数据是字符串格式的，但我们需要的是对象格式的
            return JSON.parse(data);
        }else{
            return[];
        }
    }
    //保存本地存储数据
    function saveDate(data){
        //JSON.stringify()：装换字符串，变成能存储在localStorage的
        localStorage.setItem('todolist',JSON.stringify(data));
    }
    //渲染加载数据
    function load(){
        //获取=>添加
        var data = getDate();
        //遍历前清空ol,ul内容 避免重复
        $('ol,ul').empty();
        //统计个数
        var todoCount = 0;
        var doneCount = 0;
        //添加数据，渲染
        $.each(data , function(i,n){
            if(n.done){
                $('ul').prepend('<li><input type="checkbox" checked="checked"> <p>' + n.title + '</p> <a href="javascript:;" id='+ i +'></a></li>');
                doneCount++;
            }else{
                $('ol').prepend('<li><input type="checkbox"> <p>' + n.title + '</p> <a href="javascript:;" id='+ i +'></a></li>');
                todoCount++;
            }
        });
        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
    }
});