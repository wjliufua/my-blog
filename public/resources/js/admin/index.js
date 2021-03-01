// 侧边栏
var side = document.getElementsByClassName('side')[0];
// 侧边栏下拉框
var sidedl = document.getElementsByClassName('sidedl');
// 侧边栏标题
var sideTitle = document.getElementsByClassName('side_title');
// 侧边栏 li 居中部分
var sidelicenter = document.getElementsByClassName('sidelicenter');
// 侧边栏 li 选项
var sideli = document.getElementsByClassName('sideli');
// 主体头部左侧导航栏
var headerLeft = document.getElementsByClassName('header_left')[0];
// 主体头部右侧导航栏
var headerRight = document.getElementsByClassName('header_right')[0];
// 右侧导航栏用户下拉图标
var userTriangle = document.getElementById('userTriangle');
// 用户下拉框
var userShow = document.getElementsByClassName('userShow')[0];
// 用户昵称处
var user = document.getElementsByClassName('user')[0];
// 用户登录ID
var userLoginId = document.getElementById('userLoginId');

// 侧边栏下拉框默认选中样式
sidedl[0].children[0].style.backgroundColor = '#808080';
sidedl[0].children[0].children[0].style.color = '#fff';

// 每个侧边栏选项点击状态数组
var sideArr = [];
// 
var pull = true;
// 下拉框在侧边栏被收起前是否展开
var sideOpen = true;
// 
var sideOpens = true;


// 侧边栏左侧动画条形效果
function sideliAddress() {
    for (let i = 0; i < sideli.length; i++) {
        // 获取侧边栏每个 li 选项
        sideli[i].onmouseout = function(ev) {
            var oEvent = ev || event;
            // 解决 onmouseout bug (鼠标移出触发事件)
            var oTo = oEvent.toElement || oEvent.relatedTarget;
            if (this.contains(oTo)) return;
            $('.left_animation').css('opacity', '0');
            // setTimeout(function() {
            //     $('.left_animation').css('opacity', '0');
            // }, 100);
        }

        // 获取侧边栏每个 li 选项
        sideli[i].onmouseover = function(ev) {
            var oEvent = ev || event;
            // 解决 onmouseover bug (鼠标移入触发事件)
            var oFrom = oEvent.fromElement || oEvent.relatedTarget;
            if (this.contains(oFrom)) return;
            // setTimeout(function() {
            //     $('.left_animation').css({ 'opacity': '1', 'top': sideli[i].offsetTop + 'px' });
            // }, 100);
            $('.left_animation').css({ 'opacity': '1', 'top': sideli[i].offsetTop + 'px' });
        }
    }
}

// function name(params) {

// }

/**
 * @method sidePullFunction 点击下拉方法
 * @param {Number} i 点击一级菜单在所有一级菜单中的第几项
 */
function sidePullFunction(i) {
    // 遍历一级菜单
    for (let j = 0; j < sidelicenter.length; j++) {

        if (i != j) {
            // 如果当前点击一级菜单 !== 循环遍历的一级菜单

            // 删除当前点击一级菜单对应的false
            sideArr[j].pull = false;
        }
        // 改变侧边栏一级菜单的字体 和 图标颜色
        sidelicenter[j].children[0].style.color = '#D2D2D2';
        sidelicenter[j].children[1].style.color = '#D2D2D2';

        if (sideli[j].children[0].children[2] == undefined) {
            // 如果一级菜单没有下拉图标
            // 跳过此次循环
            continue
        }
        // 改变遍历一级菜单图标样式
        sidelicenter[j].children[2].style.borderColor = '#D2D2D2 transparent transparent';
        // 把遍历的一级菜单隐藏
        sidelicenter[j].nextElementSibling.style.display = 'none';
    }
    // 当前点击一级菜单对应的侧边栏数组取相反值
    sideArr[i].pull = !sideArr[i].pull;

    if (sideArr[i].pull) {
        // 如果当前点击一级菜单对应的的侧边栏数组为true
        // 选中状态的一级菜单

        // 改变侧边栏一级菜单的字体 和 图标颜色
        sidelicenter[i].children[0].style.color = '#fff';
        sidelicenter[i].children[1].style.color = '#fff';

        if (sidelicenter[i].children[2] !== undefined) {
            // 如果当前点击的一级菜单有下拉图标

            // 改变当前点击的一级菜单的下拉三角样式
            // 上三角 二级菜单显示
            sidelicenter[i].children[2].style.borderColor = 'transparent transparent #fff';
            // 二级菜单显示
            sidelicenter[i].nextElementSibling.style.display = 'block';
            // 点击下拉效果
            sidedlpull();
        } else {
            sidelicenter[i].style.backgroundColor = '#909090';
            for (let x = 0; x < sidedl.length; x++) {
                // 遍历侧边栏下拉框的各个选项
                for (let y = 0; y < sidedl[x].children.length; y++) {
                    // 为遍历侧边栏下拉框的各个选项添加点击事件
                    sidedl[x].children[y].style.backgroundColor = '#3C3C3C';
                    sidedl[x].children[y].children[0].style.color = '#D2D2D2';
                }
            }
        }
    } else {
        // 改变侧边栏一级菜单的字体 和 图标颜色
        sidelicenter[i].children[0].style.color = '#D2D2D2';
        sidelicenter[i].children[1].style.color = '#D2D2D2';

        if (sidelicenter[i].children[2] !== undefined) {
            // 如果当前点击的一级菜单有下拉图标

            // 改变当前点击的一级菜单的下拉三角样式
            // 下三角 二级菜单隐藏
            sidelicenter[i].children[2].style.borderColor = '#D2D2D2 transparent transparent';
            // 二级菜单隐藏
            sidelicenter[i].nextElementSibling.style.display = 'none';
        }
    }
}

// 点击下拉效果
function sidelipull() {
    // 点击侧边栏第一项
    // setTimeout(function() { sidelicenter[0].click() }, 0);
    for (let i = 0; i < sidelicenter.length; i++) {
        // 为每个侧边栏 添加点击状态
        sideArr.push({ pull: false });
        // 为每个侧边栏 一级导航栏添加点击事件
        sidelicenter[i].onclick = function() {
            if (side.offsetWidth === 220) {
                // 如果侧边栏当前宽度为220px

                // 点击下拉方法
                sidePullFunction(i);
            } else {
                // sideShrink(headerLeft.children[0].children[0].click());
                // 侧边栏收缩
                sideShrink();
                // 点击下拉方法
                sidePullFunction(i);
                headerLeft.children[0].children[0].click();
            }
        }
    }
    sidelicenter[0].click();
}

// 侧边栏下拉框
function sidedlpull() {
    // 遍历侧边栏下拉框
    for (let i = 0; i < sidedl.length; i++) {
        // 遍历侧边栏下拉框的各个选项
        for (let j = 0; j < sidedl[i].children.length; j++) {
            // 为遍历侧边栏下拉框的各个选项添加点击事件
            sidedl[i].children[j].onclick = function() {
                // 遍历侧边栏下拉框
                for (let x = 0; x < sidedl.length; x++) {
                    // 遍历侧边栏下拉框的各个选项
                    for (let y = 0; y < sidedl[i].children.length; y++) {
                        // 把遍历侧边栏下拉框的各个选项的背景 和 字体颜色
                        // 改变全部
                        sidedl[x].children[y].style.backgroundColor = '#3C3C3C';
                        sidedl[x].children[y].children[0].style.color = '#D2D2D2';
                    }
                }
                // 把遍历侧边栏下拉框的各个选项的背景 和 字体颜色
                // 选中状态
                sidedl[i].children[j].style.backgroundColor = '#808080';
                sidedl[i].children[j].children[0].style.color = '#fff';
            }
        }
    }
}

user.onmouseover = function() {
    userTriangle.style.borderColor = 'transparent transparent #6D6D6D';
    user.style.color = '#C50000';
};
user.onmouseout = function() {
    userTriangle.style.borderColor = '#6D6D6D transparent transparent';
    user.style.color = '#6D6D6D';
};
userShow.onmouseover = function() {
    userTriangle.style.borderColor = 'transparent transparent #6D6D6D';
    user.style.color = '#C50000';
};
userShow.onmouseout = function() {
    userTriangle.style.borderColor = '#6D6D6D transparent transparent';
    user.style.color = '#6D6D6D';
};

var a = 1;
var subject = document.getElementsByClassName('subject')[0];
var header = document.getElementsByClassName('header')[0];

function headerWidth() {
    var w = subject.clientWidth;
    header.style.width = w + 'px';
}
headerWidth();

// 侧边栏收缩
function sideShrink() {
    headerLeft.children[0].children[0].onclick = function() {
        sideOpen = !sideOpen;
        for (let i = 0; i < sidedl.length; i++) {
            if (sideOpen) {
                side.style.width = '220px';
                subject.style.marginLeft = '220px';
                for (let j = 0; j < sideArr.length; j++) {
                    if (sideArr[j].pull && sidelicenter[j].children[2] !== undefined) {
                        sidelicenter[j].nextElementSibling.style.display = 'block';
                    } else {
                        continue
                    }
                }
                var sideFlag = false;
            } else {
                var sideFlag = true;
                side.style.width = '46px';
                subject.style.marginLeft = '46px';
                sidedl[i].style.display = 'none';
            }
        }
        headerStripStyle(sideFlag);
        headerWidth();
    }
}

sideliAddress();
sidelipull();
sideShrink();

var thisWebPath = window.location.pathname;
var thisWebPage = thisWebPath.substring(12, thisWebPath.length - 5);

function sideData() {
    if (thisWebPage === 'user') {
        return '用户'
    } else if (thisWebPage === 'adminIndex') {
        return '后台管理主页'
    } else if (thisWebPage === 'article-list') {
        return '文章列表'
    } else if (thisWebPage === 'article') {
        return '编写文章'
    }
}
// 侧边栏遍历
function sideFor() {
    for (var i = 0; i < sidelicenter.length; i++) {
        if (sidelicenter[i].nextElementSibling) {
            for (var j = 0; j < sidelicenter[i].nextElementSibling.children.length; j++) {
                if (sidelicenter[i].nextElementSibling.children[j].children[0].innerText === sideData()) {
                    if (sideData() !== '后台管理主页') { sidelicenter[i].click(); }
                    sidelicenter[i].nextElementSibling.children[j].click();
                }
            }
        }
        if (sidelicenter[i].children[1].innerText === sideData()) {
            sidelicenter[i].click();
        }
    }
}
sideFor();

var headerStrip = document.getElementById('header_strip');

function headerStripStyle(sideFlag) {
    for (let i = 0; i < $('.header li>a').length; i++) {
        $('.header li>a')[i].parentNode.onmouseout = function() {
            headerStrip.style.width = '0px';
        }
        if (!sideFlag) {
            $('.header li>a')[i].parentNode.onmouseover = function() {
                headerStrip.style.width = $('.header li>a')[i].offsetWidth + 'px';
                headerStrip.style.left = getLeft($('.header li>a')[i]) - 220 + 'px';
            }
        } else {
            $('.header li>a')[i].parentNode.onmouseover = function() {
                headerStrip.style.width = $('.header li>a')[i].offsetWidth + 'px';
                headerStrip.style.left = getLeft($('.header li>a')[i]) - 46 + 'px';
            }
        }
    }
}
headerStripStyle();

function getLeft(e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) offset += getLeft(e.offsetParent);
    return offset;
}

function userLogin() {
    $.ajax({
        type: 'get',
        url: '/loginState',
        data: {},
        success: function(data) {
            user.children[0].innerHTML = data.username;
        },
        error: function(err) {
            console.log(err);
        }
    });
}
userLogin();