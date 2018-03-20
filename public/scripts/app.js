'use strict';

(function(module) {
    const Park = module.Park;
    const parkView = module.parkView;
    const loginView = module.loginView;

    const resetView = () => {
        $('.view').hide();
    };


    page('*', (ctx, next) => {
        resetView();
        next();
    });

    page('/', () => Park.populateParks().then(parkView.initParkView));
    page('/auth/signup', loginView.initSignup);
    page('/auth/login', loginView.initSignin);
    //page('/parks/detail', function);
    //page('/profile', function);
    //page('/profile/trip-detail', function);

    page('*', () => page.redirect('/'));

    page();


})(window.module);