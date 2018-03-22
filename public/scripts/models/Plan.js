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
        if (($('#trip-saved'))){$('#trip-saved').remove();}

        const saved = $('<p id="trip-saved">Trip saved</p>');
        $('#save-plan-div').append(saved);

        const checklistHtml = $('#checklist').html();
        const todoHtml = $('#to-do-ul').html();
        const parkCode = module.Campground.parkCode;

        const todoData = {
            checklistHtml: checklistHtml,
            todoHtml: todoHtml,
        }

        const parkData = {
            park_code: parkCode,
            user_id: localStorage.id,
            campground_id: module.Campground.campgroundIndex
        }

        return $.post(`${API_URL}/todos/save`, todoData)
            .then(
                $.post(`${API_URL}/trip/save`, parkData)
            )
    };

    Plan.loadPlan = () => {
        $('#checklist').empty().html(Plan.checklist);
        $('#to-do-ul').empty().html(Plan.toDoList);
        $('#save-plan-div').hide();
    }

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
      Toothbrush/Toothpaste/Floss</li>
      Shampoo/Conditioner</li>
      Towel</li>
      Soap</li>
      Sunscreen</li>
    </ul>

    <h2>Clothed(Depending on Climate)</h2>
    <ul>
      Underwear</li>
      Socks</li>
      Wool Socks</li>
      T-Shirts</li>
      Thermal or Long Sleeve Shirts</li>
      Sweaters/Sweatshirts</li>
      Hiking Pants/Shorts</li>
      Hiking Boots/Trail Shoes</li>
      Hat/Bandana</li>
      Camp Shoes/Flip-Flop</li>
    </ul>
 
    `
    Plan.newPlan = () => {
        $('#checklist').empty().html(Plan.defaultChecklist)
        $('#to-do-ul').empty();
        $('#save-plan-div').hide();
    }
        
        module.Plan = Plan;
        
        module.Plan = Plan;
    })(window.module);