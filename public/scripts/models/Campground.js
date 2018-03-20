'use strict';


(function(module) {
 
    function Camp(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Camp.all = [];

    Camp.populateCampFilter = function() {
        return $.getJSON(`${API_URL}/campgrounds`)
            .then(data => {
                Camp.all = data.campgrounds.map(each => new Camp(each));
            });
        };

    module.Camp = Camp;
})(window.module);