
// 登录-注册切换
$("#goto-register").on("click", function () {
    $("#login").hide();
    $("#register").show();
});
$("#goto-login").on("click", function () {
    $("#login").show();
    $("#register").hide();
});





// -----------------------------------注册

// 需求：
//      1.用户名和密码，重复密码不能为空
//      2.密码长度6-12位，不能为空格
//      3.密码和重复密码必须一致
var form = layui.form;
form.verify({
    // 键：验证规则；值：验证方法，可以使用数组/函数
    // 数组的两个值分别代表：[正则表达式，匹配不符合时候的提示文字]
    changdu: [/^\S{6,12}$/, "长度必须为6-12位,不能输入空格"],
    // 使用函数：
    same: function (val) {
        // 获取某个地方的值
        // var pwd = $("#pwd").val();

        // val:要验证的值
        if (pwd !== val) {
            return "您输入的两次密码不一致"
        }
    }
})
// 获取form表单元素才可以用方法
$("#register form").on("submit", function (e) {
    // 阻止默认行为
    e.preventDefault();
    // 2.收集数据
    var data = $(this).serialize();
    // 3.接口,发送请求
    // 发送数据
    $.ajax({
        type: "POST",
        url: "/api/reguser",
        data: data,
        success: function (res) {
            // 弹窗：msg简单弹窗,会自动消失；
            layer.msg(res.message);

            // 业务设计,因为输入完账号密码，需要跳转到登录页面进行登录，所以进行优化
            if (res.status == 0) {
                $("#register").hide();
                $("#login").show();
                // 需求：原生方式；重置！
                // 注意慎重使用this
                $("#register .layui-form")[0].reset();
            }
        }
    })


})
// ---------------------------------登录




// // 触发登录表单的 submit 事件
$('.layui-form').on('submit', function (e) {
    // 阻止form表单默认行为
    e.preventDefault()

    // 2.收集数据
    var data = $(this).serialize();
    // 3.接口,发出请求
    // 发送数据
    $.ajax({
        type: "POST",
        url: "/api/login",
        data: data,
        success: function (res) {
            // console.log(res);此时res可以接收到-------------------token
            // 弹窗：msg简单弹窗,会自动消失；
            layer.msg(res.message);

            // 业务设计,因为输入完账号密码，需要跳转到登录页面进行登录，所以进行优化
            if (res.status == 0) {
                // 把token保存到本地存储
                localStorage.setItem("token", res.token);
                location.href = "../index.html"

            }
        }
    })



})





