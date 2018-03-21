'use strict';

(function(module) {
    const Park = module.Park;
    const loginView = module.loginView;

    const template = Handlebars.compile($('#park-template').html());

    const parkView = {};

    parkView.initParkView = () => {
        $('#park-view').show();
        $('#park-display').empty();
        Park.all.forEach(data => {
            $('#park-display').append(template(data));
        });
        loginView.initSignup();
    };

    module.parkView = parkView;
})(window.module);