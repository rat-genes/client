'use strict';

(function(module) {
    const Park = module.Park;
    const Campground = module.Campground;
    const parkView = module.parkView;
    const campgroundView = module.campgroundView;
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

    page('/', () => Park.populateParks().then(Campground.populateCampFilter).then(parkView.initParkView));
    page('/parks', () => parkView.initParkView());
    page('/profile', () => module.profileView.initProfileView());
    page('/profile/plan/:parkCode', ctx => Campground.populateCampFilter(ctx.params.parkCode).then(campgroundView.initCampgroundView));
    //page('/auth/signup', function());

    page('*', () => page.redirect('/'));

    page();

    page({ hashbang:true });

})(window.module);