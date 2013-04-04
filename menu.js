var contexts = ["page"];

var parent = chrome.contextMenus.create({
    'title': 'Quan tam'
});

$.getJSON(config.server_url + '/user/topic', function (toipcs) {
    $.each(toipcs, function (i, topic) {
        chrome.contextMenus.create({
            'title': topic.name,
            'parentId': parent,
            'onclick': function (info, tab) {
                onMenuItemClick(info, tab, topic)
            }
        });
    });

    //create and post into a new topic
    chrome.contextMenus.create({
        'title': 'New Group',
        'parentId': parent,
        'onclick': function (info, tab) {
            var answer = prompt("Topic name?");
        }
    });
});


function onMenuItemClick(info, tab, topic) {
    $.ajax({
        'url': config.server_url + "/post/link",
        'method': 'post',
        'data': {
            'url': info.pageUrl,
            'topicId': topic.id
        },
        'success': function (data) {
            alert("Them thanh Cong!")
        }
    });
}

