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
    page('/campgrounds/:id', ctx => Campground.populateCampground(ctx.params.id).then(campgroundView.initCampgroundView));
    page('/campgrounds/filters/:parkCode', ctx => Campground.populateCampFilter(ctx.params.parkCode).then(campgroundView.initFilterView));
    //page('/auth/signup', function());

    page('*', () => page.redirect('/'));

    page();

    page({ hashbang:true });

    
})(window.module);