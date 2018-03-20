'use strict';

(function(module) {
    const Park = module.Park;
    const Camp = module.Camp;
    const parkView = module.parkView;
    const campView = module.campView;

    const resetView = () => {
        $('.view').hide();
    };


    page('*', (ctx, next) => {
        resetView();
        next();
    });

    page('/', () => Park.populateParks().then(parkView.initParkView));
    //page('/auth/signup', function());
    //page('/auth/login', function);
    page('/parks/detail', () => Camp.populateCampFilter().then(campView.initCampView));
    //page('/profile/trip-detail', function);

    page('*', () => page.redirect('/'));

    page();


})(window.module);