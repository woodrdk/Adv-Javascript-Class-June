$(function () {
    $("#member_form").submit(function (evt) {
        var isValid = true;
        if (!checkTextBoxIsValid("#email", "Email is required")) {
            isValid = false;
        }
        if (!checkTextBoxIsValid("#first_name", "First name is required")) {
            isValid = false;
        }
        if (!isValid) {
            evt.preventDefault();
        }
    });
});
function checkTextBoxIsValid(elementId, errMsg) {
    var data = $(elementId).val().toString().trim();
    if (data == "") {
        $(elementId).next().text(errMsg);
        return false;
    }
    return true;
}
