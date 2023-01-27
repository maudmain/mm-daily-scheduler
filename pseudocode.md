## Daily planner pseudocode

//display the time and date
- CREATE a new file in a new folder and copy the code from the moment.js website
=> use moment.js, add <script> to script.js <script src="./moment.js"></script>
//https://www.youtube.com/watch?v=n80RRNS1k64 

- DISPLAY current date and time when the user open the planner, 
         Create a variable CONST to hold the date and time
       `CONST currentDateTime = moment($('#currendDay')).format('MMMM Do YYYY, h:mm:ss a');`
        - Display in the <p id="currentDay">
        `$('#currentDay').text('currentTime'); `


//create timeblock (?with scroll down), a timeblock for standard business hours (9am-6pm)
- DECLARE const array for time block hours
- FOR EACH 
    //add an input div for each timeblock
    - CREATE an element called blockInput
    - ADD text ('') = empty text
    - ADD data attribute value of the start hour 
    // assuming all divs represent 1hr
    - APPEND to the .container

// create a function to set a color for the timeblocks depending on the time
?? create a set interval timer on document ready to refresh the time every minutes
    get the current time
FOR EACH timeblock check: 
- IF the time is past
    set a color
    ELSE IF the time is present
    set a different color
    ELSE IF the time is future 
    set a different color

//add a save button for each timeblock
FOR EACH <input>
- CREATE an element called SaveButton
- APPEND to the button to the <input>

//save the input in local storage when the save button is clicked
FOR EACH <input>
- CREATE an addEventListener
- STORE the value of the input in local storage
    create an object array with {start hour, text input}
    set
    get (as soon as the page loads)

//