'use strict';


(function(module) {

    function Campground(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Campground.all = [];

    Campground.populateCampFilter = function() {
        return $.getJSON(`${API_URL}/campgrounds`)
            .then(data => {
                Campground.all = data.campgrounds.map(each => new Campground(each));
            });
        };

    module.Campground = Campground;
})(window.module);