'use strict';

(function(module) {
    const Plan = module.Plan;
    const Camp = module.Camp;

    const template = Handlebars.compile($('#camp-template').html());

    const planView = {};

    planView.initPlanView = () => {
        $('#plan-view').show();
        Camp.all.forEach(data => {
            $('#plan-view').append(template(data));
        })
    };

    module.planView = planView;
    module.template = template;
})(window.module);