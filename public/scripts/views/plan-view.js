'use strict';

(function(module) {
    const Plan = module.Plan;

    const planView = {};

    planView.initPlanView = () => {$('#plan-view').show();};

    module.planView = planView;
})(window.module);