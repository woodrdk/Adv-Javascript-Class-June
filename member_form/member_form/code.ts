
// typescript file for member form

$(function(){
    $("#member_form").submit(
        function(evt){
            let isValid:boolean = true;
            
            //vakudate required fields
            if (!checkTextBoxIsValid("#email", "Email is required")){
                isValid = false;
            }
            
            if (!checkTextBoxIsValid("#first_name", "First name is required")){
                isValid = false;
            }

            // prevent submission if there is invalid data
            if(!isValid){
                evt.preventDefault();
            }

        }
    )
});

function checkTextBoxIsValid(elementId: string, errorMessage:string):boolean{
    let data: string = $(elementId).val().toString().trim();

    if(data ==""){
        $(elementId).next().text(errorMessage);
        return false;
    }
    return true;

}

