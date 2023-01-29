//global variables
const containerEl = $('.container');


// display the current time with a setInterval 
$(document).ready(function () {
    setInterval(function () {
        const today = moment();
        $("#currentDay").text(today.format('Do MMMM YYYY, h:mm:ss a'));
    },
        1000);
});

// create timeblocks

//create a form element to hold all timeblocks
let formEl= $('<form>');
formEl.addClass('form')
containerEl.append(formEl)

// create an array for the hours
//assuming one timeblock represents one hour
const timeblocks = [
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16
];

// forEach loop to create the elements, add the boostrap classes and append to the parent element
timeblocks.forEach((timeblock) => {
    let timeblocksDiv = $('<div>');
    timeblocksDiv.addClass('row border rounded ');
    formEl.append(timeblocksDiv);

    let divTime = $('<span>');
    divTime.addClass('col-2 text-center ')
    divTime.text(moment().hour(timeblock).minute(0).second(0).format("LT"));
    timeblocksDiv.append(divTime);

    let divInput = $('<input>');
    divInput.addClass('inputText col-9 ');
    timeblocksDiv.append(divInput);

    let divButton = $('<button>');
    divButton.addClass('btn btn-primary col-1  text-center');
    divButton.text('Save')
    timeblocksDiv.append(divButton);
})

