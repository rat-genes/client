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
            });
    };

    Campground.populateCampground = (id) => {
        return $.getJSON(`${API_URL}/campgrounds/filter/${id}`)
            .then(data => {
                Campground.all = data.campgrounds.map(each => new Campground(each));
                console.log(id);
            });
    };

    // const data = {
    //     park_code: 'crla',
    //     campground_id: '62'
    // };

    Campground.saveTrip = (data) => {
        data.user_id = localStorage.id;
        return $.post(`${API_URL}/trip/save`, data)
            .then(page.redirect('/'));

    };

    // Campground.saveTrip = (id) => {
    //     return $.ajax({
    //         url: `${API_URL}/trip/save`,
    //         method: 'PUT'
    //     })
    //         .then(data => {
    //             console.log('DATA', data);
    //             console.log('ID', id);
    //         });
    // };

    module.Campground = Campground;
})(window.module);