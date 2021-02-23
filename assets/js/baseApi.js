$.ajaxPrefilter(function(option){
    console.log(option);
    option.url += 'http://ajax.frontend.itheima.net'
})
