//global variables
const containerEl = $('.container');
let today = moment();
let newTimeblocks = [];



// display the current time with a setInterval 
$(document).ready(function () {
    setInterval(function () {
        today = moment();
        $("#currentDay").text(today.format('Do MMMM YYYY, h:mm:ss a'));
    },
        1000);
});

//function to run when loading the page


//function loadData

// create timeblocks
//create a form element to hold all timeblocks
let formEl = $('<form>');
formEl.addClass('form')
containerEl.append(formEl)

// create an array for the hours
//assuming one timeblock represents one hour
const timeblocks = [
    9, 10, 11, 12, 13, 14, 15, 16
];

//create a new array with start and end time for timeblocks
newTimeblocks = timeblocks.map(timeblock => {
    return {
        startHour: moment().hour(timeblock).minute(0).second(0),
        endHour: moment().hour(timeblock).minute(59).second(0),
    }
});
console.log(newTimeblocks);

// forEach loop to create the elements, add the boostrap classes and append to the parent element

newTimeblocks.forEach((timeblock, index) => {
    let timeblocksDiv = $('<div>');
    timeblocksDiv.addClass('row rounded my-3 timeblock');
    timeblocksDiv.attr("data-index", index)
    formEl.append(timeblocksDiv);

    let divTime = $('<span>');
    divTime.addClass('col-2 border rounded-left text-center text-nowrap ');
    divTime.text(timeblock.startHour.format("LT"));
    timeblocksDiv.append(divTime);

    let divInput = $('<textarea>');
    divInput.addClass('inputText border-0 col-9 bg-transparent ');
    timeblocksDiv.append(divInput);

    let divButton = $('<button>');
    divButton.addClass('btn btn-primary col-1 fas fa-save saveBtn');
    timeblocksDiv.append(divButton);
})


// console.log(newTimeblocks)


// function to check each timeblock against the current time and set a colour (past/present/future)
function colorTimeblock() {
    $(".timeblock").each((index, element) => {
    let timeblockIndex = element.dataset.index;
    console.log(typeof timeblockIndex);

    const newTimeblock = newTimeblocks[timeblockIndex];
    // past = if current time is after the endTime
    if (moment(today).isAfter(newTimeblock.endHour)) {
        $(element).addClass('past');
    }
    //is between startTime and endTime
    else if (moment(today).isBetween(newTimeblock.startHour, newTimeblock.endHour)) {
        $(element).addClass('present');
    }
    // the rest of the hours should be future
    else {
        $(element).addClass('future');
    };
})
};
colorTimeblock();

// // event listener for save button
$('.saveBtn').on('click', function (event) {
    event.precentDefault();
    //add the input text into the newTimeblocks array
    let input

    localStorage.setItem
})


//local strorage

