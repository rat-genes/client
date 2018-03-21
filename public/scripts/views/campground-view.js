'use strict';

(function(module) {
    const Campground = module.Campground;

    const template = Handlebars.compile($('#camp-template').html());
    const optionTemplate = Handlebars.compile($('#option-template').html());

    const campgroundView = {};

    campgroundView.initFilterView = () => {
        $('#campground-view').show();
        $('#campground-filters').empty();
        Campground.all.forEach(camp => {
            $('#campground-filters').append(optionTemplate(camp));
        });
    };

    campgroundView.initCampgroundView = () => {
        $('#campground-view').show();
        $('.campgrounds').empty();
        Campground.all.forEach(data => {
            $('.campgrounds').append(template(data));
        });
    };
    
    module.campgroundView = campgroundView;
    // module.template = template;
})(window.module);