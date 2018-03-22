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

    module.profileView = profileView;
})(window.module);