'use strict';

(function(module) {
    const Park = module.Park;
    const Campground = module.Campground;
    const parkView = module.parkView;
    const campgroundView = module.campgroundView;
    
    const resetView = () => {
        $('.view').hide();
        module.loginView.handleLoginView();
        // THE FOLLOWING LINE MUST BE REMOVED AFTER CODING TODO STUFF
        clearLoading();
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
    page('/profile/plan/', ctx => campgroundView.initCampgroundView);
    page('/profile/plan/:id', ctx => campgroundView.initCampgroundView);
    page('/campgrounds/:parkCode', ctx => Campground.populateCampFilter(ctx.params.parkCode).then(campgroundView.initFilterView).then(campgroundView.initCampgroundView));

    page('*', () => page.redirect('/'));
    
    page({ hashbang:true });

    page();
    
})(window.module);