'use strict';

(function (module) {

    function Plan(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Plan.all = [];

    Plan.myTrips = () => {
        const user_id = {id: localStorage.id};
        return $.getJSON(`${API_URL}/trip/load`, user_id)
            .then(data => {
                Plan.all = data.map(each => new Plan(each));
            })
            .then(console.log('PLAN', Plan.all));
    };


    // Park.populateParks = function() {
    //     return $.getJSON(`${API_URL}/parks`)
    //         .then(data => {
    //             Park.all = data.parks.map(each => new Park(each));
    //         });
    // };

    module.Plan = Plan;

})(window.module);