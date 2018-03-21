'use strict';

(function(module) {
    const Park = module.Park;
    const Plan = module.Plan;
    const Camp = module.Camp;

    const template = Handlebars.compile($('#camp-template').html());

    const planView = {};

    planView.initPlanView = () => {
        $('#plan-view').show();
        $('.campgrounds').empty();
        Camp.all.forEach(data => {
            $('.campgrounds').append(template(data));
        });
    };
    
    module.planView = planView;
    module.template = template;
})(window.module);