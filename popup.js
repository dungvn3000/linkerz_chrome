$(function ($) {
    $.getJSON(config.server_url + '/user/topic', function (toipcs) {
        $.each(toipcs, function (i, topic) {
            var data = {
                topic: topic,
                active: function () {
                    if (i == 0) {
                        return 'active';
                    } else {
                        return '';
                    }
                },
                display: function() {
                    if(topic.numberOfNew > 0) {
                        return topic.name + " (" + topic.numberOfNew + ")";
                    } else {
                        return topic.name;
                    }
                }
            };
            var navTopicItem = ich.navTopicItem(data);
            $('.topic-nav').append(navTopicItem);

            var topicItem = ich.topicItem(data);
            $('.topic-content').append(topicItem);
        });

        $('.topic-nav a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
            var topicName = $(this).attr('data');
            $.getJSON(config.server_url + '/topic/' + topicName + "?l=5", function (links) {
                $('.link-item-list').empty();
                $.each(links, function (i, link) {
                    var data = {
                        'link': link,
                        'unread': function() {
                            if(!link.read) {
                                return 'unread';
                            } else {
                                return '';
                            }
                        },
                        'featureImage': function() {
                            if(link.featureImage != null) {
                                return config.server_url + link.featureImage;
                            } else {
                                return "http://placehold.it/200x150"
                            }
                        }
                    };
                    var linkItem = ich.linkItem(data);
                    $('.link-item-list').append(linkItem);
                })
            });
        });
        $('.topic-nav a:first').click();

        $('#login-message').hide();
        $('.topic-container').show();
    });
});