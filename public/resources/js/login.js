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

// 注册密码框
var registrationPwd = document.getElementById('registration_pwd');
// 注册确认密码框
var confirmPwd = document.getElementById('confirm_pwd');
var pwdWarning = document.getElementsByClassName('pwd_warning')[0];
var warningContent = document.getElementsByClassName('warning_content')[0];

// confirmPwd.addEventListener('input', debounce(passwordVerification, 500));

// confirmPwd.addEventListener('blur', function() { passwordVerification() }, false);
// confirmPwd.addEventListener('focus', function() { inputTips() }, false);
// registrationPwd.addEventListener('blur', function() { passwordVerification() }, false);
// registrationPwd.addEventListener('focus', function() { inputTips(0) }, false);

confirmPwd.addEventListener('blur', passwordVerification());
confirmPwd.addEventListener('focus', inputTips());
registrationPwd.addEventListener('blur', passwordVerification());
registrationPwd.addEventListener('focus', inputTips(0));

// confirmPwd.onfocus = function() {
//     inputTips();
// }
// confirmPwd.onblur = function() {
//     passwordVerification();
// }
// registrationPwd.onfocus = function() {
//     inputTips();
// }
// registrationPwd.onblur = function() {
//     passwordVerification();
// }

function tips() {
    pwdWarning.style.display = 'block';
    warningContent.innerHTML = `
    两次输入的密码不一样啊，叼毛
    </br>
    两次输入的密码不一样啊，叼毛
    </br>
    两次输入的密码不一样啊，叼毛
    </br>
    两次输入的密码不一样啊，叼毛
    </br>
    两次输入的密码不一样啊，叼毛
    `;
    // console.log(pwdWarning.clientHeight);
    var boxLocation = confirmPwd.offsetTop - pwdWarning.clientHeight / 2 + confirmPwd.clientHeight / 2;
    pwdWarning.style.top = boxLocation + 'px';
}

function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}

// 输入前提示
function inputTips(data) {
    console.log('进来了');
    console.log(data);
}

// 密码验证(注册输入两次密码是否一致)
function passwordVerification(s) {
    console.log(this);
    // if (s = 0) {
    // inputTips();
    // } else {
    if (confirmPwd.value.trim() !== '' && registrationPwd.value.trim() !== confirmPwd.value.trim()) {
        tips();
    } else if (registrationPwd.value.trim() === confirmPwd.value.trim()) {
        pwdWarning.style.display = 'none';
    } else {
        pwdWarning.style.display = 'none';
    }
    // }
    // if (confirmPwd.value.trim() !== '' && registrationPwd.value.trim() !== confirmPwd.value.trim()) {
    //     tips();
    // } else if (registrationPwd.value.trim() === confirmPwd.value.trim()) {
    //     pwdWarning.style.display = 'none';
    // } else {
    //     pwdWarning.style.display = 'none';
    // }
}


var registeredEmail = document.getElementById('registered_email');
// registeredEmail.addEventListener('blur', emailRegex);

function emailRegex() {
    var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!email.test(registeredEmail) || registeredEmail.value.trim() == '') {
        alert('来点阳间的邮箱地址');
        return false;
    }
}


// 邮箱验证按钮
var checking = document.getElementById('checking');

checking.addEventListener('click', setTimeSend);
var countdown = 5;

function setTimeSend() {
    // if (countdown == 5) {
    //     $.ajax({
    //         type: 'post',
    //         url: '/email/sendEmail',
    //         data: {
    //             email: '1459200389@qq.com'
    //         },
    //         success: function(data) {
    //             console.log(data);
    //         },
    //         error: function() {
    //             console.log('你没了，弟弟');
    //         }
    //     });
    // }
    console.log(registeredEmail.value);
    if (countdown == 5) {
        axios.post("/email/sendEmail", {
            email: registeredEmail.value
        }).then((response) => {
            let res = response.data;
            alert(res.msg);
        });
    }
    if (countdown == 0) {
        checking.removeAttribute('disabled');
        checking.innerHTML = "点击获取验证码";
        countdown = 5;
        return;
    } else {
        checking.setAttribute('disabled', 'true');
        checking.innerHTML = "(" + countdown + "s)后重新发送";
        countdown--;
    }
    setTimeout(function() { setTimeSend() }, 1000);
}

// 获取注册表单
var registerFrom = document.getElementById('registerFrom');
// 获取注册按钮
var submitRegister = document.getElementById('submitRegister');
var registerInput = registerFrom.children;
// var email = registerInput[1].value;
// var pwd = registerInput[2].value;
var nickName = document.getElementById('nickName');
var registerValue = '';
var nickNames = ``;
// console.log(submitRegister);
// 获取用户输入值
function register() {
    for (let i = 1; i < (registerFrom.children.length - 3); i++) {
        if (registerFrom.children[i].value.trim() === '') {
            return alert('请输入完整的注册信息')
        }
        // nickNames = nickName.value + registerInput[1].value;
        // nickName.value += nickName.value + registerInput[1].value
        // console.log(nickName.value);
        if (i > 1 && i < 4) {
            registerValue += registerFrom.children[i].getAttribute('name') + '=' + registerFrom.children[i].value + '&';
            // console.log(registerValue.length);
        }
    }
    // console.log(nickNames);
    // registerValue = registerValue.slice(1, registerValue.length - 1);
    // console.log(registerValue);
    nickName.value = nickName.value + registerInput[2].value;
    registerValue = registerValue + 'nickName=' + nickName.value;
    console.log(registerValue);
    // console.log(nickName.value);
    if (registerFrom.children[5].children[0].value.trim() === '') {
        return alert('请输入邮箱验证码')
    }
    $.ajax({
        type: 'post',
        url: '/register',
        data: {
            registerValue
        },
        success: function(data) {
            // location.href = '/view/login.html'
            let { message, aaa } = data;
            console.log(message);
            console.log(aaa);
        },
        error: function(err) {
            console.log(err);
        }
    })
}
// var random = String(Math.random());
// console.log(random.slice(2, 7));