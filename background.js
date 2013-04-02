chrome.browserAction.setBadgeBackgroundColor({color: [0, 200, 0, 100]});

window.setInterval(function () {
    update_news();
}, 1000 * 10);

function update_news() {
    $.ajax({
        url: 'http://vketnoi.com:8088/numberOfNews',
        success: function (data) {
            if(data > 0) {
                chrome.browserAction.setBadgeText({text: String(data)});
            } else if(data == 0) {
                chrome.browserAction.setBadgeText({text: ""});
            }
        }
    });
}