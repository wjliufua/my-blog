// 侧边栏选项
var sideli = document.getElementsByClassName('sideli');
// 侧边栏选项居中内容
var sidelicenter = document.getElementsByClassName('sidelicenter');
// 侧边栏
var side = document.getElementsByClassName('side');
// 侧边栏选项展开内容
var sidedl = document.getElementsByClassName('sidedl');
var sideOpen = true;
var sideOpens = true;

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
var sidelicenter = document.getElementsByClassName('sidelicenter');
var sideArr = [];
var pull = true;

// 点击下拉效果
function sidelipull() {
    setTimeout(function() { sidelicenter[0].click() }, 0);
    for (let i = 0; i < sidelicenter.length; i++) {
        sideArr.push({ pull: false });
        sidelicenter[i].onclick = function() {
            // for (let j = 0; j < sidelicenter.length; j++) {
            //     if (i != j) {
            //         sideArr[j].pull = false;
            //     }
            //     sidelicenter[j].children[0].style.color = '#D2D2D2';
            //     sidelicenter[j].children[1].style.color = '#D2D2D2';
            //     if (sideli[j].children[0].children[2] == undefined) {
            //         continue
            //     }
            //     sidelicenter[j].children[2].style.borderColor = '#D2D2D2 transparent transparent';
            //     // 兄弟元素
            //     sidelicenter[j].nextElementSibling.style.display = 'none';
            // }
            // sideArr[i].pull = !sideArr[i].pull;
            // if (sideArr[i].pull) {
            //     sidelicenter[i].children[0].style.color = '#fff';
            //     sidelicenter[i].children[1].style.color = '#fff';
            //     if (sidelicenter[i].children[2] !== undefined) {
            //         sidelicenter[i].children[2].style.borderColor = 'transparent transparent #fff';
            //         sidelicenter[i].nextElementSibling.style.display = 'block';
            //         sidedlpull();
            //         sideShrink(side[0].offsetWidth);
            //     }
            // } else {
            //     sidelicenter[i].children[0].style.color = '#D2D2D2';
            //     sidelicenter[i].children[1].style.color = '#D2D2D2';
            //     if (sidelicenter[i].children[2] !== undefined) {
            //         sidelicenter[i].children[2].style.borderColor = '#fff transparent transparent';
            //         sidelicenter[i].nextElementSibling.style.display = 'none';
            //         sideShrink(side[0].offsetWidth);
            //     }
            // }

            // console.log(side[0]);
            // console.log(side[0].offsetWidth);
            if (side[0].offsetWidth === 220) {
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
                    // 兄弟元素
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
                        // sideShrink(headerLeft[0].children[0].children[0].click());
                    }
                } else {
                    sidelicenter[i].children[0].style.color = '#D2D2D2';
                    sidelicenter[i].children[1].style.color = '#D2D2D2';
                    if (sidelicenter[i].children[2] !== undefined) {
                        sidelicenter[i].children[2].style.borderColor = '#fff transparent transparent';
                        sidelicenter[i].nextElementSibling.style.display = 'none';
                    }
                }
            } else {
                sideShrink(headerLeft[0].children[0].children[0].click());
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
                    // 兄弟元素
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
                        sidelicenter[i].children[2].style.borderColor = '#fff transparent transparent';
                        sidelicenter[i].nextElementSibling.style.display = 'none';
                    }
                }
            }

            //     if (pull) {
            //         for (let j = 0; j < sidelicenter.length; j++) {
            //             if (i != j) {
            //                 sideArr[j].pull = false;
            //             }
            //             sidelicenter[j].children[0].style.color = '#D2D2D2';
            //             sidelicenter[j].children[1].style.color = '#D2D2D2';
            //             if (sideli[j].children[0].children[2] == undefined) {
            //                 continue
            //             }
            //             sidelicenter[j].children[2].style.borderColor = '#D2D2D2 transparent transparent';
            //             // 兄弟元素
            //             sidelicenter[j].nextElementSibling.style.display = 'none';
            //         }
            //         sideArr[i].pull = !sideArr[i].pull;
            //         if (sideArr[i].pull) {
            //             sidelicenter[i].children[0].style.color = '#fff';
            //             sidelicenter[i].children[1].style.color = '#fff';
            //             if (sidelicenter[i].children[2] !== undefined) {
            //                 sidelicenter[i].children[2].style.borderColor = 'transparent transparent #fff';
            //                 sidelicenter[i].nextElementSibling.style.display = 'block';
            //                 sidedlpull();
            //                 // sideShrink(headerLeft[0].children[0].children[0].click());
            //             }
            //         } else {
            //             sidelicenter[i].children[0].style.color = '#D2D2D2';
            //             sidelicenter[i].children[1].style.color = '#D2D2D2';
            //             if (sidelicenter[i].children[2] !== undefined) {
            //                 sidelicenter[i].children[2].style.borderColor = '#fff transparent transparent';
            //                 sidelicenter[i].nextElementSibling.style.display = 'none';
            //             }
            //         }
            //     } else {
            //         for (let j = 0; j < sidelicenter.length; j++) {
            //             if (i != j) {
            //                 sideArr[j].pull = false;
            //             }
            //             sidelicenter[j].children[0].style.color = '#D2D2D2';
            //             sidelicenter[j].children[1].style.color = '#D2D2D2';
            //             if (sideli[j].children[0].children[2] == undefined) {
            //                 continue
            //             }
            //             sidelicenter[j].children[2].style.borderColor = '#D2D2D2 transparent transparent';
            //             // 兄弟元素
            //             sidelicenter[j].nextElementSibling.style.display = 'none';
            //         }
            //         sideArr[i].pull = !sideArr[i].pull;
            //         if (sideArr[i].pull) {
            //             sidelicenter[i].children[0].style.color = '#fff';
            //             sidelicenter[i].children[1].style.color = '#fff';
            //             if (sidelicenter[i].children[2] !== undefined) {
            //                 sidelicenter[i].children[2].style.borderColor = 'transparent transparent #fff';
            //                 sidelicenter[i].nextElementSibling.style.display = 'block';
            //                 sidedlpull();
            //                 // sideShrink(headerLeft[0].children[0].children[0].click());
            //             }
            //         } else {
            //             sidelicenter[i].children[0].style.color = '#D2D2D2';
            //             sidelicenter[i].children[1].style.color = '#D2D2D2';
            //             if (sidelicenter[i].children[2] !== undefined) {
            //                 sidelicenter[i].children[2].style.borderColor = '#fff transparent transparent';
            //                 sidelicenter[i].nextElementSibling.style.display = 'none';
            //             }
            //         }
            // }

        }
    }
}
sidelipull();


sidedl[0].children[0].style.backgroundColor = '#808080';
sidedl[0].children[0].children[0].style.color = '#fff';
// console.log(sidedl[0].children);

function sidedlpull() {
    for (let i = 0; i < sidedl.length; i++) {
        for (let j = 0; j < sidedl[i].children.length; j++) {
            sidedl[i].children[j].onclick = function() {
                for (let x = 0; x < sidedl[i].children.length; x++) {
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

var headerLeft = document.getElementsByClassName('header_left');
// var side = document.getElementsByClassName('side');
var sideTitle = document.getElementsByClassName('side_title');
// console.log(headerLeft[0].children[0].children[0]);
// console.log(side[0]);
// sidelicenter[i].nextElementSibling.style.display = 'none';
// console.log(sidelicenter.nextElementSibling);
// getAttribute
// console.log(sideArr);
// console.log(sidedl);
// console.log(sideTitle);


function sideShrink(sideOpens) {
    // sideOpen = !sideOpen;
    // console.log(sideOpens);
    headerLeft[0].children[0].children[0].onclick = function() {
        // console.log(side[0].offsetWidth);
        sideOpen = !sideOpen;
        for (let i = 0; i < sidedl.length; i++) {
            if (sideOpen) {
                side[0].style.width = '220px';
                for (let j = 0; j < sideArr.length; j++) {
                    if (sideArr[j].pull && sidelicenter[j].children[2] !== undefined) {
                        sidelicenter[j].nextElementSibling.style.display = 'block';
                    }
                }
            } else {
                side[0].style.width = '46px';
                sidedl[i].style.display = 'none';
            }
        }
    }
}
sideShrink();