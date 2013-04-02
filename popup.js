var app = app || {};

$(function ($) {
    var LinkItem = Backbone.Model.extend({});

    var LinkItems = Backbone.Collection.extend({
        model: LinkItem,
        url: 'http://vketnoi.com:8088/group/default',
        initialize: function (models, options) {
            this.bind("add", options.view.addLinkItem);
        }
    });

    app.LinkItemView = Backbone.View.extend({
        tagName: 'div',
        className: function () {
            var className = 'row-fluid link-item';
            if (!this.model.get("read")) {
                className += ' unread';
            }
            return className;
        },
        template: _.template($('#link-item-template').html()),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    app.AppView = Backbone.View.extend({
        el: $("body"),
        initialize: function () {
            this.linkItems = new LinkItems(null, {view: this});
            this.linkItems.fetch({
                data: {"l": 5},
                success: function () {
                    $('#login-message').hide();
                    $('#read-more').show();
                    chrome.browserAction.setBadgeText({text: ""});
                }});
        },
        addLinkItem: function (model) {
            var view = new app.LinkItemView({model: model});
            $('#link-item-list').append(view.render().el);
        }
    });

    var appView = new app.AppView;

});