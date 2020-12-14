var pages = new Number();
var count = new Number();
var tbodyContent = ``;
$.ajax({
    type: 'get',
    url: '/admin/user',
    async: false,
    data: {
        // page: 5
    },
    success: function(data) {
        var { totalPage, count, users } = data;
        document.getElementsByClassName('total')[0].children[0].innerHTML = count;
        var pageSize = ``;
        for (var i = 1; i <= totalPage; i++) {
            if (totalPage < 5) {
                pageSize += `<li><a href="javascript:;">${i}</a></li>`;
            } else if (totalPage == 5) {
                pageSize += `<li><a href="javascript:;">${i}</a></li>`;
            } else {
                if (i <= 3) {
                    pageSize += `<li><a href="javascript:;">${i}</a></li>`;
                } else if (i == totalPage) {
                    pageSize += `<li id="pageEllipsis"><span>...</span></li><li><a href="javascript:;">${i}</a></li>`;
                } else {
                    continue
                }
            }
        }
        for (var x = 0; x < users.length; x++) {
            tbodyContent += `
                <tr>
                    <td><input type="checkbox" class="checked"></td>
                    <td>${users[x]._id}</td>
                    <td>${users[x].usernmae}</td>
                    <td>${users[x].email}</td>
                    <td class="th_center">${users[x].role == 'admin' ? '管理员' : '普通用户'}</td>
                    <td class="th_center">${users[x].state == 0 ? '启用' : '禁用'}</td>
                    <td class="operation">
                        <div class="operation_center">
                            <a class="modify" href="#"><i class="iconfont icon-xiugai"></i>编辑</a>
                            <a class="delete" href="#"><i class="iconfont icon-shanchu"></i>删除</a>
                        </div>
                    </td>
                </tr>
            `;
        }
        document.getElementById('tbody').innerHTML = tbodyContent;
        // console.log(document.getElementById('tbody'));
        document.getElementById('pg').innerHTML = `${pageSize}`;
        pages = totalPage;
        count = count;
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

function pageFor(thatPage, page) {
    if (page == 1) {
        return `<li><a href="javascript:;">1</a></li>`;
    } else if (thatPage - 2 > 1 && thatPage + 2 < page) {
        return `
            <li><a href="javascript:;">1</a></li>
            <li id="pageEllipsis"><span>...</span></li>
            <li><a href="javascript:;">${thatPage - 1}</a></li>
            <li><a href="javascript:;">${thatPage}</a></li>
            <li><a href="javascript:;">${thatPage + 1}</a></li>
            <li id="pageEllipsis"><span>...</span></li>
            <li><a href="javascript:;">${page}</a></li>
        `;
    } else if (thatPage - 2 > 1 && thatPage + 2 >= page && page !== 4) {
        if (thatPage + 2 == page) {
            return `
            <li><a href="javascript:;">1</a></li>
            <li id="pageEllipsis"><span>...</span></li>
            <li><a href="javascript:;">${thatPage - 1}</a></li>
            <li><a href="javascript:;">${thatPage}</a></li>
            <li><a href="javascript:;">${thatPage + 1}</a></li>
            <li><a href="javascript:;">${page}</a></li>
        `;
        } else if (thatPage === page && page !== 4) {
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
    } else if (page <= 5) {
        var userPageF = ``;
        for (var i = 1; i <= page; i++) {
            userPageF += `<li><a href="javascript:;">${i}</a></li>`;
        }
        return userPageF;
    } else if (page > 5 && thatPage <= 3) {
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

function lrFlag() {
    if (pages == 1) {
        userPageR.classList.add('aDisable');
        userPageL.classList.add('aDisable');
    } else if (thisIndex == 1) {
        if (userPageR.classList.remove('aDisable')) {
            userPageR.classList.remove('aDisable');
        }
        userPageL.classList.add('aDisable');
    } else if (thisIndex == pages) {
        if (userPageL.classList.remove('aDisable')) {
            userPageL.classList.remove('aDisable');
        }
        userPageR.classList.add('aDisable');
    } else {
        console.log('else');
        userPageL.classList.remove('aDisable');
        userPageR.classList.remove('aDisable');
    }
}

function reqPage() {
    for (var i = 0; i < pageClick.length; i++) {
        // console.log('2222');
        pageClick[i].index = i;
        // console.log(pageClick[i]);
        pageClick[i].onclick = function() {
            // console.log(this.getAttribute('id') === 'pageEllipsis' ? 1 : 0);
            if (this.getAttribute('id') === 'pageEllipsis') { return }
            // console.log('222');
            // console.log(this);
            var thisPage = parseInt(this.children[0].innerHTML);
            if (pageFlag) {
                $.ajax({
                    type: 'get',
                    url: '/admin/user',
                    async: false,
                    data: {
                        thisPage: thisPage
                    },
                    success: function(data) {
                        let { thatPage, totalPage, users } = data;
                        tbodyContent = ``;
                        for (var x = 0; x < users.length; x++) {
                            tbodyContent += `
                                <tr>
                                    <td><input type="checkbox" class="checked"></td>
                                    <td>${users[x]._id}</td>
                                    <td>${users[x].usernmae}</td>
                                    <td>${users[x].email}</td>
                                    <td class="th_center">${users[x].role == 'admin' ? '管理员' : '普通用户'}</td>
                                    <td class="th_center">${users[x].state == 0 ? '启用' : '禁用'}</td>
                                    <td class="operation">
                                        <div class="operation_center">
                                            <a class="modify" href="#"><i class="iconfont icon-xiugai"></i>编辑</a>
                                            <a class="delete" href="#"><i class="iconfont icon-shanchu"></i>删除</a>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }
                        document.getElementById('tbody').innerHTML = tbodyContent;
                        document.getElementById('pg').innerHTML = `${pageFor(thatPage, totalPage)}`;
                        pages = totalPage;
                        count = count;
                        // console.log('1111111111');
                        reqPage();
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            }
            pageFlag = true;
            pageNum.value = this.children[0].innerHTML;
            var thisIndex = parseInt(this.children[0].innerHTML);
            // lrFlag();
            if (pages == 1) {
                userPageR.classList.add('aDisable');
                userPageL.classList.add('aDisable');
            } else if (thisIndex == 1) {
                if (userPageR.classList.remove('aDisable')) {
                    userPageR.classList.remove('aDisable');
                }
                userPageL.classList.add('aDisable');
            } else if (thisIndex == pages) {
                if (userPageL.classList.remove('aDisable')) {
                    userPageL.classList.remove('aDisable');
                }
                userPageR.classList.add('aDisable');
            } else {
                console.log('else');
                userPageL.classList.remove('aDisable');
                userPageR.classList.remove('aDisable');
            }
            for (var j = 0; j < pageClick.length; j++) {
                if (parseInt(pageClick[j].children[0].innerHTML) == parseInt(this.children[0].innerHTML)) {
                    pageClick[j].children[0].classList.remove('rpageClick');
                    pageClick[j].children[0].classList.add('pageClick');
                }
            }
            // this.children[0].classList.remove('rpageClick');
            // this.children[0].classList.add('pageClick');
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
                pageClick[pageIndex - 1].click();
                return;
            }
        }
    }
}
userPageR.onclick = function() {}

function jupPage() {
    // console.log(pageNum.value);
    $.ajax({
        type: 'get',
        url: '/admin/user',
        // async: false,
        data: {
            thisPage: parseInt(pageNum.value)
        },
        success: function(data) {
            let { thatPage, totalPage } = data;
            // console.log(data);
            document.getElementById('pg').innerHTML = `${pageFor(thatPage, totalPage)}`;
            pages = totalPage;
            count = count;
            // lrFlag();
            for (var j = 0; j < pageClick.length; j++) {
                if (parseInt(pageClick[j].children[0].innerHTML) == thatPage) {
                    reqPage();
                    pageClick[j].click();
                }
            }
            // reqPage();
        },
        error: function(err) {
            console.log(err);
        }
    });
}

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

var tipsSelect1 = document.getElementsByClassName('tips_select')[0];
console.log(tipsSelect1);
// var tipsSelectFlag1 = true;
// var tipsSelectFlag2 = true;
// var tipsSelectFlag = true;
var tipsSelectArr = [];

function tipsEdit() {
    for (var y = 0; y < document.getElementsByClassName('tips_select').length; y++) {
        document.getElementsByClassName('tips_select')[y].y = y;
        // var tipsSelectNum = 'tipsSelectFlag' + y;
        // window[tipsSelectNum] = true;
        // tipsSelectArr[y] = 'tipsSelectFlag' + y;tipsSelectArr
        tipsSelectArr[y] = true;
        document.getElementsByClassName('tips_select')[y].onclick = function() {
            if (tipsSelectArr[this.y] === true) {
                this.children[1].setAttribute('class', 'iconfont icon-shangsanjiaoxing');
                this.children[2].style.display = 'block';
            } else {
                this.children[1].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
                this.children[2].style.display = 'none';
            }
            tipsSelectArr[this.y] = !tipsSelectArr[this.y];
        }
    }
}
tipsEdit();