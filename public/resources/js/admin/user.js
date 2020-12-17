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
var pageReq = false;
var pageTotal = '';

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
            if (pageFlag && pageReq) {
                // console.log(111);
                $.ajax({
                    type: 'get',
                    url: '/admin/user',
                    async: false,
                    data: {
                        pagesize: pageTotal,
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
                        tipsEdit();
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            }
            pageReq = true;
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
                // console.log('else');
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

var userRoleHidden = document.getElementById('userRoleHidden');
var userStateHidden = document.getElementById('userStateHidden');

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
            userRoleHidden.value = this.value;
            console.log(userRoleHidden.value);
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
            // 用户状态下拉框隐藏域value赋值
            userStateHidden.value = this.value;
            console.log(userStateHidden.value);
            selectState.click();
        }
    }
}
selectClick();

var searchButton = document.getElementsByClassName('search_button')[0];
var userNameInput = document.getElementById('userNameInput');
var userEmailInput = document.getElementById('userEmailInput');

searchButton.onclick = function() {
    var searchNickname = userNameInput.value.trim();
    var searchEmail = userEmailInput.value.trim();
    var searchRole = userRoleHidden.value;
    var searchState = userStateHidden.value;
    // if (searchRole === '2' && searchState === '2') {}
    $.ajax({
        type: 'get',
        url: '/admin/userSearch',
        data: {
            username: searchNickname,
            useremail: searchEmail,
            userrole: searchRole,
            userstate: searchState
        },
        success: function(data) {
            // console.log(data);
            let { thatPage, totalPage, userResult, count } = data;
            // console.log(thatPage);
            // console.log(totalPage);
            // console.log(userResult);
            tbodyContent = ``;
            for (var x = 0; x < userResult.length; x++) {
                tbodyContent += `
                            <tr>
                                <td><input type="checkbox" class="checked"></td>
                                <td>${userResult[x]._id}</td>
                                <td>${userResult[x].usernmae}</td>
                                <td>${userResult[x].email}</td>
                                <td class="th_center">${userResult[x].role == 'admin' ? '管理员' : '普通用户'}</td>
                                <td class="th_center">${userResult[x].state == 0 ? '启用' : '禁用'}</td>
                                <td class="operation">
                                    <div class="operation_center">
                                        <a class="modify" href="#"><i class="iconfont icon-xiugai"></i>编辑</a>
                                        <a class="delete" href="#"><i class="iconfont icon-shanchu"></i>删除</a>
                                    </div>
                                </td>
                            </tr>
                        `;
            }
            // console.log(tbodyContent);
            document.getElementById('tbody').innerHTML = tbodyContent;
            document.getElementsByClassName('total')[0].children[0].innerHTML = count;
            document.getElementById('pg').innerHTML = `${pageFor(thatPage, totalPage)}`;
            pages = totalPage;
            count = count;
            // reqPage();
            // console.log(pageClick);
            // console.log(typeof(thatPage));
            for (var j = 0; j < pageClick.length; j++) {
                if (parseInt(pageClick[j].children[0].innerHTML) == thatPage) {
                    // console.log(j);
                    pageReq = false;
                    // pageTotal = val;
                    // console.log('aabb');
                    tipsEdit();
                    reqPage();
                    pageClick[j].click();
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}

var tipsSelect1 = document.getElementsByClassName('tips_select')[0];
var tipsBg = document.getElementsByClassName('tips_background')[0];
var tips = document.getElementsByClassName('tips')[0];
var iconFont = document.getElementById('iconFont');
var userModify = document.getElementsByClassName('modify');
// var tipsRow = document.getElementsByClassName('tips_row');
var tipsInput = document.getElementsByClassName('tips_input')[0];
// console.log(userModify);


// console.log(tipsBg);
// console.log(iconFont);

var tipsSelectArr = [];

function tipsSelect() {
    for (var y = 0; y < document.getElementsByClassName('tips_select').length; y++) {
        document.getElementsByClassName('tips_select')[y].y = y;
        tipsSelectArr[y] = true;
        document.getElementsByClassName('tips_select')[y].onclick = function(event) {
            // console.log(event);
            event.stopPropagation();
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

var thCenter = document.getElementsByClassName('th_center');
var tipsSelects = document.getElementsByClassName('tips_select');
// console.log(document.getElementById('tbody').children[0].document.getElementsByClassName('tips_select'));

function tipsEdit() {
    tipsSelect();
    tips.onclick = function() {
        tipsSelectArr[0] = true;
        tipsSelectArr[1] = true;
        document.getElementsByClassName('tips_select')[0].children[1].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
        document.getElementsByClassName('tips_select')[0].children[2].style.display = 'none';
        document.getElementsByClassName('tips_select')[1].children[1].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
        document.getElementsByClassName('tips_select')[1].children[2].style.display = 'none';
        // console.log(tipsSelectArr);
    }
    for (var i = 0; i < userModify.length; i++) {
        userModify[i].index = i;
        userModify[i].onclick = function() {
            // console.log(111);
            // console.log(this.parentNode.parentNode.parentNode.children[2].innerHTML);
            tipsInput.children[0].value = document.getElementById('tbody').children[this.index].children[2].innerHTML;
            for (var j = 0; j < 2; j++) {
                // console.log(tipsSelects[j]);
                // console.log(document.getElementById('tbody').children[this.index].children[j + 4]);
                tipsSelects[j].children[0].innerHTML = document.getElementById('tbody').children[this.index].children[j + 4].innerHTML;
            }
            tipsBg.style.display = 'block';
            tips.style.display = 'block';
        }
    }
    iconFont.onclick = function() {
        tipsBg.style.display = 'none';
        tips.style.display = 'none';
    }
    tipsBg.onclick = function() {
        tipsBg.style.display = 'none';
        tips.style.display = 'none';
    }
}
tipsEdit();

var selectChildren = document.getElementsByClassName('select_children');
// console.log(selectChildren);

function selectContent() {
    for (var i = 0; i < selectChildren.length; i++) {
        // console.log(selectChildren[i]);
        for (var j = 0; j < selectChildren[i].children.length; j++) {
            selectChildren[i].children[j].onclick = function(event) {
                event.stopPropagation();
                this.parentNode.parentNode.parentNode.children[0].innerHTML = this.innerHTML;
                tipsSelectArr[0] = true;
                tipsSelectArr[1] = true;
                console.log(tipsSelectArr);
                // this.parentNode.parentNode.parentNode.click();
                document.getElementsByClassName('tips_select')[0].children[1].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
                document.getElementsByClassName('tips_select')[0].children[2].style.display = 'none';
                document.getElementsByClassName('tips_select')[1].children[1].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
                document.getElementsByClassName('tips_select')[1].children[2].style.display = 'none';
            }
        }
    }
}
selectContent();

var dataTotal = document.getElementById('data_total');
// console.log(dataTotal.children);
var totalFlag = true;

function userReqTotal(obj) {
    var val = obj.options[obj.options.selectedIndex].value;
    totalFlag = !totalFlag;
    if (totalFlag) {
        $.ajax({
            type: 'get',
            url: '/admin/user',
            data: {
                pagesize: val
            },
            success: function(data) {
                console.log(data);
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
                // reqPage();
                // console.log(pageClick);
                // console.log(typeof(thatPage));
                for (var j = 0; j < pageClick.length; j++) {
                    if (parseInt(pageClick[j].children[0].innerHTML) == thatPage) {
                        // console.log(j);
                        pageReq = false;
                        pageTotal = val;
                        reqPage();
                        pageClick[j].click();
                    }
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    } else {
        return false;
    }
}

function userEdit() {
    $.ajax({
        type: 'get',
        url: '/admin/user',
        data: {
            pagesize: val
        },
        success: function(data) {
            console.log(data);
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
            // reqPage();
            // console.log(pageClick);
            // console.log(typeof(thatPage));
            for (var j = 0; j < pageClick.length; j++) {
                if (parseInt(pageClick[j].children[0].innerHTML) == thatPage) {
                    // console.log(j);
                    pageReq = false;
                    pageTotal = val;
                    reqPage();
                    pageClick[j].click();
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}