'use strict';

(function(module) {
 
    function Park(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Park.all = [];

    Park.populateParks = function() {
        return $.getJSON(`${API_URL}/parks`)
            .then(data => {
                Park.all = data.parks.map(each => new Park(each));
            });
    };

    module.Park = Park;
    
})(window.module);