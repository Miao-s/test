/**
 * Tab栏切换(面向对象写法)
 * 介绍：点击Tab栏可切换、点击+修改，点击x删除、双击内容或标题可修改
 * 功能：切换、删除、添加、修改
 * 
 */
var that;
class Tab{
    constructor(id){
        that = this;
        //主体
        this.main = document.querySelector(id);
        //标题区域
        this.lis = this.main.querySelectorAll('li');
        //内容区域
        this.sections = this.main.querySelectorAll('section');
        //添加按钮 标题父元素 内容父元素
        this.tetab = this.main.querySelector('.tebadd');
        this.ul = this.main.querySelector('ul');
        this.tebscon = this.main.querySelector('.tebscon');
        //删除按钮
        this.remove = this.main.querySelectorAll('.iconfont');
        //初始化调用
        this.init(); 
    }
    //初始化 让相关元素绑定事件
    init(){
        //添加会导致li和section数目读取不对，须重新添加
        this.updateNode();
        this.tetab.onclick = this.addTab;
        for(var i = 0;i < this.lis.length;i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;//切换
            this.remove[i].onclick = this.removeTab;//删除
            this.spans[i].ondblclick = this.editTab;//标题修改
            this.sections[i].ondblclick = this.editTab;//内容修改
        }
    }
    //循环...清除类
    clearClass(){
        for(var i = 0;i < this.lis.length;i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    //更新 获取全部li和section 需要时刻清楚序列号的单位放于这
    updateNode(){
        //标题区域
        this.lis = this.main.querySelectorAll('li');
        //内容区域
        this.sections = this.main.querySelectorAll('section');
        //删除按钮
        this.remove = this.main.querySelectorAll('.iconfont');
        //span li的文本
        this.spans = this.main.querySelectorAll('li span:first-child');
    }
    //切换
    toggleTab(){
        that.clearClass();
        this.className = 'list';
        that.sections[this.index].className = 'conative';
    }
    //添加 点击+添加标题和内容 insertAdjacentHTML(位置，内容);
    addTab(){
        that.clearClass();
        var numberli = that.lis.length + 1;
        var li = '<li class="list"><span>选项卡' + numberli + '</span><span class="iconfont">x</span></li>';
        that.ul.insertAdjacentHTML('beforeend',li);
        var ts = '<section class="conative">内容' + numberli + '</section>';
        that.tebscon.insertAdjacentHTML('beforeend',ts);
        that.init();
    }
    //删除
    removeTab(e){
        e.stopPropagation();//阻止冒泡
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //增加功能：如果有最后一个，就删除后选中最后一个
        //如果有选中状态的，不变
        //if(document.querySelecotr('.list')){
        //    return;
        //}
        //index--;
        //that.lis[index] && that.lis[index].click();
    }
    //修改 双击变成文本框，回车后保存文字
    //双击文字时生成一个文本框，当失去焦点或按下回车将文本框的值给元素
    //禁止双击选中文字：window.getSelection ? window.getSelection() : removeAllRanges() : document.selection.empty();
    editTab(){
        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text"/>';
        var input = this.children[0];
        input.value = str;
        input.select();//让文字变成选中状态
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                this.blur();
            }
        }
    }
}
//调用
new Tab('.box');
