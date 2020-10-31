var sideli = document.getElementsByClassName('sideli');
var sidelicenter = document.getElementsByClassName('sidelicenter');

// 侧边栏选中效果
function sideliAddress() {
    for (let i = 0; i < sideli.length; i++) {
        sideli[i].onmouseout = function(ev) {
            var oEvent = ev || event;
            var oTo = oEvent.toElement || oEvent.relatedTarget;
            if (this.contains(oTo)) return;
            $('.left_animation').css('opacity', '0');
        }
        sideli[i].onmouseover = function(ev) {
            var oEvent = ev || event;
            var oFrom = oEvent.fromElement || oEvent.relatedTarget;
            if (this.contains(oFrom)) return;
            $('.left_animation').css({ 'opacity': '1', 'top': this.offsetTop + 'px' });
        }
    }
}
sideliAddress();
var pull = document.getElementsByClassName('side_pull');
var pullArr = [];
// 控制小三角下拉，上拉
function triangle() {
    for (let i = 0; i < pull.length; i++) {
        pullArr.push({ sideMenu: false });
        pull[i].onclick = function() {
            pullArr[i].sideMenu = !pullArr[i].sideMenu;
            if (pullArr[i].sideMenu) {
                $(`.side_pull:nth(${i})`).css('border-color', 'transparent transparent #fff');
            } else {
                $(`.side_pull:nth(${i})`).css('border-color', '#fff transparent transparent');
            }
        }
    }
}
triangle();