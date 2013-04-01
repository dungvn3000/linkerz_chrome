chrome.browserAction.setBadgeBackgroundColor({color: [0, 200, 0, 100]});
window.setInterval(function () {
    $.ajax({
        url: 'http://vketnoi.com:8088/numberOfNews',
        success: function (data) {
            chrome.browserAction.setBadgeText({text: String(data)});
        }
    });
}, 1000 * 10);