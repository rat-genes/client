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
            });
    };

    Plan.deleteTrip = (id) => {
        return $.ajax({
            url: `${API_URL}/profile/deletetrip/${id}`,
            method: 'DELETE'
        });
    };

    Plan.addToDo = () => {
        const li = $('<li></li>').text(($('#newItem').val()));
        $('#to-do-ul').append(li);
        const remove = $('<p></p>').text('X').addClass('remove-todo');
        $(li).append(remove);
        $('#newItem').val('');
        $(remove).on('click', Plan.removeToDo);
    };

    Plan.alterToDo = () => {
        $(event.target).toggleClass('done');
    };

    Plan.removeToDo = () => {
        if (($(event.target).hasClass('remove-todo'))) {
            // This code is hard to understand as you have to 
            // figure out what .parent() is and why you would remove.
            $(event.target).parent().remove();
        }
    };

    Plan.alterChecklistItem = () => {
        $(event.target).toggleClass('checked');
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
            });
    };

    Plan.saveTodos = () => {
        event.preventDefault();
        if (($('#trip-saved'))){$('#trip-saved').remove();}

        const saved = $('<p id="trip-saved">Trip saved</p>');
        $('#save-plan-div').append(saved);

        Plan.checklistHtml = $('#checklist').html();
        Plan.todoHtml = $('#to-do-ul').html();
        Plan.parkCode = module.Campground.parkCode;

        const parkData = {
            park_code: Plan.parkCode,
            user_id: localStorage.id,
            campground_id: module.Campground.campgroundIndex
        };

        return $.post(`${API_URL}/trip/save`, parkData)
            // 1. second param is "error handler". no data on a GET.
            // 2. you want to return the promise, not pass it as
            // the callback
            // 3. Would be better to do this as one server call. Not three
            // calls from client to server
            .then (() => $.get(`${API_URL}/trip/load`))
            .then((result) => {
                Plan.tripId = result.id;

                const todoData = {
                    checklistHtml: Plan.checklistHtml,
                    todoHtml: Plan.todoHtml,
                    trip_id: Plan.tripId
                };

                return todoData;
            })
            .then((result) => {
                $.post(`${API_URL}/todos/save`, result);
            });
    };

    Plan.loadPlan = (id) => {
        $('#checklist').empty().html(Plan.checklist);
        $('#to-do-ul').empty().html(Plan.toDoList);
        $('#save-plan-div').hide();

        return $.getJSON(`${API_URL}/profile/loadplan/${id}`)
            .then((result) => {
                $('#checklist').html(result[0].checklist);
                $('#to-do-ul').html(result[0].todos);
            });
    };

    Plan.defaultChecklist =
    `
    
    <h2>Trip Checklist</h2>

    <h2>Shelter and Bedding</h2>
    <ul>
      <li>Tent</li>
      <li>Tarp</li>
      <li>Sleepingbag(thickness depending on climate)</li>
      <li>Camp Chairs</li>
      <li>Pillows</li>
    </ul>

    <h2>Cooking and Storage</h2>

    <ul>
      <li>Cooler</li>
      <li>Cooking/Eating Utensils</li>
      <li>Trashbags</li>
      <li>Firewood(if allowed)</li>
      <li>Dishwash Bin</li>
      <li>Dish Soap</li>
    </ul>

    <h2>Toiletries</h2>

    <ul>
      <li>Toothbrush/Toothpaste/Floss</li>
      <li>Shampoo/Conditioner</li>
      <li>Towel</li>
      <li>Soap</li>
      <li>Sunscreen</li>
    </ul>

    <h2>Clothed(Depending on Climate)</h2>
    <ul>
        <li>Underwear</li>
        <li>Socks</li>
        <li>Wool Socks</li>
        <li>T-Shirts</li>
        <li>Thermal or Long Sleeve Shirts</li>
        <li>Sweaters/Sweatshirts</li>
        <li>Hiking Pants/Shorts</li>
        <li>Hiking Boots/Trail Shoes</li>
        <li>Hat/Bandana</li>
        <li>Camp Shoes/Flip-Flop</li>
    </ul>
 
    `;
    Plan.newPlan = () => {
        $('#checklist').empty().html(Plan.defaultChecklist);
        $('#to-do-ul').empty();
        $('#save-plan-div').hide();
    };
        
    module.Plan = Plan;
    
})(window.module);