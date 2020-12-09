var pages = new Number();
var totals = new Number();
$.ajax({
    type: 'get',
    url: '/admin/user',
    // contentType: 'application/json',
    async: false,
    data: {
        // page: 5
    },
    success: function(data) {
        // console.log('111');
        var { page, total } = data;
        // console.log(page, total);

        // function pageButton() {
        var pageSize = ``;
        for (var i = 1; i <= page; i++) {
            if (page < 5) {
                pageSize += `<li><a href="javascript:;">${i}</a></li>`;
            } else if (page == 5) {
                pageSize += `<li><a href="javascript:;">${i}</a></li>`;
            } else {
                if (i <= 3) {
                    pageSize += `<li><a href="javascript:;">${i}</a></li>`;
                } else if (i == page) {
                    pageSize += `<li id="pageEllipsis"><span>...</span></li><li><a href="javascript:;">${i}</a></li>`;
                } else {
                    continue
                }
            }
        }
        // document.getElementById('pg').innerHTML = `
        //         <li><a href="javascript:;" class="userPageL" id="userPageL"><i class="iconfont icon-tubiaozhizuo-"></i></a></li>
        //         ${pageSize}
        //         <li><a href="javascript:;" class="userPageR" id="userPageR"><i class="iconfont icon-tubiaozhizuo-1"></i></a></li>
        //         `;
        document.getElementById('pg').innerHTML = `${pageSize}`;
        pages = page;
        totals = total;
        // }
    },
    error: function(err) {
        console.log(err);
    }
});
// console.log(pages);

var allChecked = document.getElementById('allChecked');
var check = document.getElementsByClassName('checked');

function checkedSelect() {
    allChecked.onclick = function() {
        for (var i = 0; i < check.length; i++) {
            check[i].checked = this.checked;
        }
    };

    for (var i = 0; i < check.length; i++) {
        check[i].onclick = function() {
            var flag = true;
            for (var j = 0; j < check.length; j++) {
                if (!check[j].checked) {
                    flag = false;
                    break;
                }
            }
            allChecked.checked = flag;
        };
    }
}
checkedSelect();

// 获取每个页码
var pageClick = document.getElementById('pg').children;
// 页码折叠省略号部分
var pageEllipsis = document.getElementById('pageEllipsis');
// 上一页箭头
var userPageL = document.getElementById('userPageL');
// 下一页箭头
var userPageR = document.getElementById('userPageR');
// 跳转第几页输入框
var pageNum = document.getElementById('page_num');
var pageFlag = false;

function reqPage() {
    for (var i = 0; i < pageClick.length; i++) {
        // pageClick[i].addEventListener('click',function(){
        //     var thisPage = parseInt(this.children[0].innerHTML);
        //     function pageFor(thatPage, page) {
        //         if (page == 1) {
        //             return `<li><a href="javascript:;">1</a></li>`;
        //         } else if (thatPage - 2 > 1 && thatPage + 2 < page) {
        //             return `
        //                 <li><a href="javascript:;">1</a></li>
        //                 <li id="pageEllipsis"><span>...</span></li>
        //                 <li><a href="javascript:;">${thatPage - 1}</a></li>
        //                 <li><a href="javascript:;">${thatPage}</a></li>
        //                 <li><a href="javascript:;">${thatPage + 1}</a></li>
        //                 <li id="pageEllipsis"><span>...</span></li>
        //                 <li><a href="javascript:;">${page}</a></li>
        //             `;
        //         } else if (thatPage - 2 > 1 && thatPage + 2 >= page) {
        //             if (thatPage + 2 == page) {
        //                 return `
        //                 <li><a href="javascript:;">1</a></li>
        //                 <li id="pageEllipsis"><span>...</span></li>
        //                 <li><a href="javascript:;">${thatPage - 1}</a></li>
        //                 <li><a href="javascript:;">${thatPage}</a></li>
        //                 <li><a href="javascript:;">${thatPage + 1}</a></li>
        //                 <li><a href="javascript:;">${page}</a></li>
        //             `;
        //             } else if (thatPage === page) {
        //                 return `
        //                 <li><a href="javascript:;">1</a></li>
        //                 <li id="pageEllipsis"><span>...</span></li>
        //                 <li><a href="javascript:;">${page - 2}</a></li>
        //                 <li><a href="javascript:;">${page - 1}</a></li>
        //                 <li><a href="javascript:;">${page}</a></li>
        //             `;
        //             } else if (thatPage + 2 > page) {
        //                 return `
        //                 <li><a href="javascript:;">1</a></li>
        //                 <li id="pageEllipsis"><span>...</span></li>
        //                 <li><a href="javascript:;">${thatPage - 1}</a></li>
        //                 <li><a href="javascript:;">${thatPage}</a></li>
        //                 <li><a href="javascript:;">${page}</a></li>
        //             `;
        //             }
        //         } else if (page <= 5) {
        //             var userPageF = ``;
        //             for (var i = 1; i <= page; i++) {
        //                 userPageF += `<li><a href="javascript:;">${i}</a></li>`;
        //             }
        //             console.log(userPageF);
        //             return userPageF;
        //         } else if (page > 5 && thatPage <= 3) {
        //             return `
        //                 <li><a href="javascript:;">1</a></li>
        //                 <li><a href="javascript:;">2</a></li>
        //                 <li><a href="javascript:;">3</a></li>
        //                 <li><a href="javascript:;">4</a></li>
        //                 <li id="pageEllipsis"><span>...</span></li>
        //                 <li><a href="javascript:;">${page}</a></li>
        //             `;
        //         }
        //     }
        //     if (pageFlag) {
        //         $.ajax({
        //             type: 'get',
        //             url: '/admin/user',
        //             async: false,
        //             data: {
        //                 thisPage: thisPage
        //             },
        //             success: function(data) {
        //                 var { thatPage, page, total } = data;
        //                 document.getElementById('pg').innerHTML = `${pageFor(thatPage, page)}`;
        //                 pages = page;
        //                 totals = total;
        //                 reqPage();
        //             },
        //             error: function(err) {
        //                 console.log(err);
        //             }
        //         });
        //     }
        //     pageFlag = true;
        //     pageNum.value = this.children[0].innerHTML;
        //     var thisIndex = parseInt(this.children[0].innerHTML);
        //     if (thisIndex == 1) {
        //         if (userPageR.classList.remove('aDisable')) {
        //             userPageR.classList.remove('aDisable');
        //         }
        //         userPageL.classList.add('aDisable');
        //     } else if (thisIndex == pages) {
        //         if (userPageL.classList.remove('aDisable')) {
        //             userPageL.classList.remove('aDisable');
        //         }
        //         userPageR.classList.add('aDisable');
        //     } else if (pages == 1) {
        //         userPageR.classList.add('aDisable');
        //         userPageL.classList.add('aDisable');
        //     } else {
        //         userPageL.classList.remove('aDisable');
        //         userPageR.classList.remove('aDisable');
        //     }
        //     for (var j = 0; j < pageClick.length; j++) {
        //         if (pageClick[j].children[0].classList.remove('pageClick')) {
        //             pageClick[j].children[0].classList.remove('pageClick');
        //         }
        //         pageClick[j].children[0].classList.add('rPageClick');
        //     }
        //     console.log(this.children[0]);
        //     this.children[0].classList.remove('rPageClick');
        //     this.children[0].classList.add('pageClick');
        // });
        pageClick[i].onclick = function() {
            console.log(typeof(this));

            // console.log('333');
            // console.log(this.index);
            // switch (this.index) {
            //     case 1:
            //         userPageL.classList.add('aDisable');
            //     case 5:
            //         userPageR.classList.add('aDisable');
            //     default:
            //         if (userPageL.classList.remove('aDisable') && userPageR.classList.remove('aDisable')) {
            //             userPageL.classList.remove('aDisable');
            //             userPageR.classList.remove('aDisable');
            //         }
            // }
            // console.log(this.index);
            // console.log(pageClick.length - 2);
            // console.log(this.children[0].innerHTML);
            var thisPage = parseInt(this.children[0].innerHTML);
            // console.log(this.children[0].innerHTML);
            // console.log(thisPage);

            function pageFor(thatPage, page) {
                // console.log("pageFor");
                // for(var i=0;i<;i++){}
                if (page == 1) {
                    // console.log('page == 1');
                    return `<li><a href="javascript:;">1</a></li>`;
                } else if (thatPage - 2 > 1 && thatPage + 2 < page) {
                    // console.log('thatPage - 2 > 1 && thatPage + 2 < page');
                    return `
                        <li><a href="javascript:;">1</a></li>
                        <li id="pageEllipsis"><span>...</span></li>
                        <li><a href="javascript:;">${thatPage - 1}</a></li>
                        <li><a href="javascript:;">${thatPage}</a></li>
                        <li><a href="javascript:;">${thatPage + 1}</a></li>
                        <li id="pageEllipsis"><span>...</span></li>
                        <li><a href="javascript:;">${page}</a></li>
                    `;
                } else if (thatPage - 2 > 1 && thatPage + 2 >= page) {
                    // console.log('thatPage - 2 > 1 && thatPage + 2 >= page');
                    if (thatPage + 2 == page) {
                        return `
                        <li><a href="javascript:;">1</a></li>
                        <li id="pageEllipsis"><span>...</span></li>
                        <li><a href="javascript:;">${thatPage - 1}</a></li>
                        <li><a href="javascript:;">${thatPage}</a></li>
                        <li><a href="javascript:;">${thatPage + 1}</a></li>
                        <li><a href="javascript:;">${page}</a></li>
                    `;
                    } else if (thatPage === page) {
                        return `
                        <li><a href="javascript:;">1</a></li>
                        <li id="pageEllipsis"><span>...</span></li>
                        <li><a href="javascript:;">${page - 2}</a></li>
                        <li><a href="javascript:;">${page - 1}</a></li>
                        <li><a href="javascript:;">${page}</a></li>
                    `;
                    } else if (thatPage + 2 > page) {
                        return `
                        <li><a href="javascript:;">1</a></li>
                        <li id="pageEllipsis"><span>...</span></li>
                        <li><a href="javascript:;">${thatPage - 1}</a></li>
                        <li><a href="javascript:;">${thatPage}</a></li>
                        <li><a href="javascript:;">${page}</a></li>
                    `;
                    }
                    // return `
                    //     <li><a href="javascript:;">1</a></li>
                    //     <li id="pageEllipsis"><span>...</span></li>
                    //     <li><a href="javascript:;">${thatPage - 1}</a></li>
                    //     <li><a href="javascript:;">${thatPage}</a></li>
                    //     <li><a href="javascript:;">${thatPage + 1}</a></li>
                    //     <li><a href="javascript:;">${page}</a></li>
                    // `;
                } else if (page <= 5) {
                    // console.log('page <= 5');
                    var userPageF = ``;
                    for (var i = 1; i <= page; i++) {
                        userPageF += `<li><a href="javascript:;">${i}</a></li>`;
                    }
                    console.log(userPageF);
                    return userPageF;
                } else if (page > 5 && thatPage <= 3) {
                    // console.log('page > 5 && thatPage <= 3');
                    // if (thatPage == 1) {
                    //     return `
                    //         <li><a href="javascript:;">1</a></li>
                    //         <li><a href="javascript:;">2</a></li>
                    //         <li><a href="javascript:;">3</a></li>
                    //         <li><a href="javascript:;">4</a></li>
                    //         <li id="pageEllipsis"><span>...</span></li>
                    //         <li><a href="javascript:;">${page}</a></li>
                    //     `;
                    // }else if(thatPage == 2){
                    //     return `
                    //         <li><a href="javascript:;">1</a></li>
                    //         <li><a href="javascript:;">2</a></li>
                    //         <li><a href="javascript:;">3</a></li>
                    //         <li><a href="javascript:;">4</a></li>
                    //         <li id="pageEllipsis"><span>...</span></li>
                    //         <li><a href="javascript:;">${page}</a></li>
                    //     `;
                    // }
                    return `
                        <li><a href="javascript:;">1</a></li>
                        <li><a href="javascript:;">2</a></li>
                        <li><a href="javascript:;">3</a></li>
                        <li><a href="javascript:;">4</a></li>
                        <li id="pageEllipsis"><span>...</span></li>
                        <li><a href="javascript:;">${page}</a></li>
                    `;
                }
            }
            if (pageFlag) {
                $.ajax({
                    type: 'get',
                    url: '/admin/user',
                    async: false,
                    data: {
                        thisPage: thisPage
                    },
                    success: function(data) {
                        var { thatPage, page, total } = data;
                        // console.log(data);
                        // console.log(thatPage, page, total);
                        // document.getElementById('pg').innerHTML = `
                        //         <li><a href="javascript:;" class="userPageL" id="userPageL"><i class="iconfont icon-tubiaozhizuo-"></i></a></li>
                        //         ${pageFor(thatPage, page)}
                        //         <li><a href="javascript:;" class="userPageR" id="userPageR"><i class="iconfont icon-tubiaozhizuo-1"></i></a></li>
                        //         `;
                        document.getElementById('pg').innerHTML = `${pageFor(thatPage, page)}`;
                        // console.log('加载完成');
                        pages = page;
                        totals = total;
                        // if (page == 1) {
                        //     document.getElementById('pg').innerHTML = `
                        //         <li><a href="javascript:;" class="userPageL" id="userPageL"><i class="iconfont icon-tubiaozhizuo-"></i></a></li>
                        //         <li><a href="javascript:;">1</a></li>
                        //         <li><a href="javascript:;" class="userPageR" id="userPageR"><i class="iconfont icon-tubiaozhizuo-1"></i></a></li>
                        //         `;
                        // } else if (thatPage - 2 < 1) {
                        //     document.getElementById('pg').innerHTML = `
                        //         <li><a href="javascript:;" class="userPageL" id="userPageL"><i class="iconfont icon-tubiaozhizuo-"></i></a></li>
                        //         ${pageFor()}
                        //         <li><a href="javascript:;">1</a></li>
                        //         <li><a href="javascript:;" class="userPageR" id="userPageR"><i class="iconfont icon-tubiaozhizuo-1"></i></a></li>
                        //         `;
                        // }
                        // if (thatPage - 1 == 1) {
                        //     document.getElementById('pg').innerHTML = `
                        //         <li><a href="javascript:;" class="userPageL" id="userPageL"><i class="iconfont icon-tubiaozhizuo-"></i></a></li>
                        //         <li><a href="javascript:;">1</a></li>
                        //         <li><a href="javascript:;">2</a></li>
                        //         <li><a href="javascript:;">3</a></li>
                        //         <li id="pageEllipsis"><span>...</span></li>
                        //         <li><a href="javascript:;">${page}</a></li>
                        //         <li><a href="javascript:;" class="userPageR" id="userPageR"><i class="iconfont icon-tubiaozhizuo-1"></i></a></li>
                        //         `;
                        //     pageSize += `<li><a href="javascript:;">${i}</a></li>`;
                        // } else if (thatPage - 1 == 1) {}
                        reqPage();
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            }
            pageFlag = true;
            // console.log(pageClick);
            pageNum.value = this.children[0].innerHTML;
            var thisIndex = parseInt(this.children[0].innerHTML);
            if (thisIndex == 1) {
                // console.log('l');
                if (userPageR.classList.remove('aDisable')) {
                    userPageR.classList.remove('aDisable');
                }
                userPageL.classList.add('aDisable');
            } else if (thisIndex == pages) {
                // console.log('r');
                if (userPageL.classList.remove('aDisable')) {
                    userPageL.classList.remove('aDisable');
                }
                userPageR.classList.add('aDisable');
            } else if (pages == 1) {
                // console.log('lr');
                userPageR.classList.add('aDisable');
                userPageL.classList.add('aDisable');
            } else {
                console.log('else');
                // console.log('111');
                userPageL.classList.remove('aDisable');
                userPageR.classList.remove('aDisable');
                // if (userPageL.classList.remove('aDisable') && userPageR.classList.remove('aDisable')) {
                //     console.log('222');
                //     userPageL.classList.remove('aDisable');
                //     userPageR.classList.remove('aDisable');
                // }
            }
            for (var j = 0; j < pageClick.length; j++) {
                // console.log(pageClick[j].children[0]);
                if (pageClick[j].children[0].classList.remove('pageClick')) {
                    pageClick[j].children[0].classList.remove('pageClick');
                }
                pageClick[j].children[0].classList.add('rPageClick');
            }
            console.log(this.children[0]);
            this.children[0].classList.remove('rPageClick');
            this.children[0].classList.add('pageClick');
        }
    }
}
reqPage();
pageClick[0].click();
userPageL.onclick = function() {
    if (userPageL.classList.contains('aDisable')) {
        return;
    } else {
        for (var i = 0; i < pageClick.length; i++) {
            var pageIndex = pageClick[i].children[0] == document.getElementsByClassName('pageClick')[0] ? i : 0;
            if (pageClick[i].children[0] == document.getElementsByClassName('pageClick')[0]) {
                pageClick[pageIndex].click();
                return;
            }
        }
    }
}
userPageR.onclick = function() {}

// 用户角色
var selectRole = document.getElementsByClassName('select_role')[0];
var roleText = document.getElementById('role_text');
var roleUl = document.getElementById('role_ul');
var roleFlag = true;
// 用户状态
var selectState = document.getElementsByClassName('select_state')[0];
var stateText = document.getElementById('state_text');
var stateUl = document.getElementById('state_ul');
var stateFlag = true;

function selectClick() {
    // 用户角色下拉
    selectRole.onclick = function(e) {
        if (!stateFlag) { stateFlag = !stateFlag; }
        selectState.children[1].children[0].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
        stateUl.style.display = 'none';
        if (roleFlag) {
            selectRole.children[1].children[0].setAttribute('class', 'iconfont icon-shangsanjiaoxing');
            roleUl.style.display = 'block';
        } else {
            selectRole.children[1].children[0].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
            roleUl.style.display = 'none';
        }
        roleFlag = !roleFlag;
        stopFunc(e);
    }
    roleUl.onclick = function(e) {
        stopFunc(e);
    }

    function stopFunc(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }
    // document.onclick = function(e) {
    //     console.log(111);
    //     if (!roleFlag) { roleFlag = !roleFlag; }
    //     selectRole.children[1].children[0].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
    //     roleUl.style.display = 'none';
    // }
    // console.log(roleUl.children);
    for (var i = 0; i < roleUl.children.length; i++) {
        roleUl.children[i].onclick = function() {
            roleText.innerHTML = this.innerHTML;
            selectRole.click();
        }
    }
    // 用户状态下拉
    selectState.onclick = function(e) {
        if (!roleFlag) { roleFlag = !roleFlag; }
        selectRole.children[1].children[0].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
        roleUl.style.display = 'none';
        if (stateFlag) {
            selectState.children[1].children[0].setAttribute('class', 'iconfont icon-shangsanjiaoxing');
            stateUl.style.display = 'block';
        } else {
            selectState.children[1].children[0].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
            stateUl.style.display = 'none';
        }
        stateFlag = !stateFlag;
        stopFuncc(e);
    }
    stateUl.onclick = function(e) {
        stopFuncc(e);
    }

    function stopFuncc(e) {
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }
    document.onclick = function(e) {
        // console.log(222);
        if (!stateFlag) { stateFlag = !stateFlag; }
        selectState.children[1].children[0].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
        stateUl.style.display = 'none';

        if (!roleFlag) { roleFlag = !roleFlag; }
        selectRole.children[1].children[0].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
        roleUl.style.display = 'none';
    }
    for (var i = 0; i < stateUl.children.length; i++) {
        stateUl.children[i].onclick = function() {
            stateText.innerHTML = this.innerHTML;
            selectState.click();
        }
    }
}
selectClick();