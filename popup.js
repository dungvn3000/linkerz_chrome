var app = app || {};

$(function ($) {
    var LinkItem = Backbone.Model.extend({});

    var LinkItems = Backbone.Collection.extend({
        model: LinkItem,
        url: 'http://vketnoi.com:8088/group/default',
        initialize: function (models, options) {
            this.bind("add", options.view.addLinkItemLi);
        }
    });

    app.LinkItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'dung ne',
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
            this.linkItems.fetch({success: function () {
                $('#login-message').hide();
            }});
        },
        addLinkItemLi: function (model) {
            var view = new app.LinkItemView({model: model});
            $('#link-item-list').append(view.render().el);
        }
    });

    var appView = new app.AppView;

});