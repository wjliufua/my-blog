// 页码数
var pages = new Number();
// 查询数据总条数
var count = new Number();
// 存储服务器端发送的用户搜索筛选条件
var searchArry = [];
// 用来拼接模板字符串，后渲染到页面上
// table 标签内容拼接
var tbodyContent = ``;
// 页面第一次加载发送的用户数据渲染请求
$.ajax({
    type: 'get',
    url: '/admin/user',
    async: false,
    data: {
        /**
         * 用来给服务器端识别是否为用户搜索筛选
         * false : 否
         * true : 是
         */
        search: false
    },
    success: function(data) {
        /**
         * 解构服务器端返回的数据
         * totalPage : 按照此条件查询得到的总页数 (总页数)
         * count : 按照此条件查询得到的数据总量 (总条数)
         * users : 按照此条件查询得到的用户数据 (用户数据)
         */
        var { totalPage, count, users } = data;
        // 将 总条数 渲染到该元素上
        document.getElementsByClassName('total')[0].children[0].innerHTML = count;
        // 页码模板字符串
        var pageSize = ``;
        // 页码模板字符串 拼接
        // totalPage : 总页数
        for (var i = 1; i <= totalPage; i++) {
            if (totalPage < 5) {
                // 总页数 < 5
                pageSize += `<li><a href="javascript:;">${i}</a></li>`;
            } else if (totalPage == 5) {
                // 总页数 == 5
                pageSize += `<li><a href="javascript:;">${i}</a></li>`;
            } else {
                // 总页数 > 5
                if (i <= 3) {
                    // 总页数 > 5 渲染时 i <= 3
                    pageSize += `<li><a href="javascript:;">${i}</a></li>`;
                } else if (i == totalPage) {
                    // 总页数 > 5 渲染时 i == 总页数
                    pageSize += `<li id="pageEllipsis"><span>...</span></li><li><a href="javascript:;">${i}</a></li>`;
                } else {
                    continue
                }
            }
        }
        /**
         * 循环拼接table模板
         * users : 用户数据
         * tbodyContent : table 标签内容拼接
         */
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
        // 把拼接好的 用户信息 模板渲染到id为 tbody 的元素上
        document.getElementById('tbody').innerHTML = tbodyContent;
        // 把拼接好的 页码 模板渲染到id为 pg 的元素上
        document.getElementById('pg').innerHTML = `${pageSize}`;
        // 页码数量赋值
        pages = totalPage;
        // 查询用户数量赋值
        count = count;
    },
    error: function(err) {
        console.log(err);
    }
});

// 用户全选复选框按钮获取
var allChecked = document.getElementById('allChecked');
// 用户选择复选框按钮获取
var check = document.getElementsByClassName('checked');

// 用户单个选择 及 用户全选函数
function checkedSelect() {
    // 用户全选复选框按钮点击
    allChecked.onclick = function() {
        for (var i = 0; i < check.length; i++) {
            check[i].checked = this.checked;
        }
    };

    // 循环获取用户点击按钮
    for (var i = 0; i < check.length; i++) {
        // 用户选择复选框按钮点击
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
/**
 * 是否为第一次发送页码请求 (后做判断)
 * 第一次发送 false
 * 不是一次发送 true
 */
var pageFlag = false;
/**
 * 是否为点击发送的请求
 * 其他函数触发为 false
 * 点击页码获取触发为 true
 */
var pageReq = false;
// 发送至后台每页显示的数据条数
var pageTotal = '';

/**
 * @method pageFor
 * @param {Number} thatPage 当前点击跳转第几页
 * @param {Number} page 总页数
 */
function pageFor(thatPage, page) {
    if (page == 1) {
        // 总页数 == 1
        return `<li><a href="javascript:;">1</a></li>`;
    } else if (thatPage - 2 > 1 && thatPage + 2 < page) {
        // 当前点击页码 - 2 > 1 && 当前点击页码 + 2 < 总页数
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
        // 当前点击页码 - 2 > 1 && 当前点击页码 + 2 >= 总页数 && 总页数 !== 4
        if (thatPage + 2 == page) {
            // 当前点击页码 - 2 > 1 && 当前点击页码 + 2 >= 总页数 && 总页数 !== 4
            // 当前点击页码 + 2 == 总页数
            return `
            <li><a href="javascript:;">1</a></li>
            <li id="pageEllipsis"><span>...</span></li>
            <li><a href="javascript:;">${thatPage - 1}</a></li>
            <li><a href="javascript:;">${thatPage}</a></li>
            <li><a href="javascript:;">${thatPage + 1}</a></li>
            <li><a href="javascript:;">${page}</a></li>
        `;
        } else if (thatPage === page && page !== 4) {
            // 当前点击页码 - 2 > 1 && 当前点击页码 + 2 >= 总页数 && 总页数 !== 4
            // 当前点击页码 + 2 === 总页数 && 总页数 !== 4
            return `
            <li><a href="javascript:;">1</a></li>
            <li id="pageEllipsis"><span>...</span></li>
            <li><a href="javascript:;">${page - 2}</a></li>
            <li><a href="javascript:;">${page - 1}</a></li>
            <li><a href="javascript:;">${page}</a></li>
        `;
        } else if (thatPage + 2 > page) {
            // 当前点击页码 - 2 > 1 && 当前点击页码 + 2 >= 总页数 && 总页数 !== 4
            // 当前点击页码 + 2 > 总页数
            return `
            <li><a href="javascript:;">1</a></li>
            <li id="pageEllipsis"><span>...</span></li>
            <li><a href="javascript:;">${thatPage - 1}</a></li>
            <li><a href="javascript:;">${thatPage}</a></li>
            <li><a href="javascript:;">${page}</a></li>
        `;
        }
    } else if (page <= 5) {
        // 总页数 <= 5

        // 页码模板字符串
        var userPageF = ``;
        // 拼接页码模板字符串
        for (var i = 1; i <= page; i++) {
            userPageF += `<li><a href="javascript:;">${i}</a></li>`;
        }
        return userPageF;
    } else if (page > 5 && thatPage <= 3) {
        // 总页数 > 5 && 当前点击页码 <= 3
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

// 上一页 下一页点击按钮样式
function lrFlag(thisIndex) {
    if (pages == 1) {
        // 总页数 == 1
        // 上下页按钮添加不可点击样式
        userPageR.classList.add('aDisable');
        userPageL.classList.add('aDisable');
    } else if (thisIndex == 1) {
        // 总页数 !== 1
        // 点击页码为 1 时
        if (userPageR.classList.remove('aDisable')) {
            // 移除下一页不可点击样式
            userPageR.classList.remove('aDisable');
        }
        // 给上一页添加不可点击样式
        userPageL.classList.add('aDisable');
    } else if (thisIndex == pages) {
        // 总页数 !== 1
        // 点击页码 == 总页数 时
        if (userPageL.classList.remove('aDisable')) {
            // 移除上一页不可点击样式
            userPageL.classList.remove('aDisable');
        }
        // 给下一页添加不可点击样式
        userPageR.classList.add('aDisable');
    } else {
        // 给上下页点击按钮移除不可点击样式
        userPageL.classList.remove('aDisable');
        userPageR.classList.remove('aDisable');
    }
}

// 请求页面数据
function reqPage() {
    // pageClick : 页码点击按钮
    for (var i = 0; i < pageClick.length; i++) {
        // 给每个页码变量自定义属性 index
        // index 值为当前循环页码 i 值
        pageClick[i].index = i;
        // 给每个页码添加点击事件
        pageClick[i].onclick = function() {
            // 如果点击的页码 id 值为 pageEllipsis 则直接返回 不予做点击处理
            // 页码 id 值为 pageEllipsis 的页码为 : ... (省略号)
            if (this.getAttribute('id') === 'pageEllipsis') { return }
            // 把获取的页码值转换为 Number 类型
            var thisPage = parseInt(this.children[0].innerHTML);
            /**
             * 如果 页码不是第一次点击 且 不为其他函数触发该点击事件 则发送请求
             * pageFlag : 是否为第一次请求
             * pageReq : 是否为其他函数触发该点击事件
             */
            if (pageFlag && pageReq) {
                $.ajax({
                    type: 'get',
                    url: '/admin/user',
                    async: false,
                    data: {
                        // pagesize 每页显示多少条数据
                        // pageTotal 默认为空
                        pagesize: pageTotal,
                        // thisPage 当前点击第几页
                        thisPage: thisPage,
                        // search 是否为用户搜索筛选
                        search: false,
                        // searchArry 是否为用户搜索筛选 默认为空
                        // Array
                        searchArry: searchArry
                    },
                    success: function(data) {
                        // console.log(data);
                        /**
                         * 解构服务器端返回的数据
                         * thatPage : 当前点击的页码
                         * count : 按照此条件查询得到的数据总量 (总条数)
                         * totalPage : 按照此条件查询得到的总页数 (总页数)
                         * users : 按照此条件查询得到的用户数据 (用户数据)
                         */
                        let { thatPage, count, totalPage, users } = data;
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
                        // 渲染用户数据
                        document.getElementById('tbody').innerHTML = tbodyContent;
                        // 渲染页码
                        document.getElementById('pg').innerHTML = `${pageFor(thatPage, totalPage)}`;
                        // 更新总页数
                        pages = totalPage;
                        // 更新总条数
                        count = count;
                        // 将 总条数 渲染到该元素上
                        document.getElementsByClassName('total')[0].children[0].innerHTML = count;
                        // 重新渲染页码
                        reqPage();
                        // 重新绑定用户的修改弹窗
                        tipsEdit();
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            }
            // 是否第一次发送页码更改为 否
            pageReq = true;
            // 是否页码获取触发更改为 是
            pageFlag = true;
            // 跳转第几页输入框内容更改为当前页码
            pageNum.value = this.children[0].innerHTML;
            // 把当前页码转换为 Number
            var thisIndex = parseInt(this.children[0].innerHTML);
            // 判断上一页 下一页点击按钮样式
            lrFlag(thisIndex);
            // 循环页码按钮
            for (var j = 0; j < pageClick.length; j++) {
                if (parseInt(pageClick[j].children[0].innerHTML) == parseInt(this.children[0].innerHTML)) {
                    // 当前循环页码 == 当前点击页码

                    // 当前点击页码移除 未被点击样式
                    pageClick[j].children[0].classList.remove('rpageClick');
                    // 当前点击页码添加 被点击样式
                    pageClick[j].children[0].classList.add('pageClick');
                }
            }
        }
    }
}
reqPage();
// 触发页码点击 (点击第一页)
pageClick[0].click();

// 上一页按钮点击事件
userPageL.onclick = function() {
    if (userPageL.classList.contains('aDisable')) {
        // 当前为第一页
        return;
    } else {
        for (var i = 0; i < pageClick.length; i++) {
            if (pageClick[i].children[0] == document.getElementsByClassName('pageClick')[0]) {
                // 匹配当前点击页码

                // 点击获取页码 - 1
                pageClick[i - 1].click();
                return;
            }
        }
    }
}

// 下一页按钮点击事件
userPageR.onclick = function() {}

// 跳转到第几页
function jupPage() {
    $.ajax({
        type: 'get',
        url: '/admin/user',
        data: {
            // thisPage : 当前第几页
            // 把跳转页码转换为 Number
            thisPage: parseInt(pageNum.value),
            // 是否为搜索筛选用户
            // false : 否
            search: false
        },
        success: function(data) {
            // thatPage : 当前页码
            // totalPage : 总页数
            let { thatPage, totalPage } = data;
            // 渲染页码点击按钮
            document.getElementById('pg').innerHTML = `${pageFor(thatPage, totalPage)}`;
            // 更新总页数
            pages = totalPage;
            // 更新总条数
            count = count;
            // 循环页码按钮
            for (var j = 0; j < pageClick.length; j++) {
                if (parseInt(pageClick[j].children[0].innerHTML) == thatPage) {
                    // 当点击的页码数 == 当前页码

                    // 调用此函数重新获取页码按钮
                    reqPage();
                    // 点击当前页码
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

// 用户筛选 用户角色下拉框
var selectRole = document.getElementsByClassName('select_role')[0];
// 用户筛选 用户角色下拉框选择展示文字
var roleText = document.getElementById('role_text');
// 用户筛选 用户角色下拉框选项
var roleUl = document.getElementById('role_ul');
// 用户筛选 用户角色下拉框是否为展开状态判断
// true : 用户角色下拉框为展开状态
// false : 用户角色下拉框为收起状态
var roleFlag = true;

// 用户筛选 用户状态下拉框
var selectState = document.getElementsByClassName('select_state')[0];
// 用户筛选 用户状态下拉框选择展示文字
var stateText = document.getElementById('state_text');
// 用户筛选 用户状态下拉框选项
var stateUl = document.getElementById('state_ul');
// 用户筛选 用户状态下拉框是否为展开状态判断
// true : 用户状态下拉框为展开状态
// false : 用户状态下拉框为收起状态
var stateFlag = true;

// 发送筛选用户角色隐藏域
var userRoleHidden = document.getElementById('userRoleHidden');
// 发送筛选用户状态隐藏域
var userStateHidden = document.getElementById('userStateHidden');

// 筛选用户下拉框点击
function selectClick() {
    // 筛选用户下拉框 用户角色点击
    selectRole.onclick = function(e) {
        // 如果用户状态下拉框为 收起状态
        // 让用户状态下拉框为展开状态
        if (!stateFlag) { stateFlag = !stateFlag }
        // 修改用户角色下拉框的图标
        selectState.children[1].children[0].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
        // 用户状态下拉框 变为隐藏状态
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
    // search = false;
    let searchNickname = userNameInput.value.trim();
    let searchEmail = userEmailInput.value.trim();
    let searchRole = userRoleHidden.value;
    let searchState = userStateHidden.value;
    $.ajax({
        type: 'get',
        url: '/admin/user',
        data: {
            username: searchNickname,
            useremail: searchEmail,
            userrole: searchRole,
            userstate: searchState,
            search: true
        },
        success: function(data) {
            let { thatPage, totalPage, users, count } = data;
            searchArry.push(data.searchArry);
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
            document.getElementsByClassName('total')[0].children[0].innerHTML = count;
            document.getElementById('pg').innerHTML = `${pageFor(thatPage, totalPage)}`;
            pages = totalPage;
            count = count;
            for (var j = 0; j < pageClick.length; j++) {
                if (parseInt(pageClick[j].children[0].innerHTML) == thatPage) {
                    pageReq = false;
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
var tipsInput = document.getElementsByClassName('tips_input')[0];

var tipsSelectArr = [];
var userTipsRole = document.getElementById('userTipsRole');
var userTipsState = document.getElementById('userTipsState');

// 用户编辑弹窗 角色 状态 下拉选项框
function tipsSelect() {
    // 获取角色 状态 下拉选项框
    for (var y = 0; y < document.getElementsByClassName('tips_select').length; y++) {
        // 给角色 状态 下拉框添加自定义属性 y
        document.getElementsByClassName('tips_select')[y].y = y;
        // 分别存储角色 状态 下拉框的状态
        // true : 展开状态
        // false : 未展开状态
        tipsSelectArr[y] = true;
        // 角色 状态 下拉框的点击事件
        document.getElementsByClassName('tips_select')[y].onclick = function(event) {
            // 防止事件冒泡
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
var userId = document.getElementById('userId');

function tipsEdit() {
    tipsSelect();
    tips.onclick = function() {
        tipsSelectArr[0] = true;
        tipsSelectArr[1] = true;
        document.getElementsByClassName('tips_select')[0].children[1].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
        document.getElementsByClassName('tips_select')[0].children[2].style.display = 'none';
        document.getElementsByClassName('tips_select')[1].children[1].setAttribute('class', 'iconfont icon-xiasanjiaoxing');
        document.getElementsByClassName('tips_select')[1].children[2].style.display = 'none';
    }
    for (var i = 0; i < userModify.length; i++) {
        userModify[i].index = i;
        userModify[i].onclick = function() {
            tipsInput.children[0].value = document.getElementById('tbody').children[this.index].children[2].innerHTML;
            userId.value = document.getElementById('tbody').children[this.index].children[1].innerHTML;
            for (var j = 0; j < 2; j++) {
                tipsSelects[j].children[0].innerHTML = document.getElementById('tbody').children[this.index].children[j + 4].innerHTML;
                tipsSelects[j].lastElementChild.value = tipsSelects[j].firstElementChild.innerHTML;
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

function selectContent() {
    for (var i = 0; i < selectChildren.length; i++) {
        for (var j = 0; j < selectChildren[i].children.length; j++) {
            selectChildren[i].children[j].onclick = function(event) {
                event.stopPropagation();
                this.parentNode.parentNode.parentNode.children[0].innerHTML = this.innerHTML;
                this.parentNode.parentNode.nextElementSibling.value = this.innerHTML;
                tipsSelectArr[0] = true;
                tipsSelectArr[1] = true;
                // console.log(tipsSelectArr);
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
var totalFlag = true;

function userReqTotal(obj) {
    var val = obj.options[obj.options.selectedIndex].value;
    totalFlag = !totalFlag;
    let searchNickname = userNameInput.value.trim();
    let searchEmail = userEmailInput.value.trim();
    let searchRole = userRoleHidden.value;
    let searchState = userStateHidden.value;
    if (totalFlag) {
        $.ajax({
            type: 'get',
            url: '/admin/user',
            data: {
                pagesize: val,
                username: searchNickname,
                useremail: searchEmail,
                userrole: searchRole,
                userstate: searchState,
                search: true
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
                for (var j = 0; j < pageClick.length; j++) {
                    if (parseInt(pageClick[j].children[0].innerHTML) == thatPage) {
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

// var id = document.getElementById('tbody').children

function userEdit() {
    var userRoleEidt = document.getElementById('userTipsRole').value;
    var userStateEidt = document.getElementById('userTipsState').value;
    var userId = document.getElementById('userId').value;
    if (userRoleEidt === '管理员') {
        userRoleEidt = 'admin';
    } else {
        userRoleEidt = 'ordinary';
    }
    if (userStateEidt === '启用') {
        userStateEidt = 0;
    } else {
        userStateEidt = 1;
    }
    $.ajax({
        type: 'get',
        url: '/admin/userEdit',
        data: {
            id: userId,
            role: userRoleEidt,
            state: userStateEidt
        },
        success: function(data) {
            console.log(data);
            let { count, thatPage, totalPage, users } = data;
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
            for (var j = 0; j < pageClick.length; j++) {
                if (parseInt(pageClick[j].children[0].innerHTML) == thatPage) {
                    pageReq = false;
                    reqPage();
                    pageClick[j].click();
                }
            }
            tipsBg.style.display = 'none';
            tips.style.display = 'none';
            alert('修改成功');
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function batchDelete() {
    for (var i = 0; i < document.getElementsByClassName('batchClick').length; i++) {
        if (document.getElementsByClassName('batchClick')) {}
    }
}