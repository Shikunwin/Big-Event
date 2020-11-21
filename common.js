// 需求：
//      1.配置根路径
//      2.设置请求头
//      3.complete:验证token在后台的有效性

// ajax提前过滤
$.ajaxPrefilter(function (data) {
    // console.log(data);
    //1. 每次发送ajax请求之前，拿到ajax传入的这些配置项
    // 2.拿到配置项，有啥用
    //      拿到的是对象,对对象进行加工;
    // 2.1配置根路径
    var base = "http://ajax.frontend.itheima.net";
    data.url = base + data.url;

    if (data.url.indexOf("/my/") != -1) {
        // 2.2请求头
        data.headers = {
            "Authorization": localStorage.getItem("token"),
        }
        data.complete = function (xhr) {
            // xhr: 经过JQ封装后，xhr对象；
            // 原生xhr 找出返回的数据： xhr.reponseText;
            // xhr.responseJSON
            // console.log(xhr.responseJSON, 11111111111111);
            if (xhr.responseJSON.status == 1 || xhr.responseJSON.message == "身份认证失败！") {
                // 比较好的方式：就是清空
                localStorage.removeItem("token");
                location.href = "/login.html";
            }
        }
    }






})
