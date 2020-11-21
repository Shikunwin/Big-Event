
// 声明form表单
var form = layui.form;

// 基本信息获取
$.ajax({
    url: "/my/userinfo",
    success: function (res) {
        layer.msg(res.message);
        if (res.status == 0) {
            // var data = res.data;
            // input框赋值
            // $("input[name='username']").val(data.username);
            // $("input[name='nikename']").val(data.nikename);
            // $("input[name='email']").val(data.email);

            // 表单快速赋值
            form.val("user", res.data)

        }
    }

})

// ----------------------------更新数据
// 1.初始化id
// 2.收集不会收集disabled;
$("form").on("submit", function (e) {
    e.preventDefault();
    // 1.收集数据
    var data = $(this).serialize();
    // 2.发送数据
    $.ajax({
        type: "POST",
        url: "/my/userinfo",
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                // 业务设计:
                // userinfo和外部 index 是两个页面,由iframe嵌套
                // 通知外层,重新获取用户信息
                window.parent.get();
            }
        }
    })
})

// ----------------------------重置
$(".my-reset").click(function (e) {
    e.preventDefault();
    // 用户数据重新获取
    get();
})



// 高效
//      表单获取数据：JQ.serialize
//      表单数据验证：layUI.form内置和自定义规则
//      表单快速赋值：layUI.form











