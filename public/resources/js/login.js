// 注册登录切换
var switchSpan = $('.switch span');
// 登录注册表单获取
var loginRegister = $('.login_register>div');
// 获取输入框
var lrInput = $('.login_register>div input');
console.log(lrInput);

// 点击切换登录注册表单功能
function lrChange() {
    for (let i = 0; i < switchSpan.length; i++) {
        switchSpan[i].onclick = function() {
            for (let j = 0; j < switchSpan.length; j++) {
                switchSpan[j].classList.remove("click");
                loginRegister[j].style.display = 'none';
            }
            switchSpan[i].classList.add("click");
            loginRegister[i].style.display = 'block';
            loginRegister[i].children[1].focus();
        }
    }
}
lrChange();