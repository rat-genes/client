'use strict';

(function(module) {
    const Park = module.Park;
    const Campground = module.Campground;
    const parkView = module.parkView;
    const campgroundView = module.campgroundView;
    const Plan = module.Plan;
    const profileView = module.profileView;
    const loginView = module.loginView;
    
    const resetView = () => {
        $('.view').hide();
        module.loginView.handleLoginView();
    };

    const clearLoading = () => {
        $('#loading-screen').hide();
        $('header').removeClass('dimmed');
        $('.view').removeClass('dimmed');
    };

    page('*', (ctx, next) => {
        resetView();
        next();
        // NOTE: THE FOLLOWING LINE NEEDS TO BE REMOVED WHEN CODING IS COMPLETE
        clearLoading();
    });

    page('/', () => Park.populateParks()
        .then(parkView.initParkView)
        .then(clearLoading)
    );

    page('/parks', () => parkView.initParkView());
    page('/profile', () => Plan.loadTrip().then(profileView.initProfileView));
    page('/profile/plan/', ctx => (campgroundView.initCampgroundView));
    page('/profile/plan/:id/:parkCode', ctx => Campground.populateCampFilter(ctx.params.parkCode).then(campgroundView.initFilterView).then(Plan.loadPlan(ctx.params.id)).then(campgroundView.initCampgroundView).then(campgroundView.initSavedPlan));
    page('/campgrounds/:parkCode', ctx => Campground.populateCampFilter(ctx.params.parkCode).then(Plan.newPlan).then(campgroundView.initFilterView).then(campgroundView.initCampgroundView));
    page('/profile/deletetrip/:id', ctx  => Plan.deleteTrip(ctx.params.id).then(Plan.myTrips).then(profileView.initProfileView));
    page('/trip/campground/:id/:parkCode', ctx => Campground.saveTrip({park_code: ctx.params.parkCode, campground_id: ctx.params.id}));

    page('*', () => page.redirect('/'));
    
    page({ hashbang:true });

    page();
    
})(window.module);