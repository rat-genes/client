'use strict';

(function (module) {
  
    function Plan(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Plan.all = [];

    Plan.addToDo = () => {
        const li = $('<li></li>').text(($('#newItem').val()));
        $('#to-do-ul').append(li);
        const remove = $('<p></p>').text('X').addClass('remove-todo');
        $(li).append(remove);
        $(remove).on('click', Plan.removeToDo);
    };

    Plan.alterToDo = () => {
        if (($(event.target).hasClass('done'))) {
            $(event.target).removeClass('done');
        } else {
            $(event.target).addClass('done');
        }
    };

    Plan.removeToDo = () => {
        if (($(event.target).hasClass('remove-todo'))) {
            $(event.target).parent().remove();
        }
    };

    Plan.alterChecklistItem = () => {
        if (($(event.target).hasClass('checked'))) {
            $(event.target).removeClass('checked');
        } else {
            $(event.target).addClass('checked');
        }
    };

    Plan.removeChecklistItem = () => {
        if (($(event.target).hasClass('remove-checklist-item'))) {
            $(event.target).parent().remove();
        }
    };

    Plan.loadTrip = () => {
        const user_id = {id: localStorage.id};
        return $.getJSON(`${API_URL}/trip/load`, user_id)
            .then(data => {
                Plan.all = data.map(each => new Plan(each));
            })
            .then(console.log('PLAN', Plan.all));
    };

    Plan.saveTodos = (data) => {
        event.preventDefault();

        Plan.checklistHtml = $('#checklist').html();
        Plan.todoHtml = $('#to-do-ul').html();
        Plan.parkCode = module.Campground.parkCode;

        const parkData = {
            park_code: Plan.parkCode,
            user_id: localStorage.id,
            campground_id: module.Campground.campgroundIndex
        };


        return $.post(`${API_URL}/trip/save`, parkData)
            .then ($.get(`${API_URL}/trip/load`, parkData))
            .then((result) => {
                Plan.tripId = result.id;

                Plan.todoData = {
                    checklistHtml: Plan.checklistHtml,
                    todoHtml: Plan.todoHtml,
                    trip_id: Plan.tripId
                };
                console.log('todoDATA!!', Plan.todoData);
            })
            .then(
                $.post(`${API_URL}/todos/save`, Plan.todoData)
            );
    };

    module.Plan = Plan;
    
    module.Plan = Plan;
})(window.module);