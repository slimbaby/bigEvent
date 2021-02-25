$.ajaxPrefilter(function(option){
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    if(option.url.includes('/my')){
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
          }
    }
    const newSuccess = option.success.bind(this)
    option.success = function(res){
        newSuccess(res);
        const {
                    status,
                    message
                } = res;
                if (status === 1 && message === "身份认证失败！") {
                    localStorage.removeItem("token");
                    location.href = "login.html";
                }
    }
    // option.complete = function (response) {
    //     const {
    //         status,
    //         message
    //     } = response.responseJSON;
    //     if (status === 1 && message === "身份认证失败！") {
    //         localStorage.removeItem("token");
    //         location.href = "login.html";
    //     }
    // }
})
