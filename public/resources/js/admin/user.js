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
var pageClick = document.getElementById('pg').children;
var pageEllipsis = document.getElementById('pageEllipsis');
var userPageL = document.getElementById('userPageL');
var userPageR = document.getElementById('userPageR');

for (var i = 1; i < pageClick.length - 1; i++) {
    if (pageEllipsis == pageClick[i]) { continue }
    pageClick[i].index = i;
    pageClick[i].onclick = function() {
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
        if (this.index === 1) {
            if (userPageR.classList.remove('aDisable')) {
                userPageR.classList.remove('aDisable');
            }
            userPageL.classList.add('aDisable');
        } else if (this.index == 5) {
            if (userPageL.classList.remove('aDisable')) {
                userPageL.classList.remove('aDisable');
            }
            userPageR.classList.add('aDisable');
        } else {
            if (userPageL.classList.remove('aDisable') && userPageR.classList.remove('aDisable')) {
                userPageL.classList.remove('aDisable');
                userPageR.classList.remove('aDisable');
            }
        }
        for (var j = 1; j < pageClick.length - 1; j++) {
            if (pageClick[j].children[0].classList.remove('pageClick')) {
                pageClick[j].children[0].classList.remove('pageClick');
            }
            pageClick[j].children[0].classList.add('rPageClick');
        }
        this.children[0].classList.remove('rPageClick');
        this.children[0].classList.add('pageClick');
    }
}
pageClick[1].click();
userPageL.onclick = function() {
    if (userPageL.classList.contains('aDisable')) {
        return;
    } else {
        for (var i = 1; i < pageClick.length - 1; i++) {
            var pageIndex = pageClick[i].children[0] == document.getElementsByClassName('pageClick')[0] ? i : 1;
            if (pageClick[i].children[0] == document.getElementsByClassName('pageClick')[0]) {
                pageClick[pageIndex - 1].click();
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
    console.log(roleUl.children);
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