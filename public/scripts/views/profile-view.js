'use strict';

(function(module) {
    const Profile = module.Profile;

    const profileView = {};

    profileView.initProfileView = () => {
        module.clearLoading();
        $('#profile-view').show();
    };

    module.profileView = profileView;
})(window.module);