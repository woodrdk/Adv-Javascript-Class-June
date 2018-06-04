$(function(){
    
    $("#member_form").submit(
        submitFormIfValid()
    );
    // or $("#member_form").submit(submitFormIfValid());

    $("#reset").click(
        function(){
            // method 1 to reset form next line
            //(<HTMLFormElement>document.getElementById("member_form")).reset();
            
            //method 2 next line
            let resetButton:HTMLFormElement = <HTMLFormElement>document.getElementById("member_form");
            resetButton.reset();

            // method 3 using jquery
            (<JQuery<HTMLFormElement>>$("#member_form").reset(); // using jquery
        }
    )
});

function submitFormIfValid(): false | JQuery.EventHandler<HTMLElement, null> | JQuery.EventHandlerBase<any, JQuery.Event<HTMLElement, null>> {
    return function (evt) {
        let isValid: boolean = true;
        //validate required fields
        if (!doesTextBoxHaveData("#email", "Email is required")) {
            isValid = false;
        }
        if (!doesTextBoxHaveData("#first_name", "First name is required")) {
            isValid = false;
        }
        //prevent submission if there is invalid data
        if (!isValid) {
            evt.preventDefault();
        }
    };
}

/**
 * doesTextBoxHaveData checks that the textbox has data, if it does not an error message is displayed 
 * in the sibling element for that textbox.
 * @param elementId id of textbox element, ex. #myElement
 * @param errMsg Message to display in the next sibling element
 */

 function doesTextBoxHaveData(
    elementId:string, errMsg:string):boolean{
    
    let data:string =
        $(elementId).val().toString().trim();

    if(data == ""){
        $(elementId).next().text(errMsg);
        return false;
    }
    return true;
}

function isValidPhone(phone: string):boolean{

    phone = phone.replace("(","")
                 .replace(")","")
                 .replace("-","")
                 .replace(" ","");
    if(isNaN(parseInt(phone))){
        return false;
    }
    return true;

}