//declare var $: any;
$(function () {
    $("#calculate").click(main);
    $("#clear").click(function () {
        $("#form")[0].reset();
    });
    $("#miles, #gallons").dblclick(function () {
        $(this).val("");
    });
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * Checks if form data is valid
 * @returns {boolean} Returns true is all data is valid on the form, or false is something is invalid
 */
function isValid(miles, gallons) {
    //fire when button is clicked
    var isValid = true; //flag variable
    if (!isDataValid(miles)) {
        isValid = false;
        $("#miles").next().html("<br> You forgot to tell us how many miles you drove!");
    }
    if (!isDataValid(gallons)) {
        isValid = false;
        $("#gallons").next().html("<br> We need to know how many gallons of gas you used!");
    }
    return isValid;
}
function isDataValid(inputElemId, errMsg) {
    /* ALL TESTING FAILURES
    //let trigger:number = inputElemId;
    //if (isNaN(trigger)){
    //    return false;
    // }
    //else{
    //    return true;
    //}
    //let regexp = new RegExp('^[0-9]$');
    //let test = regexp.test(trigger);
    //alert(test + ""); // will display true

    //let expression:RegExp = /\d{1,}$/;
    //return true;
    */
    var expression = /\d{1,}$/;
    return expression.test(inputElemId);
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * This function should be called when the calculate button is clicked
*/
function main() {
    var miles = parseFloat(document.getElementById("miles").value);
    //var miles: HTMLInputElement =  <HTMLInputElement>document.getElementById("miles");  //FAIL
    //var miles = parseFloat(document.getElementById("miles").val);  //FAIL
    //let miles = document.getElementById('miles').innerHTML;  //FAIL
    //let gallons = document.getElementById("gallons"); //FAIL
    var gallons = parseFloat(document.getElementById("gallons").value);
    //alert(miles);   TESTING SAKE
    //alert(gallons); TESTING SAKE
    resetErrors();
    if (isValid(miles, gallons)) { //if data is valid
        var milesPerGallon = calculateMPG(miles, gallons); //calculate MPG
        displayResults(milesPerGallon); // display the results    
    }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * Displays given MPG on the form
 * @param {number} milesPerGallon String or number containing the miles per gallon
 */
function displayResults(milesPerGallon) {
    var mpgBox = document.getElementById("mpg");
    mpgBox.value = milesPerGallon.toFixed(2);
    //document.getElementById("mpg").disabled = false;
    //document.getElementById("mpg").value = milesPerGallon;
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * Calculates miles per gallon
 * @param {string|number} milesDrive The number of miles driven
 * @param {string|number} gallonsUsed The number of gallons used
 */
function calculateMPG(milesDrive, gallonsUsed) {
    var mpg = milesDrive / gallonsUsed; //calculate MPG
    return mpg;
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//TODO: Add a function to Miles Driven and Gallons of gas used to clear out the inputs
//      They can clear out both textboxes or just the textbox that triggers the double click event
// Reset all error messages on the form
function resetErrors() {
    resetInputError("miles");
    resetInputError("gallons");
}
function resetInputError(inputElemId) {
    $("#" + inputElemId).next().text("*");
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
