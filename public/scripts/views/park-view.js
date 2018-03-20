'use strict';

(function(module) {
    const Park = module.Park;

    const template = Handlebars.compile($('#park-template').html());

    const parkView = {};

    parkView.initParkView = () => {
        $('#park-view').show();
        Park.all.forEach(data => {
            $('#park-view').append(template(data));
        });
    };

    module.parkView = parkView;
})(window.module);