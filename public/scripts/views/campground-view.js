'use strict';

(function(module) {
    const Campground = module.Campground;

    const template = Handlebars.compile($('#camp-template').html());
    const optionTemplate = Handlebars.compile($('#option-template').html());
    const campgroundView = {};

    campgroundView.initFilterView = () => {
        $('#campground-view').show();
        $('#campground-filters').empty();
        $('#campground-filters').append('<option id="header" value="header">Campgrounds</option>');
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
        $('.camps').hide();
    };

    campgroundView.handleFilter = () => {
        $('#campground-filters').on('change', function() {
            if($(this).val()) {
                $('.camps').hide();
                $(`.camps[data-id="${$(this).val()}"]`).fadeIn();
            }
        });
        $('#add-item-button').on('click', () => {
            event.preventDefault();

            $('#to-do-ul').append(($('<li></li>').text(($('#newItem').val()))));            


            // $('#to-do-ul').append($("li").text(val($('#newItem'))));
        })
    };
    
    module.campgroundView = campgroundView;
})(window.module);