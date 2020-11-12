// 注册登录切换
var switchSpan = $('.switch span');
// 登录注册表单获取
var loginRegister = $('.login_register>div');
// 获取输入框
var lrInput = $('.login_register>div input');

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

checking.addEventListener('click', setTimeSend);
var countdown = 5;

function setTimeSend() {
    $.ajax({
        type: 'get'
    });
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

// 获取注册表单
var registerFrom = document.getElementById('registerFrom');
// 获取注册按钮
var submitRegister = document.getElementById('submitRegister');
var registerInput = registerFrom.children;
var email = registerInput[1].value;
var pwd = registerInput[2].value;
// console.log(submitRegister);
// 获取用户输入值
function register() {
    for (let i = 1; i < (registerFrom.children.length - 2); i++) {
        if (registerFrom.children[i].value.trim() === '') {
            return alert('请输入完整的注册信息')
        }
    }
    if (registerFrom.children[4].children[0].value.trim() === '') {
        return alert('请输入邮箱验证码')
    }
    $.ajax({
        type: 'post',
        url: '/register',
        data: {
            email: email,
            pwd: pwd
        },
        success: function() {
            location.href = 'index.html'
        },
        error: function(err) {
            console.log(err);
        }
    })
}
// var random = String(Math.random());
// console.log(random.slice(2, 7));