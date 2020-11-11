// 注册登录切换
var switchSpan = $('.switch span');
// 登录注册表单获取
var loginRegister = $('.login_register>div');
// 获取输入框
var lrInput = $('.login_register>div input');
// console.log(lrInput);

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
// 邮箱验证按钮
var checking = document.getElementById('checking');

checking.addEventListener('click', setTime);
// console.log(checking);
var countdown = 5;

function setTime() {
    if (countdown == 0) {
        checking.removeAttribute('disabled');
        checking.innerHTML = "点击获取验证码";
        countdown = 60;
        return;
    } else {
        checking.setAttribute('disabled', 'true');
        checking.innerHTML = "(" + countdown + "s)后重新发送";
        countdown--;
    }
    setTimeout(function() { setTime() }, 1000);
}