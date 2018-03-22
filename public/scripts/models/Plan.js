'use strict';

(function(module) {
    
    const Plan = {};

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

    Plan.savePlan = (data) => {
        event.preventDefault();

        const checklistHtml = $('#checklist').html();
        const todoHtml = $('#to-do-ul').html();
        const campground = module.Campground.campground;

        const storedData = {
            checklistHtml: checklistHtml,
            todoHtml: todoHtml,
            campground: campground
        }

        return $.post(`${API_URL}/todos/save`, storedData)

    };

    module.Plan = Plan;
    
})(window.module);