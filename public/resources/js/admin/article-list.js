// import { json } from "express";

function listTpl(data) {
    let tableTpl = ``;
    $.each(data, function (i, val) {
        tableTpl += `<tr>
        <td>${data[i].title}</td>
        <td class="table_img"><img src="${data[i].cover}"></img></td>
        <td>${data[i].author.username}</td>
        <td class="table_center">${tplCategory(data[i].category)}</td>
        <td class="table_center">${listDate(data[i].updated)}</td>
        <td class="table_center">${data[i].state === '0' ? '草稿' : '已发布'}</td>
        <td>
            <div class="table_operation">
                <a href="/view/admin/article.html?id=${data[i]._id}" class="article_modify"><i class="iconfont icon-xiugai"></i>编辑</a>
                <a class="article_delete"><i class="iconfont icon-shanchu"></i>删除</a>
            </div>
        </td>
    </tr>`
    });
    return tableTpl
}

function tplCategory(category) {
    let listCategory = ``;
    // console.log(category.length + '---');
    $.each(category, function (i, val) {
        // console.log(i + '+++');
        if (category.length - 1 === i) {
            listCategory += `${val}`
        } else {
            listCategory += `${val}、`
        }
        // listCategory += `${val}、`
    });
    return listCategory
}

function listDate(date) {
    // console.log(date);
    var dateArr = date.split('T');
    // console.log(dateArr);
    return dateArr[0];
}

$('#find_get').on('click', function () {
    // console.log($('.select_content').children('span').html());
    let conditionFind = [];
    $('.complex_find').each(function () {
        console.log($(this).children('span').html());
        conditionFind.push($(this).children('span').html());
    });
    console.log(conditionFind);
    let article_stateFind = $('#select_state').children('span').html();
    let stateFind = '';
    if (article_stateFind === '草稿') {
        stateFind = '0';
    } else if (article_stateFind === '已发布') {
        stateFind = '1';
    }
    // console.log(stateFind);
    $.ajax({
        type: 'post',
        url: '/admin/article-complexFind',
        traditional: true,
        data: {
            articleFind: JSON.stringify({
                stateFind: stateFind,
                conditionFind: conditionFind
            })
        },
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    });
});


$.ajax({
    type: 'post',
    url: '/admin/article',
    data: {
        findFlag: 'true'
    },
    success: function (data) {
        console.log(data);
        // console.log(listTpl(data.articleData));
        $('#tbody').html(listTpl(data.articleData));
    },
    error: function (err) {
        console.log(err);
    }
});

function FindUlTpl() {
    return `
    <li>
        <a href="javascript:;">HTML</a>
    </li>
    `;
}

var articleFindArr = [true, true, true, true];
var findArr = ['C++', 'Java', 'Node'];
var findArrList = [];
var newFindArr = [];

$('.article_find').on('click', function () {
    articleFindArr[$(this).index()] = !articleFindArr[$(this).index()];
    if ($(this).attr('data-find') === '') {
        newFindArr = [];
        findArr.forEach(function (qitem, index, array) {
            if (findArrList.every(function (item, qindex, array) {
                return qitem !== item;
            })) {
                newFindArr.push(qitem);
            }
        });
        let findUl = ``;
        if (newFindArr.length !== 0) {
            for (let i = 0; i < newFindArr.length; i++) {
                findUl += `
                <li>
                    <a href="javascript:;">${newFindArr[i]}</a>
                </li>
                `;
            }
        } else {
            // console.log(3222);
            // console.log(findArr);
            for (let i = 0; i < findArr.length; i++) {
                findUl += `
                <li>
                    <a href="javascript:;">${findArr[i]}</a>
                </li>
                `;
            }
        }
        $('.select_sort >.article_select >ul').html(findUl);
        findUlContent();
    } else {
        let findUl = ``;
        newFindArr = [];
        $('.select_sort >.article_select >ul').html(findUl);
    }
    if (articleFindArr[$(this).index()]) {
        $(this).find('ul').css('display', 'none');
        $(this).find('i').attr('class', 'iconfont icon-xiasanjiaoxing');
    } else {
        $(this).find('ul').css('display', 'block');
        $(this).find('i').attr('class', 'iconfont icon-shangsanjiaoxing');
    }
});

function findUlContent() {
    // console.log(newFindArr);
    $('.article_select >ul >li').on('click', function () {
        // 把查找的分类替换为当前点击分类
        $(this).parent().prev().children('span').text($(this).children('a').text());
        for (let i = 0; i < findArr.length; i++) {
            if (findArr[i] === $(this).children('a').text()) {
                // 如果findArr数组中的第i项 === 当前点击的搜索选择项

                // 把当前点击的分类对应数组索引保存到data-find属性中
                $(this).parent().parent().parent().attr('data-find', i);
                newFindArr = [];
            }
        }
        if (findArrList.length === findArr.length) {
            findArrList.shift($(this));
        }
        findArrList.push(findArr[$(this).parent().parent().parent().attr('data-find')]);
        // console.log(findArrList);
        // console.log(findArrList);
    });
}
findUlContent();

var pageSelectFlag = true;

$('.page_select').on('click', function () {
    if (pageSelectFlag) {
        $('.page_select >ul').css('display', 'block');
        $('.page_show >i').attr('class', 'iconfont icon-shang');
    } else {
        $('.page_select >ul').css('display', 'none');
        $('.page_show >i').attr('class', 'iconfont icon-xia');
    }
    pageSelectFlag = !pageSelectFlag;
});

$('.page_select >ul >li').on('click', function () {
    $(this).parent().prev().children('span').text($(this).children('a').text());
});

// function name(params) {

// }