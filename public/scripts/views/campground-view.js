'use strict';

(function(module) {
    const Campground = module.Campground;

    const template = Handlebars.compile($('#camp-template').html());
    const optionTemplate = Handlebars.compile($('#option-template').html());

    const campgroundView = {};

    campgroundView.initFilterView = () => {
        $('#campground-view').show();
        $('#campground-filters').empty();
        $('#campgrounds').empty();
        Campground.all.forEach(camp => {
            $('#campground-filters').append(optionTemplate(camp));
        });
        campgroundView.handleFilter();
    };

    campgroundView.initCampgroundView = () => {
        $('#campground-view').show();
        $('#campgrounds').empty();
        Campground.all.forEach(data => {
            $('#campgrounds').append(template(data));
        });
    };

    campgroundView.handleFilter = () => {
        $('#campground-filters').on('change', function() {
            if($(this).val()) {
                $('.camps').hide();
                $(`.camps[data-id="${$(this).val()}"]`).fadeIn();
            }
        });
    };
    
    module.campgroundView = campgroundView;
    // module.template = template;
})(window.module);