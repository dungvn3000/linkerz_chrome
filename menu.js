var contexts = ["page"];

var parent = chrome.contextMenus.create({
    'title': 'Quan tam',
    'onclick': function (info, tab) {
        onMenuItemClick(info, tab)
    }
});

function onMenuItemClick(info, tab) {
    $.ajax({
        'url': config.server_url + "/post/link",
        'method': 'post',
        'data': {
            'url': info.pageUrl
        },
        'success': function (data) {
            alert("Quan tam thanh Cong!")
        }
    });
}

