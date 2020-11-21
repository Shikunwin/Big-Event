


// - 调用cropper方法，创建剪裁区
$('#image').cropper({
    // 纵横比(宽高比)
    aspectRatio: 1, // 正方形
    // 指定预览区域
    preview: '.img-preview' // 指定预览区的类名（选择器）
});



// 上传
// 选择图片
$(".select").click(function () {
    $("#file").click();
});
// 事件
// 选择图片
//      1.事件：change文件被选择的时候
//      2.选择某个图片后，确实可以到文件信息的对象！需要src地址，
//          url地址
//      3.
// url  内置地址
$("#file").change(function () {
    // 1.文件对象
    var obj = this.files[0];
    // 2.url内置对象，创建临时地址
    var src = URL.createObjectURL(obj);
    // 3.替换：使用cropper,查文档！
    $("#image").cropper("replace", src);
})





// // 确认裁剪
$('.sure').click(function () {
    // 1.使用插件的方法，得到canvas对象；
    var canvas = $('#image').cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    });

    // 2  canvas把裁剪出来图片信息 toDataURL 转为Base64 字符串；
    //    意见：小图片使用base64，后台给！
    var base64 = canvas.toDataURL('image/png');

    // 3. ajax提交url编码 提交字符串，完成更新
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: { avatar: base64 },
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                // 重新获取用户信息
                window.parent.get();
            }
        }
    });
});
