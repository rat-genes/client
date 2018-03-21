'use strict';

(function (module) {

    const User = {};

    User.current = null;

    User.signup = credentials => {
        return $.post(`${API_URL}/auth/signup`, credentials)
            .then(response => {
                User.current = true;
                window.localStorage.id = response[0];
                page.redirect('/');
            });
    };

    User.signin = credentials => {
        return $.post(`${API_URL}/auth/login`, credentials)
            .then(response => {
                User.current = true;
                window.localStorage.id = response[0];
                page.redirect('/');
            });
    };

    User.logout = () => {
        window.localStorage.removeItem('id');
        User.current = false;
        page.redirect('/');
    };

    module.User = User;

})(window.module);