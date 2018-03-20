'use strict';

(function(module) {

    const User = module.User;

    const loginView = {};

    let method = '';

    loginView.initSignup = () => {
        if(User.current) {
            $('#admin-form').hide();
            $('#logged-in').show();
        }
        else {
            method = 'signup';
            $('#auth-type').attr('href', '/auth/login').text('Already have an account? Sign In');
            $('#admin-form').off('submit').on('submit', handleSubmit);
            $('#logged-in').hide();
        }
        $('$admin-view').show();
    };

    const handleSubmit = event => {
        event.preventDefault();
        const credentials = {
            name: $('#name').val(),
            password: $('#password').val()
        };
        User[method](credentials)
            .then(() => {
                $('$admin-form')[0].reset();
                page('/');
            })
            .catch(err => {
                $('#auth-error').text(err.responseJSON.error);
            });
    };

    module.loginView = loginView;

})(window.module);