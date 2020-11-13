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
// confirmPwd.addEventListener('focus', passwordVerification);
confirmPwd.addEventListener('input', debounce(passwordVerification, 1000));
confirmPwd.addEventListener('focus', tips);

function tips() {
    pwdWarning.style.display = 'block';
    warningContent.innerHTML = '两次输入的密码不一样啊，叼毛';
    var boxLocation = confirmPwd.offsetTop - pwdWarning.clientHeigh;
    pwdWarning.style.top = boxLocation + 'px';
}

function debounce(fn, wait) {
    var timeout = null;
    return function() {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, wait);
    }
}
// 密码验证(注册输入两次密码是否一致)
function passwordVerification() {
    if (confirmPwd.value.trim() === '') {
        console.log('确认密码啊，叼毛');
    } else if (registrationPwd.value.trim() !== confirmPwd.value.trim()) {
        console.log('两次输入的密码不一样啊，叼毛');
    } else {
        console.log('艸');
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
    console.log(document.getElementById('registered_email').value);
    if (countdown == 5) {
        axios.post("/email/sendEmail", {
            email: document.getElementById('registered_email').value
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