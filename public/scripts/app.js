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
    page('/profile', () => Plan.myTrips().then(profileView.initProfileView));
    page('/profile/plan/', ctx => campgroundView.initCampgroundView);
    page('/profile/plan/:id', ctx => campgroundView.initCampgroundView);
    page('/campgrounds/:parkCode', ctx => Campground.populateCampFilter(ctx.params.parkCode).then(campgroundView.initFilterView).then(campgroundView.initCampgroundView));
    page('/trip/campground/:id/:parkCode', ctx => Campground.saveTrip({park_code: ctx.params.parkCode, campground_id: ctx.params.id}));

    page('*', () => page.redirect('/'));
    
    page({ hashbang:true });

    page();

    // $(document).ready(function(){
    //     $('section[data-type="background"]').each(function(){
    //         const $bgobj = $(this); // assigning the object
        
    //         $(window).scroll(function() {
    //             const yPos = -($(window).scrollTop() / $bgobj.data('speed'));
                
    //             // Put together our final background position
    //             const coords = '50% ' + yPos + 'px';
    
    //             // Move the background
    //             $bgobj.css({ backgroundPosition: coords });
    //         });
    //     });
    // });
    
})(window.module);