'use strict';

(function(module) {
    const Campground = module.Campground;
    const Park = module.Park;
    const Plan = module.Plan;
    const campgroundView = module.campgroundView;
    const parkView = module.parkView;
    const profileView = module.profileView;
    const loginView = module.loginView;
    
    const resetView = () => {
        $('.view').hide();
        loginView.handleLoginView();
    };

    const clearLoading = () => {
        $('#loading-screen').remove();
        $('header').removeClass('dimmed');
        $('.view').removeClass('dimmed');
    };

    page('*', (ctx, next) => {
        resetView();
        next();
    });

    page('/', () => Park.populateParks()
        .then(parkView.initParkView)
        // a bit odd to need to do this, 
        // but I know you had issue with loading times
        .then(clearLoading)
    );

    page('*', (ctx, next) => {
        clearLoading();
        window.scrollTo(0,0);
        next();
    });

    // break up long lines
    page('/parks', parkView.initParkView);
    page('/profile', () => Plan.loadTrip().then(profileView.initProfileView));
    page('/profile/plan/', campgroundView.initCampgroundView);
    page('/profile/plan/:id/:parkCode', ctx => Campground.populateCampFilter(ctx.params.parkCode)
        .then(campgroundView.initFilterView)
        .then(Plan.loadPlan(ctx.params.id))
        .then(campgroundView.initCampgroundView)
        .then(campgroundView.initSavedPlan)
    );
    page('/campgrounds/:parkCode', ctx => Campground.populateCampFilter(ctx.params.parkCode)
        .then(Plan.newPlan)
        .then(campgroundView.initFilterView)
        .then(campgroundView.initCampgroundView)
    );
    page('/profile/deletetrip/:id', ctx => Plan.deleteTrip(ctx.params.id)
        .then(Plan.myTrips)
        .then(profileView.initProfileView)
    );
    page('/trip/campground/:id/:parkCode', ctx => Campground.saveTrip({park_code: ctx.params.parkCode, campground_id: ctx.params.id}));

    page('*', () => page.redirect('/'));
    
    page({ hashbang:true });

    page();
    
})(window.module);