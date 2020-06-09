//浅拷贝
//1.
for(var k in oldObj){
    newObj[k] = oldObj[k];
}
//2.es6新增
Object.assign(newObj,oldObj);

//深拷贝
function deepCopy(newObj,oldObj){
    for(var k in oldObj){
        var item = oldObj[k];
        //判断数据类型，第一个数组，第二个对象，第三个普通
        //数组Array属于对象object，判断时先检查数组
        if(item instanceof Array){
            newObj[k] = [];
            deepCopy(newObj[k],item);
        }else if(item instanceof Object){
            newObj[k] = {};
            deepCopy(newObj[k],item);
        }else{
            newObj[k] = item;
        }
    }
}