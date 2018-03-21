'use strict';

(function(module) {
    const Park = module.Park;
    const loginView = module.loginView;
    const User = module.User;

    const template = Handlebars.compile($('#park-template').html());

    const parkView = {};

    parkView.initParkView = () => {
        if(!User.current || !localStorage.getItem('id')) {
            $('#mytrips').hide();
        } else $('#mytrips').show();
        $('#park-view').show();
        $('#park-display').empty();
        Park.all.forEach(data => {
            $('#park-display').append(template(data));
        });
        loginView.initSignup();
    };

    module.parkView = parkView;
})(window.module);