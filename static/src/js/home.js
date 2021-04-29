odoo.define('website.ProductCorounal', function (require) {
    'use strict';

    const publicWidget = require('web.public.widget');
    var config = require('web.config');
    const core = require('web.core');
    const _t = core._t;

    publicWidget.registry.ProductCorounal = publicWidget.Widget.extend({
        selector: '.blogCarousel',

        init: function() {
            this._super.apply(this, arguments)
        },

        /**
         *
         * @returns {*}
         */
        start: function () {
            var self = this;

            // Calculate number of products per slide will be based on the screen
            var products_per_slide = config.device.size_class;
            var interval = 5000;

            // Prevent user edition
            this.$target.attr("contenteditable", "False");

            // Loading Indicator
            this.$target.html(
                $("<div/>", {class: "text-center p-5 my-5 text-muted"})
                .append($("<i/>", {
                    class: "fa fa-circle-o-notch fa-spin fa-3x fa-fwg mr-1"
                }))
            );
            // Calling RPC
            var def = this._rpc({
                route: "/render_product_carousel",
                params: {
                    limit: 10,
                    products_per_slide: products_per_slide,
                },
            })
                .then(
                    function (object_html) {
                        var $object_html = $(object_html);
                        // putting values inside the current target i.e product_carousel
                        self.$target.html($object_html);
                        // calling carousel
                        $('.blogCarousel').carousel({interval: interval});
                    },
                );
            return $.when(this._super.apply(this, arguments), def);
        },

        // start: function () {
        //     var self = this;
        //
        //     // Prevent user edition
        //     this.$target.attr("contenteditable", "False");
        //
        //     // Calling RPC call to get data from controller
        //     var def = this._rpc({
        //         route: "/render_product_carousel",
        //         params: {
        //             limit: 10,
        //             products_per_slide: 4,
        //         },
        //     })
        //         .then(
        //             // Loading Indicator
        //             function (object_html) {
        //                 self.$target.html(
        //                     $("<div/>", {class: "text-center p-5 my-5 text-muted"})
        //                         .append($("<i/>", {
        //                             class: "fa fa-circle-o-notch fa-spin fa-3x fa-fwg mr-1"
        //                         }))
        //                 );
        //                 var images = object_html.records_grouped_image.flat()
        //                 var carousel_items = images.map(function(data, index) {
        //                     if (index == 0) {
        //                         var active = 'active';
        //                     }
        //                     else {
        //                         var active = '';
        //                     }
        //                     return '<div class="carousel-item ' + active + '"><img src = '+ data + ' class=\'d-block\'></img></div>'
        //                 }).join('')
        //
        //                 self.$target.html(
        //                     $('<div/>', {'class': 'carousel slide'}).append(
        //                         $('<div/>', {'class': 'carousel-inner'}).append(
        //                             carousel_items
        //                         )
        //                     )
        //                 )
        //             },
        //             $('.blogCarousel').carousel({interval: 1000})
        //         );
        //     return $.when(this._super.apply(this, arguments), def);
        // },
    });
});