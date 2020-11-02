// 侧边栏选项
var sideli = document.getElementsByClassName('sideli');
// 侧边栏选项居中内容
var sidelicenter = document.getElementsByClassName('sidelicenter');
// 侧边栏选项展开内容
var sidedl = document.getElementsByClassName('sidedl');
sidedl[0].children[0].style.backgroundColor = '#808080';
sidedl[0].children[0].children[0].style.color = '#fff';

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
// 侧边栏点击下拉效果
var sideliArr = [];
var sideflag = false;

function sideClick() {
    setTimeout(function() { sideli[0].click() }, 0);
    for (let x = 0; x < sidedl[0].children[0].length; x++) {
        sidedl[0].children[x].onclick = function(event) {
            console.log(event);
            event.stopPropagation();
            sidedl[0].children[x].style.backgroundColor = '#808080';
            sidedl[0].children[x].children[0].style.color = '#fff';
        }
    }
    for (let i = 0; i < sideli.length; i++) {
        sideliArr.push({ pull: false });
        sideli[i].onclick = function() {
            var sidelicolor = sideli[i].children[0];
            for (let j = 0; j < sideli.length; j++) {
                if (i != j) {
                    sideliArr[j].pull = false;
                }
                sideli[j].children[0].children[0].style.color = '#D2D2D2';
                sideli[j].children[0].children[1].style.color = '#D2D2D2';
                if (sideli[j].children[0].children[2] == undefined) {
                    continue
                }
                sideli[j].children[0].children[2].style.borderColor = '#D2D2D2 transparent transparent';
                sideli[j].children[1].style.display = 'none';
            }
            sideliArr[i].pull = !sideliArr[i].pull;
            // sideflag = !sideflag;
            // console.log(sideflag);
            if (sideliArr[i].pull) {
                sidelicolor.children[0].style.color = '#fff';
                sidelicolor.children[1].style.color = '#fff';
                if (sideli[i].children[0].children[2] !== undefined) {
                    sideli[i].children[0].children[2].style.borderColor = 'transparent transparent #fff';
                    sideli[i].children[1].style.display = 'block';
                }
            } else {
                sidelicolor.children[0].style.color = '#D2D2D2';
                sidelicolor.children[1].style.color = '#D2D2D2';
                if (sideli[i].children[0].children[2] !== undefined) {
                    sideli[i].children[0].children[2].style.borderColor = '#fff transparent transparent';
                    sideli[i].children[1].style.display = 'none';
                }
            }
            // console.log(sideliArr);
        }
    }
}
sideClick();