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

timeblocks.forEach((timeblock) => {
    let timeblocksDiv = $('<div>');
    timeblocksDiv.addClass('timeblock');
    containerEl.append(timeblocksDiv);

    let divTime = $('<span>');
    divTime.text(moment().hour(timeblock).minute(0).second(0).format("LT"));
    timeblocksDiv.append(divTime);


    let divInput = $('<input>');
    divInput.addClass('inputText');
    timeblocksDiv.append(divInput);

    let divButton = $('<button>');
    divButton.addClass('saveButton');
    timeblocksDiv.append(divButton);
})

