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

console.log(pageClick);
for (var i = 1; i < pageClick.length - 1; i++) {
    if (pageEllipsis == pageClick[i]) { continue }
    // setTimeout(pageClick[1].click(),0);
    pageClick[1].click();
    pageClick[i].onclick = function() {
        if (i == 1) {
            // userPageL.setAttribute('class', 'aDisable');
            userPageL.classList.add('aDisable');
        } else if (i == pageClick.length - 1) {
            // userPageR.setAttribute('class', 'aDisable');
            userPageR.classList.add('aDisable');
        } else {
            // userPageL.removeAttribute('class');
            // userPageR.removeAttribute('class');
            userPageL.classList.remove('aDisable');
            userPageR.classList.remove('aDisable');
        }
        for (var j = 1; j < pageClick.length - 1; j++) {
            pageClick[j].style.backgroundColor = '#fff';
            pageClick[j].children[0].style.color = '#313131';
            // console.log(pageClick[j].children[0]);
        }
        this.style.backgroundColor = '#00CFD9';
        this.children[0].style.color = '#fff';
    }
}