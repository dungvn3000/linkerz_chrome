$(function ($) {
    $.getJSON(config.server_url + 'user/topic', function (toipcs) {
        $.each(toipcs, function (i, topic) {
            var data = {
                topic: topic,
                active: function () {
                    if (i == 0) {
                        return 'active';
                    } else {
                        return '';
                    }
                }
            };
            var navTopicItem = ich.navTopicItem(data);
            $('.topic-nav').append(navTopicItem);

            var topicItem = ich.topicItem(data);
            $('.topic-content').append(topicItem);
        });

        $('#login-message').hide();
        $('.topic-container').show();
        $('.topic-nav a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
            var topicName = $(this).text();
            $.getJSON(config.server_url + 'topic/' + topicName, function (links) {
                $.each(links, function (i, link) {
                    var linkItem = ich.linkItem(link);
                    $('.link-item-list').append(linkItem);
                })
            });
        });
        $('.topic-nav a:first').click();
    });
});