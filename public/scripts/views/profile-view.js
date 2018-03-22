'use strict';

(function(module) {
    const Plan = module.Plan;

    const profileView = {};

    const tripTemplate = Handlebars.compile($('#trip-template').html());

    profileView.initProfileView = () => {
        $('#profile-view').show();
        $('#user-plans').empty();
        Plan.all.forEach(data => {
            $('#user-plans').append(tripTemplate(data));
        });
    };

    //TODO: Create a path that goes over to planning a trip WITH DATA from a trip here

    module.profileView = profileView;
})(window.module);