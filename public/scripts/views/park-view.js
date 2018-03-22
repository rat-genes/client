'use strict';

(function(module) {
    const Park = module.Park;
    const loginView = module.loginView;
    const User = module.User;

    const template = Handlebars.compile($('#park-template').html());

    const parkView = {};

    parkView.initParkView = () => {
        
        $('#park-view').show();
        $('#park-display').empty();
        
        Park.all.forEach(data => {
            $('#park-display').append(template(data));
        });

        if(User.current || localStorage.getItem('id')) {
            $('#mytrips').show();
        } else {
            $('#mytrips').hide();
            $('.park-info a').removeAttr('href');
        }
        
        loginView.initSignup();
    };

    module.parkView = parkView;
    
})(window.module);