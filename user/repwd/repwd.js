

var form = layui.form;
form.verify({
    // 键：验证规则；值：验证方法，可以使用数组/函数
    // 数组的两个值分别代表：[正则表达式，匹配不符合时候的提示文字]
    changdu: [/^\S{6,12}$/, "长度必须为6-12位,不能输入空格"],
    // 使用函数：
    same: function (val) {
        // 第一次输入新密码，直接获取：html结构上做一些简单类名补充,方便获取
        // 再次输入新密码：val
        if (pwd !== val) {
            return "您输入的两次密码不一致"
        }
    },
    // 新旧密码不能一样
    diff: function (val) {
        // 旧密码：.oldPwd
        // 新密码：  val 
        if ($(".oldPwd").val() == val) {
            return "新旧密码不能相同";
        }
    }
})

//点击按钮
$("form").on("submit", function (e) {
    e.preventDefault();
    // $(this)serialize();不被收集：
    //      disabled设置
    //      无name属性;
    var data = $(this).serialize();
    $.post("/my/updatepwd", data, function (res) {
        // 无论修改成功还是失败,都给出提示
        layer.msg(res.message);
        if (res.status === 0) {
            // 修改成功,清空输入框的值
            $("form")[0].reset();//DOM方法reset表示重置表单
        }
    })


})



// 高效:layUI.form
// $(this)serialize();不收集数据：
// disabled禁用
// 无name属性;

