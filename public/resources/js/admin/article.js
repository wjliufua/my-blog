import { cookieObj } from '../common/common.js';
console.log(cookieObj);


const E = window.wangEditor;
const editor = new E("#div1");
editor.config.height = 500;
editor.create();

var selectFlag = false;

$('.article_select').on('click', function () {
    selectFlag = !selectFlag;
    // console.log(selectFlag);
    if (selectFlag) {
        $('#article_select_choice').css('display', 'block');
    } else {
        $('#article_select_choice').css('display', 'none');
    }
});

$('#article_select_choice>li').on('click', function (e) {
    selectFlag = !selectFlag;
    $('#article_select_choice').css('display', 'none');
    $('#state_text').text($(this).text());
});

// class UploadAdapter {
//     constructor(loader) {
//         this.loader = loader;
//     }
//     upload() {
//         return new Promise((resolve, reject) => {
//             const data = new FormData();
//             data.append('upload', this.loader.file);
//             data.append('allowSize', 10); //允许图片上传的大小/兆
//             $.ajax({
//                 url: 'loadImage',
//                 type: 'POST',
//                 data: data,
//                 dataType: 'json',
//                 processData: false,
//                 contentType: false,
//                 success: function(data) {
//                     if (data.res) {
//                         resolve({
//                             default: data.url
//                         });
//                     } else {
//                         reject(data.msg);
//                     }

//                 }
//             });

//         });
//     }
//     abort() {}
// }

// DecoupledEditor
//     .create(document.querySelector('#b'), {
//         language: "zh-cn"
//     })
//     .then(editor => {
//         const toolbarContainer = document.querySelector('#a');
//         toolbarContainer.appendChild(editor.ui.view.toolbar.element);

//         // 这个地方加载了适配器
//         editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//             return new UploadAdapter(loader);
//         };
//     })
//     .catch(error => {
//         console.error(error);
//     });
var url = window.location.search;
var urlArr = url.split("=");
// console.log(urlArr);
var article_id = urlArr[1];
console.log(article_id);
if (article_id) {
    $.ajax({
        type: 'get',
        url: '/admin/article',
        data: {
            article_id: article_id
        },
        success: function (response) {
            // console.log(response);
            let data = response.article_edit;
            console.log(data);
            $('#article_title').val(data.title);
            editor.txt.append(data.content);
            // $('#article_coverBox').html(`<input type="file" value="${data.cover}"/>`);
            $('#cover_hidden').val(data.cover);
            $('#cover_preview').attr('src', data.cover);
            // console.log($('.category_choice').children('span'));
            $('.category_choice').children('span').each(function () {
                let that = $(this);
                // console.log(that);
                $.each(data.category, function (index, value) {
                    // console.log(2333);
                    // console.log(that.html());
                    // console.log(value);
                    if (that.html() === value) {
                        // console.log(3222);
                        that.prev().prop('checked', true);
                    }
                });
            });
            // let article_state = data.state === '0' ? '草稿' : '发布';
            $('#state_text').html(data.state === '0' ? '草稿' : '发布');
            $('#article_submit').html('修改');
        }
    });
}


$('#article_cover').on('change', function () {
    var file = this.files[0];
    console.log(file);
    var formData = new FormData();
    formData.append('cover', file);
    // formData.cover = file;
    // console.log(formData);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response);
            $('#cover_hidden').val(response[0].cover);
            $('#cover_preview').attr('src', `${response[0].cover}`);
        }
    });
});

function getCategory() {
    var check_value = []; //定义一个数组
    $('input[class="article_check"]:checked').each(function () { //遍历每一个名字为option的复选框
        check_value.push($(this).next().text());
    });
    return check_value
}

// 文章提交按钮点击事件
$('#article_submit').on('click', function () {
    console.log(getCategory());
    if (getCategory().length === 0) {
        alert('请选择分类');
    }
    var getCategoryResult = getCategory();
    var state = $('#state_text').text() === '草稿' ? '0' : '1';
    console.log(state);
    // var articleData = {
    //     author: cookieObj.id,
    //     articleTitle: $('#article_title').val(),
    //     articleContent: editor.txt.html(),
    //     cover: $('#cover_hidden').val(),
    //     category: getCategory(),
    //     state: state
    // }
    if (article_id) {
        $.ajax({
            type: 'post',
            url: '/admin/article-edit',
            data: {
                articleData: JSON.stringify({
                    article_id: article_id,
                    author: cookieObj.id,
                    articleTitle: $('#article_title').val(),
                    articleContent: editor.txt.html(),
                    cover: $('#cover_hidden').val(),
                    category: getCategory(),
                    state: state
                })
            },
            success: function (response) {
                alert('文章修改成功');
                window.location.href = response.href;
            }
        });
    } else {
        $.ajax({
            type: 'post',
            url: '/admin/article',
            data: {
                articleData: JSON.stringify({
                    author: cookieObj.id,
                    articleTitle: $('#article_title').val(),
                    articleContent: editor.txt.html(),
                    cover: $('#cover_hidden').val(),
                    category: getCategory(),
                    state: state
                })
            },
            success: function (response) {
                console.log(response);
            }
        });
    }
    // $.ajax({
    //     type: 'post',
    //     url: '/admin/article',
    //     data: {
    //         articleData: JSON.stringify({
    //             author: cookieObj.id,
    //             articleTitle: $('#article_title').val(),
    //             articleContent: editor.txt.html(),
    //             cover: $('#cover_hidden').val(),
    //             category: getCategory(),
    //             state: state
    //         })
    //     },
    //     success: function (response) {
    //         console.log(response);
    //     }
    // });
});