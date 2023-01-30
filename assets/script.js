// global variables
const containerEl = $('.container');
let today = moment();
let newTimeblocks = [];

// we need to retrieve the textarea input from local storage (JSON.parse the string representation of the array)
let recordArray = JSON.parse(window.localStorage.getItem("records")) ?? [];

// create a form element to hold all timeblocks
let formEl = $('<form>');
formEl.addClass('form');
containerEl.append(formEl);

// create an array for the hours
// assuming one timeblock represents one hour
const hours = [
    9, 10, 11, 12, 13, 14, 15, 16
];

// to initialise the page without delay, handle the interval callback
function timerTick() {
    today = moment();
    $("#currentDay").text(today.format('Do MMMM YYYY, h:mm:ss a'));
    colorTimeblock();
}

// create a function to check if any data stored localy for the input
// it will check the arrays matching the timeblocks parameters and find for the last entry made to localStorage 
function searchSchedule(startHour, endHour) {
    return recordArray.findLast((record) => startHour.isSame(record.startHour) && endHour.isSame(record.endHour));
}

// display the current time with a setInterval and run the color render
$(document).ready(function () {
    setInterval(timerTick, 1000);
    timerTick();
})

// create timeblocks
//create a new array with start and end time for timeblocks
newTimeblocks = hours.map(timeblock => {
    return {
        startHour: moment().hour(timeblock).startOf("hour"),
        endHour: moment().hour(timeblock + 1).startOf("hour"),
    }
})

// forEach loop to create the elements, add the boostrap classes and append to the parent element
newTimeblocks.forEach((timeblock, index) => {
    let timeblocksDiv = $('<div>');
    timeblocksDiv.addClass('row rounded my-3 timeblock');
    timeblocksDiv.attr("data-index", index);
    formEl.append(timeblocksDiv);

    let divTime = $('<span>');
    divTime.addClass('col-2 border rounded-left text-center text-nowrap ');
    divTime.text(timeblock.startHour.format("LT"));
    timeblocksDiv.append(divTime);

    let divInput = $('<textarea>');
    divInput.addClass('inputText border-0 col-9 bg-transparent ');
    divInput.text(searchSchedule(timeblock.startHour, timeblock.endHour)?.description ?? '');
    timeblocksDiv.append(divInput);

    let divButton = $('<button>');
    divButton.addClass('btn btn-primary col-1 fas fa-save saveBtn');
    timeblocksDiv.append(divButton);
})

// function to check each timeblock against the current time and set a colour (past/present/future)
function colorTimeblock() {
    $(".timeblock").each((index, element) => {
        let timeblockIndex = element.dataset.index;

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
}

// event listener for save button with nexted local storage function
$('.saveBtn').on('click', function (event) {
    //prevent the default behaviour
    event.preventDefault();

    //for each timeblock, save the input value into local storage
    // variable to target the sibling textarea of the save button 
    let inputField = $(event.target).siblings("textarea").val();

    // store the index of the timeblock from the timeblocks
    let timeblockDiv = $(event.target).parent(".timeblock");
    let timeblockIndex = timeblockDiv.attr("data-index");

    // create a new object containing the start, end hour and the input text. Push to global recordArray 
    const newTimeblock = newTimeblocks[timeblockIndex];
    let record = { ...newTimeblock, description: inputField };
    recordArray.push(record);
    localStorage.setItem("records", JSON.stringify(recordArray));
})
