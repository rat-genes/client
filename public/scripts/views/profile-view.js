'use strict';

(function(module) {
    const Plan = module.Plan;

    const profileView = {};

    const tripTemplate = Handlebars.compile($('#trip-template').html());

    profileView.initProfileView = () => {
        $('#notrips').hide();
        $('#profile-view').show();
        $('#user-plans').empty();
        if(Plan.all.length === 0) $('#notrips').show();
        Plan.all.forEach(data => {
            $('#user-plans').append(tripTemplate(data));
        })
        $('a').on('click', () => {
            Plan.index = $(event.target).attr('data-campground-id');
        })
        ;
    };

    module.profileView = profileView;
})(window.module);