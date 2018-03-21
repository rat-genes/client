'use strict';

(function(module) {
    const Campground = module.Campground;

    const template = Handlebars.compile($('#camp-template').html());

    const campgroundView = {};

    campgroundView.initCampgroundView = () => {
        module.clearLoading();
        $('#campground-view').show();
        $('.campgrounds').empty();
        Campground.all.forEach(data => {
            $('.campgrounds').append(template(data));
        });
    };
    
    module.campgroundView = campgroundView;
    module.template = template;
})(window.module);