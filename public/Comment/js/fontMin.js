// (function() {
// var body = document.getElementsByTagName("body");
// 定义事件侦听器函数
function displayWindowSize() {
    // 获取窗口的宽度和高度，不包括滚动条
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    console.log(w, h);
    return w;
}
// 将事件侦听器函数附加到窗口的resize事件
window.addEventListener("resize", displayWindowSize);
// 第一次调用该函数
displayWindowSize();
$('body').css("-webkit-transform", `scale(${displayWindowSize() / 1920})`);
// body.setAttribute("-webkit-transform", `scale(${displayWindowSize() / 1920})`);
// })();