/**
 * 
 * @param {string} cookieName 
 * @param {string} cookieValue 
 * @param {number} daysTilExpire 
 */
function setCookie(cookieName, 
                cookieValue, daysTilExpire){

    cookieValue = encodeURIComponent(cookieValue);
    
    //get today's date and time on client machine
    var eDate = new Date();
    eDate.setDate(eDate.getDate() + daysTilExpire);
    var expDate = eDate.toUTCString();

    /*MAKE SURE TO ADD EXPIRES!!!*/
    document.cookie = 
        `${cookieName}=${cookieValue};expires=${expDate};`;
}

/**
 * 
 * @param {string} cookieName 
 */
function getCookieValue(cookieName){
    var name = cookieName + "=";
    var allCookies = document.cookie;

    console.log(allCookies);

    var cookieAttributes = 
        allCookies.split(";");

    for(var i = 0; i < cookieAttributes.length; i++){
        var currAttr = cookieAttributes[i].trim();

        //check if cookie name is current attr
        if(currAttr.indexOf(name) == 0){
            //ex. (UserData=Joe's Data;)
            //start after the cookie name, to grab 
            //the cookie value
            var cValue = 
                currAttr.substring(name.length);
            return decodeURIComponent(cValue);
        }
    }

    return ""; //cookie not found
}