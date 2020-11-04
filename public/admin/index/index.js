// 侧边栏
var side = document.getElementsByClassName('side');
// 侧边栏下拉框
var sidedl = document.getElementsByClassName('sidedl');
// 侧边栏标题
var sideTitle = document.getElementsByClassName('side_title');
// 侧边栏 li 居中部分
var sidelicenter = document.getElementsByClassName('sidelicenter');
// 侧边栏 li 选项
var sideli = document.getElementsByClassName('sideli');
// 头部点击收起侧边栏图标
var headerLeft = document.getElementsByClassName('header_left');

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
        }

        // 获取侧边栏每个 li 选项
        sideli[i].onmouseover = function(ev) {
            var oEvent = ev || event;
            // 解决 onmouseover bug (鼠标移入触发事件)
            var oFrom = oEvent.fromElement || oEvent.relatedTarget;
            if (this.contains(oFrom)) return;
            $('.left_animation').css({ 'opacity': '1', 'top': this.offsetTop + 'px' });
        }
    }
}

// 点击下拉方法封装
function sidePullFunction(i) {
    for (let j = 0; j < sidelicenter.length; j++) {
        if (i != j) {
            sideArr[j].pull = false;
        }
        sidelicenter[j].children[0].style.color = '#D2D2D2';
        sidelicenter[j].children[1].style.color = '#D2D2D2';
        if (sideli[j].children[0].children[2] == undefined) {
            continue
        }
        sidelicenter[j].children[2].style.borderColor = '#D2D2D2 transparent transparent';
        sidelicenter[j].nextElementSibling.style.display = 'none';
    }
    sideArr[i].pull = !sideArr[i].pull;
    if (sideArr[i].pull) {
        sidelicenter[i].children[0].style.color = '#fff';
        sidelicenter[i].children[1].style.color = '#fff';
        if (sidelicenter[i].children[2] !== undefined) {
            sidelicenter[i].children[2].style.borderColor = 'transparent transparent #fff';
            sidelicenter[i].nextElementSibling.style.display = 'block';
            sidedlpull();
        }
    } else {
        sidelicenter[i].children[0].style.color = '#D2D2D2';
        sidelicenter[i].children[1].style.color = '#D2D2D2';
        if (sidelicenter[i].children[2] !== undefined) {
            sidelicenter[i].children[2].style.borderColor = '#D2D2D2 transparent transparent';
            sidelicenter[i].nextElementSibling.style.display = 'none';
        }
    }
}

// 点击下拉效果
function sidelipull() {
    setTimeout(function() { sidelicenter[0].click() }, 0);
    for (let i = 0; i < sidelicenter.length; i++) {
        sideArr.push({ pull: false });
        sidelicenter[i].onclick = function() {
            if (side[0].offsetWidth === 220) {
                sidePullFunction(i);
            } else {
                sideShrink(headerLeft[0].children[0].children[0].click());
                sidePullFunction(i);
            }
        }
    }
}

function sidedlpull() {
    for (let i = 0; i < sidedl.length; i++) {
        for (let j = 0; j < sidedl[i].children.length; j++) {
            sidedl[i].children[j].onclick = function() {
                for (let x = 0; x < sidedl.length; x++) {
                    for (let y = 0; y < sidedl[i].children.length; y++) {
                        sidedl[x].children[y].style.backgroundColor = '#3C3C3C';
                        sidedl[x].children[y].children[0].style.color = '#D2D2D2';
                    }
                }
                sidedl[i].children[j].style.backgroundColor = '#808080';
                sidedl[i].children[j].children[0].style.color = '#fff';
            }
        }
    }
}

function sideShrink() {
    headerLeft[0].children[0].children[0].onclick = function() {
        sideOpen = !sideOpen;
        for (let i = 0; i < sidedl.length; i++) {
            if (sideOpen) {
                side[0].style.width = '220px';
                for (let j = 0; j < sideArr.length; j++) {
                    if (sideArr[j].pull && sidelicenter[j].children[2] !== undefined) {
                        sidelicenter[j].nextElementSibling.style.display = 'block';
                    } else {
                        continue
                    }
                }
            } else {
                side[0].style.width = '46px';
                sidedl[i].style.display = 'none';
            }
        }
    }
}

sideliAddress();
sidelipull();
sideShrink();