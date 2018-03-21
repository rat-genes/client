'use strict';

(function(module) {

    const User = module.User;

    const loginView = {};

    let method = '';

    loginView.removeLoginView = () => {
        $('#login-view').hide();
        $('header').removeClass('dimmed');
        $('.view').removeClass('dimmed');
    }

    loginView.initLoginView = () => {
        module.clearLoading();
        $('header').addClass('dimmed');
        $('.view').addClass('dimmed');
        $('#login-view').removeClass('dimmed').show();
        $('#close-login button').off().on('click', () => loginView.removeLoginView());
    };

    loginView.handleLoginView = () => {
        $('#handle-login').off().on('click', () => loginView.initLoginView());
    };

    loginView.initSignup = () => {
        if(User.current) {
            $('#login-form').hide();
            $('#logged-in').show();
        }
        else {
            method = 'signup';
            $('#auth-type').attr('href', '/auth/login').text('Already have an account? Sign In');
            $('#login-form').off('submit').on('submit', handleSubmit);
            $('#logged-in').hide();
        }
        $('$login-view').show();
    };

    const handleSubmit = event => {
        event.preventDefault();
        const credentials = {
            name: $('#name').val(),
            password: $('#password').val()
        };

        User[method(credentials)]
            .then(() => {
                $('#login-form')[0].reset();
                page('/');
            })
            .catch(err => {
                $('#auth-error').text(err.responseJSON.error);
            });
    };

    module.loginView = loginView;

})(window.module);