'use strict';

(function(module) {
    const Park = module.Park;
    const Plan = module.Plan;
    const Campground = module.Campground;

    const template = Handlebars.compile($('#camp-template').html());

    const planView = {};

    planView.initPlanView = () => {
<<<<<<< HEAD:public/scripts/views/plan-view.js
        $('#plan-view').show();
        $('.campgrounds').empty();
        Camp.all.forEach(data => {
            $('.campgrounds').append(template(data));
        });
=======
        $('#campground-view').show();
        Campground.all.forEach(data => {
            $('#campground-view').append(template(data));
        })
>>>>>>> e51ccee43324a1734dd5508755aa93bbdcf109e0:public/scripts/views/campground-view.js
    };
    
    module.planView = planView;
    module.template = template;
})(window.module);