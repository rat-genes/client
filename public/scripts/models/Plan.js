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

    Plan.saveTrip = () => {
        const user_id = {id: localStorage.id};
        return $.getJSON(`${API_URL}/trip/load`, user_id)
            .then(data => {
                Plan.all = data.map(each => new Plan(each));
            })
            .then(console.log('PLAN', Plan.all));
    };

    Plan.saveTodos = (data) => {
        event.preventDefault();

        const checklistHtml = $('#checklist').html();
        const todoHtml = $('#to-do-ul').html();
        const parkCode = module.Campground.parkCode;

        const todoData = {
            checklistHtml: checklistHtml,
            todoHtml: todoHtml,
        };

        const parkData = {
            park_code: parkCode,
            user_id: localStorage.id,
            campground_id: module.Campground.campgroundIndex
        };

        return $.post(`${API_URL}/todos/save`, todoData)
            .then(
                $.post(`${API_URL}/trip/save`, parkData)
            );
    };

    module.Plan = Plan;
    
    module.Plan = Plan;
})(window.module);