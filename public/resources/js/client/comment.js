import { cookieObj } from './common.js';
console.log(cookieObj);

// 一级评论发表输入框
var commentOne = document.getElementById('commentOne');
// 一级评论发表按钮
var makeComment = document.getElementById('makeComment');

// var commentTpl = 1;
var commentTpls = ``;
var commentTwo = ``;
var commentThree = ``;

function commentTplOne(data, length, commentTpls, forumTwoData) {
    // console.log(forumTwoData);
    // console.log(data, length, commentTpls);
    // console.log(length);
    // console.log(commentTpls);
    let two = 0;
    commentTpls += `<li>
                            <!-- 一级评论 -->
                            <!-- 留言内容 -->
                            <div class="opinion_content opinion_common">
                                <!-- 用户头像 -->
                                <a href="#">
                                    <img src="../../resources/images/1.jpg" alt="你的头">
                                </a>
                                <!-- 右侧留言信息,回复面板 -->
                                <div class="comment">
                                    <!-- 回复信息盒子 -->
                                    <div class="comment_box">
                                        <!-- 用户昵称及标签 -->
                                        <span class="author_name">
                                            <span><a href="#">${data[length].reviewer.username}</a></span>
                                        <a href="#"><img src="../../resources/images/富婆标签.png" alt=""></a>
                                        <!-- 冒号 -->
                                        <span class="colon">:</span>
                                        <!-- 用户留言 -->
                                        <span class="new_comment">${data[length].comment}</span>
                                        <!-- 对此留言操作 -->
                                        <div class="comment_operate">
                                            <span class="date">0秒前</span>
                                            <span class="reply_button">
                                                <a class="replyComment" data-oneCommentId="${data[length]._id}" data-commentId="${data[length]._id}" data-userId="${data[length].reviewer._id}" data-username="${data[length].reviewer.username}" data-items="1">回复</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ${commentTplTwo(forumTwoData[length].items, data[length]._id)}
                        </li>`;
    length++;
    // ${length === data.length - 1 ? commentTplTwo(forumTwoData, two) : ''}
    if (length < data.length) { return commentTplOne(data, length, commentTpls, forumTwoData) }
    return commentTpls;
}

function commentTplTwo(data, oneCommentId) {
    console.log(data);
    if (data.length === 0) { return '' }
    commentTwo = ``;
    for (let i = 0; i < data.length; i++) {
        commentTwo += `<!-- 二级评论 -->
        <!-- 评论回复 -->
        <div class="reply two">
            <div class="two_reply opinion_common">
                <!-- 回复人头像 -->
                <a href="#">
                    <img src="../../resources/images/1.jpg" alt="你的头">
                </a>
                <!-- 回复人评论右侧留言信息,回复面板 -->
                <div class="comment">
                    <div class="comment_box">
                        <!-- 用户昵称及标签 -->
                        <span class="author_name">
                        <span><a href="#">${data[i].from.username}</a></span>
                        <a href="#"><img src="../../resources/images/富婆标签.png" alt=""></a>
                        </span>
                        ${data[i].level === '2' ? replyTwo(data[i].to) : `<!-- 冒号 --><span class="colon">:</span>`}
                        <!-- 回复人具体评论内容 -->
                        <span class="new_comment">${data[i].comment}</span>
                        <!-- 对回复人进行操作 -->
                        <div class="comment_operate">
                            <span class="date">0秒前</span>
                            <span class="reply_button">
                                <a class="replyComment" data-oneCommentId="${oneCommentId}" data-commentId="${data[i]._id}" data-userId="${data[i].from._id}" data-username="${data[i].from.username}" data-items="2">回复</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
    return commentTwo;
}

function replyTwo(data) {
    return `
    <!-- 冒号 -->
    <span class="colon">回复</span>
    <!-- 回复人昵称及标签 -->
    <span class="author_name">
    <span><a href="#">${data.username}</a></span>
    <a href="#"><img src="../../resources/images/富婆标签.png" alt=""></a>
    <!-- 冒号 -->
    <span class="colon">:</span>
    </span>`;
}

function reqComment(params) {
    $.ajax({
        type: 'get',
        url: '/client/comment',
        data: {
            query: true,
            create: false
        },
        success: function(data) {
            console.log(data.forumData);
            console.log(data.forumTwoData);
            let length = 0;
            // commentTplOne(data.forumData, length, commentTpls);
            // commentTplOne(data.forumData, length, commentTpls);
            // console.log(commentTplOne(data.forumData, length, commentTpls));
            document.getElementById('comment_comtent').innerHTML = commentTplOne(data.forumData, length, commentTpls, data.forumTwoData);
            reply();
        },
        error: function(err) {
            console.log(err);
        }
    });
}

reqComment();

// 提交一级评论
makeComment.onclick = function() {
    if (cookieObj.id && cookieObj.id !== '') {
        // console.log(commentOne.value.trim());
        if (commentOne.value.trim().length !== 0) {
            // console.log(cookieObj.id);
            $.ajax({
                type: 'get',
                url: '/client/comment',
                data: {
                    query: false,
                    create: true,
                    userId: cookieObj.id,
                    comment: commentOne.value
                },
                success: function(data) {
                    console.log(data);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        } else {
            alert('评论不能为空');
        }
    }
}

// 评论回复
function reply() {
    var replyComment = document.getElementsByClassName('replyComment');
    for (var i = 0; i < replyComment.length; i++) {
        replyComment[i].onclick = function() {
            $('.assembly').remove();
            console.log($(this).parent().parent().parent().parent().parent().parent().parent());
            $(this).parent().parent().parent().parent().parent().parent().parent().append(replyBox(this.getAttribute('data-username')));
            replyAjax(this.getAttribute('data-oneCommentId'), this.getAttribute('data-commentId'), this.getAttribute('data-userId'), this.getAttribute('data-items'));
        }
    }
}

function replyBox(username) {
    return `<!-- 回复评论模块 -->
    <div class="assembly">
        <!-- 你的狗头 -->
        <div class="user_face"><img src="../../resources/images/1.jpg" alt=""></div>
        <!-- 评论组件 -->
        <div class="comments_assembly">
            <!-- 输入框 -->
            <textarea name="" id="commentReply" cols="30" rows="10" placeholder="回复 @${username}：" autofocus="autofocus"></textarea>
            <!-- 提交按钮 -->
            <span>
                <button id="publish">发表评论</button>
            </span>
        </div>
    </div>`
}

function replyAjax(oneCommentId, commentId, userId, items) {
    $('#publish').click(function() {
        console.log(userId);
        console.log(items);
        if ($('#commentReply').val().trim().length == 0) { return alert('回复内容不能为空') }
        $.ajax({
            type: 'get',
            url: '/client/comment',
            data: {
                query: false,
                create: false,
                item: items,
                oneCommentId: oneCommentId,
                parentId: commentId,
                to: userId,
                fromTwo: cookieObj.id,
                comment: $('#commentReply').val()
            },
            success: function(data) {
                reqComment();
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
}