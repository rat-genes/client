'use strict';

(function(module) {
    const Park = module.Park;
    const loginView = module.loginView;

    const template = Handlebars.compile($('#park-template').html());

    const parkView = {};

    parkView.initParkView = () => {
        $('#park-section').show();
        Park.all.forEach(data => {
            $('#park-section').append(template(data));
        });
        loginView.initSignup();
    };

    module.parkView = parkView;
})(window.module);