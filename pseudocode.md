## Daily planner pseudocode

//display the time and date
=> use moment.js, add `<script> <link>`

- DISPLAY current date and time when the user open the planner, 
         Create a variable CONST to hold the date and time
        - Display in the `<p id="currentDay">`
        create a set interval timer on document ready to refresh 


//create timeblock (?with scroll down), a timeblock for standard business hours (9am-5pm)
- DECLARE const array for time block hours
- create a `<form>`, append to .container
- FOR EACH 
    //add an input div for each timeblock
    - CREATE an element called blockInput
    - ADD text ('') = empty text
    - ADD data attribute value of the start hour 
    // assuming all divs represent 1hr
    - APPEND to the `<form>`
    //add a save button for each timeblock
FOR EACH `<input>`
    - CREATE an element called SaveButton
    - APPEND to the button to the `<input>`

// create a function to set a color for the timeblocks depending on the time
    - get the current time
FOR EACH timeblock check: 
- IF the time is past
    set a color
    ELSE IF the time is present
    set a different color
    ELSE IF the time is future 
    set a different color

//save the input in local storage when the save button is clicked
FOR EACH `<input>`
- CREATE an addEventListener
- STORE the value of the input in local storage
    create an object array with {start hour, text input}
    set
    get (as soon as the page loads)

//