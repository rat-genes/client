'use strict';

(function(module) {
    const Plan = module.Plan;
    const Campground = module.Campground;

    const template = Handlebars.compile($('#camp-template').html());

    const planView = {};

    planView.initPlanView = () => {
        $('#campground-view').show();
        Campground.all.forEach(data => {
            $('#campground-view').append(template(data));
        })
    };

    module.planView = planView;
    module.template = template;
})(window.module);