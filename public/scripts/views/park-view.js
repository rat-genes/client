'use strict';

(function(module) {
    const Park = module.Park;

    const template = Handlebars.compile($('#park-template').html());

    const parkView = {};

    parkView.initParkView = () => {
        module.clearLoading();
        $('#park-view').show();
        $('#park-display').empty();
        Park.all.forEach(data => {
            $('#park-display').append(template(data));
        });
    };

    module.parkView = parkView;
})(window.module);