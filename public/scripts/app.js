'use strict';

(function(module) {
    const Park = module.Park;
    const Campground = module.Campground;
    const parkView = module.parkView;

    const campgroundView = module.campgroundView;
    const loginView = module.loginView;

    const resetView = () => {
        $('.view').hide();
        loginView.handleLoginView();
    };

    const clearLoading = () => {
        $('#loading-screen').hide();
        $('header').removeClass('dimmed');
        $('.view').removeClass('dimmed');
    };

    page('*', (ctx, next) => {
        resetView();
        next();
    });

    page('/', () => Park.populateParks()
        .then(parkView.initParkView)
        .then(clearLoading)
    );
    
    page('/parks', () => parkView.initParkView());
    page('/profile', () => module.profileView.initProfileView());
    page('/campgrounds/:parkCode', ctx => Campground.populateCampFilter(ctx.params.parkCode).then(campgroundView.initFilterView).then(campgroundView.initCampgroundView));
    page('/auth/signup', loginView.initSignup);
    page('/auth/login', loginView.initSignin);

    page('*', () => page.redirect('/'));
    
    page({ hashbang:true });

    page();


    
})(window.module);