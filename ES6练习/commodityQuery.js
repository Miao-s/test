//添加数据
var data = [{
    id:1,
    pname:'小米',
    price:2999,
},{
    id:2,
    pname:'一加',
    price:4999,
},{
    id:3,
    pname:'华为',
    price:999,
},{
    id:4,
    pname:'oppo',
    price:3999,
}];
var tbody = document.querySelector('tbody');
xr(data);

//按价格查询元素
var ma = document.querySelector('.max');
var mi = document.querySelector('.min');
var b1 = document.querySelector('.b1');
//按名字查询元素
var bename = document.querySelector('.bename');
var b2 = document.querySelector('.b2');

//价格查询按钮事件
b1.addEventListener('click',function(){
    var newData = data.filter(function(value){
        return value.price >= mi.value && value.price <= ma.value;
    });
    xr(newData);
});
//名字查询按钮
b2.addEventListener('click',function(){
    var newData2 = data.filter(function(value){
        return value.pname === bename.value;
    });
    xr(newData2);
});
//加载
function xr(obj){
    tbody.innerHTML = '';
    obj.forEach(function(value){
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        tr.innerHTML = '<tr><td>' + value.id + '</td><td>' + value.pname + '</td><td>' + value.price + '</td></tr>';
        tbody.appendChild(tr);
     });
}