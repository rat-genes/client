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

    Plan.savePlan = () => {
        // click save button
        // grab state of campground
        // grab state of checkboxes
        // grab state of to-do list
    };

    module.Plan = Plan;
    
})(window.module);