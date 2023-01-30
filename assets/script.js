//global variables
const containerEl = $('.container');
let today = moment();
let newTimeblocks = [];


// we need to retrieve the textarea input from local storage (JSON.parse the string representation of the array)
let recordArray = JSON.parse(window.localStorage.getItem("records")) ?? [];

//create a function to check if any data stored localy for the input
function searchSchedule(startHour, endHour){
    return recordArray.findLast((record) => startHour.isSame(record.startHour) && endHour.isSame(record.endHour));
 }
//display element from the recorArray



// display the current time with a setInterval 
$(document).ready(function () {
    setInterval(function () {
        today = moment();
        $("#currentDay").text(today.format('Do MMMM YYYY, h:mm:ss a'));
        colorTimeblock();
    },
        1000);
});

// create timeblocks
//create a form element to hold all timeblocks
let formEl = $('<form>');
formEl.addClass('form');
containerEl.append(formEl);

// create an array for the hours
//assuming one timeblock represents one hour
const timeblocks = [
    9, 10, 11, 12, 13, 14, 15, 16
];

//create a new array with start and end time for timeblocks
newTimeblocks = timeblocks.map(timeblock => {
    return {
        startHour: moment().hour(timeblock).startOf("hour"),
        endHour: moment().hour(timeblock +1).startOf("hour"),
    }
});
console.log(newTimeblocks);

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
});


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


// // event listener for save button with nexted local storage function
$('.saveBtn').on('click', function (event) {
    //prevent the default behaviour
    event.preventDefault();
  
    //for each timeblock, save the input value into local storage
    // variable to target the sibling textarea of the save button 
    let inputField = $(event.target).siblings("textarea").val();
    console.log(inputField);
    
    // store the index of the timeblock from the timeblocks
    let timeblockDiv = $(event.target).parent(".timeblock");
    let timeblockIndex = timeblockDiv.attr("data-index");

    // create a new object containing the start, end hour and the input text. Push to global recordArray 
    const newTimeblock = newTimeblocks[timeblockIndex]; 
    let record = {...newTimeblock, description: inputField};
    console.log(record);
    recordArray.push(record);
    localStorage.setItem("records", JSON.stringify(recordArray));
    

});


// clear the page at the end of the day
// localStorage.clear();

