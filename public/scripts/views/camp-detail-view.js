'use strict';

(function(module) {
    const Park = module.Park;

    const template = Handlebars.compile($('#camp-template').html());

    const campView = {};

    campView.initCampView = () => {
        $('#plan-view').show();
        Park.all.forEach(data => {
            $('#plan-view').append(template(data));
        });
    };

    module.campView = campView;
})(window.module);