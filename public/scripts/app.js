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
    page('/profile', () => Plan.saveTrip().then(profileView.initProfileView));
    page('/profile/plan/', ctx => campgroundView.initCampgroundView);
    //TODO: If coming from MY TRIPS, clear HTML and repopulate from DB
    page('/profile/plan/:id', ctx => campgroundView.initCampgroundView);
    page('/campgrounds/:parkCode', ctx => Campground.populateCampFilter(ctx.params.parkCode).then(campgroundView.initFilterView).then(campgroundView.initCampgroundView));
    page('/trip/campground/:id/:parkCode', ctx => Campground.saveTrip({park_code: ctx.params.parkCode, campground_id: ctx.params.id}));

    page('*', () => page.redirect('/'));
    
    page({ hashbang:true });

    page();
    
})(window.module);