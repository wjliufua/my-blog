// 注册登录切换
var switchSpan = $('.switch span');
// 登录注册表单获取
var loginRegister = $('.comtent_from');
// console.log($('.comtent_from'));
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
// 确认密码警告框
var pwdWarning = document.getElementById('pwd_warning');
// 输入密码警告框
var pwdTips = document.getElementById('pwd_tips');
// 确认密码警告框内容显示框
var warningContent1 = document.getElementById('warningContent1');
// 输入密码警告框内容显示框
var warningContent2 = document.getElementById('warningContent2');

// 注册确认密码框焦点离开监听事件
confirmPwd.addEventListener('blur', passwordVerification);

// 注册密码框焦点获取监听事件
registrationPwd.onfocus = function() {
    inputTips(1, `密码由数字和字母组成</br>长度为8-20位`);
}

// 注册密码框焦点离开监听事件
registrationPwd.onblur = function() {
    inputTips(0, '');
    pwdLength();
}

// 确认密码警告框弹出
function tips() {
    pwdWarning.style.display = 'block';
    warningContent1.innerHTML = `
        两次输入的密码不一样啊，叼毛
        </br>
        两次输入的密码不一样啊，叼毛
    `;
    var boxLocation = confirmPwd.offsetTop - pwdWarning.clientHeight / 2 + confirmPwd.clientHeight / 2;
    pwdWarning.style.top = boxLocation + 'px';
}

// 密码警告框弹出
function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}

// 密码提示框弹出
function inputTips(operation, message) {
    if (operation == 0) {
        pwdTips.style.display = 'none';
    } else {
        pwdTips.style.display = 'block';
        warningContent2.innerHTML = `${message}`;
        var boxLocation = registrationPwd.offsetTop - pwdTips.clientHeight / 2 + registrationPwd.clientHeight / 2;
        pwdTips.style.top = boxLocation + 'px';
    }
}
var pwdFlag = false;
// 判断密码输入是否长度是否符合
function pwdLength() {
    if (registrationPwd.value.trim().length == 0) {
        return false;
    } else if (registrationPwd.value.trim().length < 8 || registrationPwd.value.trim().length > 20) {
        inputTips(1, `密码长度不对,是不是要我淦你啊`);
    } else {
        pwdFlag = !pwdFlag;
    }
}

// 密码验证(注册输入两次密码是否一致)
function passwordVerification() {
    if (confirmPwd.value.trim() !== '' && registrationPwd.value.trim() !== confirmPwd.value.trim()) {
        tips();
    } else if (registrationPwd.value.trim() === confirmPwd.value.trim()) {
        pwdWarning.style.display = 'none';
    } else {
        pwdWarning.style.display = 'none';
    }
}


var registeredEmail = document.getElementById('registered_email');

// function emailRegex() {
//     var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//     if (!email.test(registeredEmail) || registeredEmail.value.trim() == '') {
//         alert('来点阳间的邮箱地址');
//         return false;
//     }
// }


// 邮箱验证按钮
var checking = document.getElementById('checking');
// 邮箱验证按钮点击监听事件
checking.addEventListener('click', setTimeSend);
// 再次获取邮件倒计时
var countdown = 5;

// 邮箱验证按钮发送邮件验证
function setTimeSend() {
    if (countdown == 5) {
        for (let i = 1; i < (registerFrom.children.length - 4); i++) {
            if (registerFrom.children[i].value.trim() === '') {
                return alert('请输入完整的注册信息')
            }
            if (i > 1 && i < 4) {
                registerValue += registerFrom.children[i].getAttribute('name') + '=' + registerFrom.children[i].value + '&';
            }
        }
        var date = Date.parse(new Date());
        nickName.value = nickName.value + registerInput[2].value;
        registerValue = registerValue + 'nickName=博客用户' + registeredEmail.value + '&time=' + +date;
        console.log(registerValue);
        axios.post("/email", {
            registerValue
        }).then((response) => {
            let res = response.data;
            alert(res.msg);
        });
        registerValue = '';
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
// 获取注册表单输入框
var registerInput = registerFrom.children;
// 获取隐藏域用户昵称
// 用户注册信息拼接
var registerValue = '';
// 注册按钮防抖
function debounce() {
    register();
}

// 注册
// 获取用户输入值
function register() {
    if (!pwdFlag) {
        return alert('我丢')
    } else {
        registerValue = '';
        for (let i = 1; i < (registerFrom.children.length - 4); i++) {
            if (registerFrom.children[i].value.trim() === '') {
                return alert('请输入完整的注册信息')
            }
            if (i > 1 && i < 4) {
                registerValue += registerFrom.children[i].getAttribute('name') + '=' + registerFrom.children[i].value + '&';
            }
        }
        var date = Date.parse(new Date());
        nickName.value = nickName.value + registerInput[2].value;
        registerValue = registerValue + 'nickName=博客用户' + registeredEmail.value + '&time=' + date + '&code=' + document.getElementsByClassName('verification_input')[0].value.trim();
        console.log(registerValue);
        if (registerFrom.children[5].children[0].value.trim() === '') {
            return alert('请输入邮箱验证码')
        }
        var code = document.getElementsByClassName('verification_input')[0].value;
        $.ajax({
            type: 'post',
            url: '/register',
            data: {
                registerValue
            },
            success: function(data) {
                registerValue = '';
                let { msg } = data;
                alert(msg);
                if (data.state) {
                    location.href = '/view/login.html';
                }
            },
            error: function(err) {
                registerValue = '';
                console.log(err);
            }
        });
    }
}

var loginEmail = document.getElementById('login_email');
var loginPwd = document.getElementById('login_pwd');

// 登录
function login() {
    if (loginEmail.value.trim() == '' || loginPwd.value.trim() == '') return alert('好好输入信息,爱你');
    $.ajax({
        type: 'post',
        url: '/login',
        data: {
            loginEmail: loginEmail.value,
            loginPwd: loginPwd.value
        },
        success: function(data) {
            if (data.msg) {
                console.log(msg);
                alert(msg);
            }
            if (data.href) {
                function setCookie(name, value) {
                    if (value) {
                        var days = 1; //定义一天
                        var exp = new Date();
                        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
                        console.log(exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000));
                        // 写入Cookie, toGMTString将时间转换成字符串
                        document.cookie = name + "=" + value + ";path=" + "/" + ";expires=" + exp.toGMTString();
                    }
                };
                setCookie('username', data.username);
                setCookie('id', data.id);
                // alert(document.cookie);
                location.href = data.href;
            }
        },
        error: function(err) {
            registerValue = '';
            console.log(err);
        }
    });
}