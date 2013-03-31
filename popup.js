$(function(){
    $.ajax({
        'url' : 'http://vketnoi.com:8088/group/default',
        'success': function(data) {
            $('body').replaceWith(data);
        }
    })
});