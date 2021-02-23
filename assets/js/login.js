$(function () {
    $("#link_reg").on("click", function () {
        $(".login-box").hide().siblings().show();
    })
    $("#link_login").click(function () {
        $(".reg-box").hide().siblings().show();
    })

    var form = layui.form

    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (abc) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== abc) {
                return '两次密码不一致！'
            }
        }
    })
    $("#reg-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            type: "POST",
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功，请登录")
                $('#link_login').click();
            }
        })
    })
    $("#form_login").submit(function (e) {
        e.preventDefault();
        //发起请求
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success(res){
                console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                console.log("登录成功");
                localStorage.setItem("token",res.token);
                location.href = "index.html";
            }
        })
    })
})