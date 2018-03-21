'use strict';

(function(module) {
    const Campground = module.Campground;

    const template = Handlebars.compile($('#camp-template').html());

    const campgroundView = {};

    campgroundView.initCampgroundView = () => {
        $('#campground-view').show();
        $('.campgrounds').empty();
        Campground.all.forEach(data => {
            $('.campgrounds').append(template(data));
        });
        $('#add-item-button').on('click', () => {
            event.preventDefault();

            $('#to-do-ul').append(($('<li></li>').text(($('#newItem').val()))));            


            // $('#to-do-ul').append($("li").text(val($('#newItem'))));
        })
    };
    
    module.campgroundView = campgroundView;
    module.template = template;
})(window.module);