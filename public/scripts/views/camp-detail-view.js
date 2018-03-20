'use strict';

(function(module) {
    const Park = module.Park;

    const template = Handlebars.compile($('#camp-template').html());

    const campView = {};

    campView.initCampView = () => {
        $('#camp-detail').show();
        Park.all.forEach(data => {
            $('#camp-detail').append(template(data));
        });
    };

    module.campView = campView;
})(window.module);