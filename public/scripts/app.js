'use strict';

(function(module) {
    const Park = module.Park;
    const parkView = module.parkView;
    const planView = module.planView;
    const loginView = module.loginView;

    const resetView = () => {
        $('.view').hide();
        $('.view').removeClass('dimmed');
        $('header').removeClass('dimmed');
        module.loginView.handleLoginView();
    };

    page('*', (ctx, next) => {
        resetView();
        next();
    });

    page('/', () => Park.populateParks().then(parkView.initParkView));
    page('/profile', () => module.profileView.initProfileView());
    page('/profile/plan', () => module.planView.initPlanView());
    //page('/auth/signup', function());

    page('*', () => page.redirect('/'));

    page();

    page({ hashbang:true });

})(window.module);