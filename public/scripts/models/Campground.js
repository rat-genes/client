'use strict';


(function(module) {

    function Campground(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Campground.all = [];

    Campground.populateCampFilter = (parkCode) => {
        
        return $.getJSON(`${API_URL}/campgrounds/${parkCode}`)
            .then(data => {
                Campground.all = data.campgrounds.map(each => new Campground(each));
                Campground.parkCode = parkCode;
            });
    };

    
    Campground.populateCampground = (id) => {
        // AFAICT, this endpoint (url path) doesn't exist on server?
        // If so, remove this code...
        return $.getJSON(`${API_URL}/campgrounds/filter/${id}`)
            .then(data => {
                Campground.all = data.campgrounds.map(each => new Campground(each));
            });
    };

    Campground.saveTrip = (data) => {
        data.user_id = localStorage.id;
        return $.post(`${API_URL}/trip/save`, data);
    };
  
    module.Campground = Campground;
})(window.module);