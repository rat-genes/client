'use strict';

(function(module) {
    const Campground = module.Campground;
    const Plan = module.Plan;

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

    campgroundView.initSavedPlan = () => {
        $(`#campground-filters`).prop('selectedIndex', Plan.index).change();
    };

    campgroundView.initCampgroundView = () => {
        $('#campground-view').show();
        $('#campgrounds').empty();

        Campground.all.forEach(data => {
            $('#campgrounds').append(template(data));
        });

        $('.camps').hide();

        $('#add-item-button').off('click').on('click', () => {
            event.preventDefault();
            Plan.addToDo();
        });

        $('#to-do-list-div').off('click').on('click', () => {
            Plan.alterToDo();
        });

        $('.remove-todo').off('click').on('click', Plan.removeToDo);

        $('#checklist').off('click').on('click', () => {
            Plan.alterChecklistItem();
        });

        $('#campground-filters').off('click').on('change', (e) => {
            Campground.campgroundIndex = e.target.selectedIndex;
            $('#save-plan-div').show();
        });

        $('#save-plan-button').off().on('click', Plan.saveTodos);
    };

    campgroundView.handleFilter = () => {
        $('#campground-filters').on('change', function() {
            if($(this).val()) {
                $('.camps').hide();
                $(`.camps[data-campground-id="${$(this).val()}"]`).fadeIn();
            }
        });
    };
    
    module.campgroundView = campgroundView;
    module.Campground = Campground;
})(window.module);