'use strict';

(function(module) {
    const Park = module.Park;
    const Campground = module.Campground;
    const parkView = module.parkView;
    const planView = module.planView;
    const loginView = module.loginView;

    const resetView = () => {
        $('.view').hide();
        $('.view').removeClass('dimmed');
        $('header').removeClass('dimmed');
        module.loginView.handleLoginView();
    };

    const clearLoading = () => {
        $('#loading-screen').hide();
    }

    page('*', (ctx, next) => {
        resetView();
        next();
    });

    page('/', () => Park.populateParks()
        .then(Campground.populateCampFilter)
        .then(parkView.initParkView)
        .then(clearLoading)
    );
    
    page('/parks', () => parkView.initParkView());
    page('/profile', () => module.profileView.initProfileView());
    page('/profile/plan', () => planView.initPlanView());
    //page('/auth/signup', function());

    page('*', () => page.redirect('/'));

    page();

    page({ hashbang:true });

    
})(window.module);