'use strict';

(function(module) {
    const Park = module.Park;
    const parkView = module.parkView;

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
    //page('/parks/detail', function);
    //page('/profile', function);
    //page('/profile/trip-detail', function);

    page('*', () => page.redirect('/'));

    page();


})(window.module);