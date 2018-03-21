'use strict';

(function(module) {

    const User = module.User;

    const loginView = {};

    loginView.removeLoginView = () => {
        $('#signup-form')[0].reset();
        $('#login-form')[0].reset();
        $('#auth-error').text('');
        $('#login-view').hide();
        $('header').removeClass('dimmed');
        $('.view').removeClass('dimmed');
    };

    loginView.initLoginView = () => {
        if(User.current || localStorage.getItem('id')) {
            module.User.logout();
        }
        $('header').addClass('dimmed');
        $('.view').addClass('dimmed');
        $('#login-view').removeClass('dimmed').show();
        $('#close-login button').off().on('click', () => loginView.removeLoginView());
    };

    loginView.handleLoginView = () => {
        if(User.current || localStorage.getItem('id')) {
            $('#handle-login').off().on('click', () => loginView.initLoginView());
            $('#handle-login').text('Logout');
        } else {
            $('#handle-login').text('Login/Signup');
            $('#handle-login').off().on('click', () => loginView.initLoginView());
        }
    };

    loginView.initSignup = () => {
        $('#auth-error').text('');
        $('#login-form').off('submit').on('submit', handleLoginSubmit);
        $('#signup-form').off('submit').on('submit', handleSignupSubmit);
    };

    const handleSignupSubmit = event => {
        event.preventDefault();
        const credentials = {
            name: $('#signup-name').val(),
            password: $('#signup-password').val()
        };
        User.signup(credentials)
            .then(() => {
                $('#signup-form')[0].reset();
                $('#login-form')[0].reset();
                page('/');
            })
            .catch(err => {
                $('#auth-error').text(err.responseJSON.error.toUpperCase());
            });
    };

    const handleLoginSubmit = event => {
        event.preventDefault();
        const credentials = {
            name: $('#login-name').val(),
            password: $('#login-password').val()
        };
        User.signin(credentials)
            .then(() => {
                $('#login-form')[0].reset();
                $('#signup-form')[0].reset();
                page('/');
            })
            .catch(err => {
                $('#auth-error').text(err.responseJSON.error.toUpperCase());
            });
    };

    module.loginView = loginView;

})(window.module);