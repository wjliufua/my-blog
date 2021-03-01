var userState = document.getElementById('userState');

// window.onload = function() {}
if (document.cookie.trim() !== '') {
    var cookieArrOne = document.cookie.split(/[;\s=]/);
    // console.log(cookieArrOne);
    // console.log(cookieArrOne[2].length);
    var cookieObj = {}
    for (var i = 0; i < cookieArrOne.length; i++) {
        if (cookieArrOne[i].length == 0) {
            cookieArrOne.splice(i, 1);
        }
    }
    // console.log(cookieArrOne);
    for (var j = 0; j < cookieArrOne.length; j++) {
        if (j % 2 == 0) {
            cookieObj['' + cookieArrOne[j] + ''] = cookieArrOne[j + 1];
        }
    }
    // console.log(cookieObj);
    userState.innerHTML = cookieObj.username;
    userState.setAttribute('href', '/view/my.html');
    userState.setAttribute('title', '你看看你那个熊样');
}

// console.log(cookieObj);

export { cookieObj };