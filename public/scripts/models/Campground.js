'use strict';


(function(module) {

    function Campground(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Campground.all = [];

    Camp.populateCampFilter = (parkCode) => {
        return $.getJSON(`${API_URL}/campgrounds/${parkCode}`)
            .then(data => {
                Campground.all = data.campgrounds.map(each => new Campground(each));
            });
    };

    module.Campground = Campground;
})(window.module);