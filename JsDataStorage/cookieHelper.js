
/**
 * 
 * @param {string} cookieName 
 * @param {string} cookieValue 
 * @param {number} daysTilExpire 
 */
function setCookie(cookieName, 
                cookieValue, daysTilExpire){

    //get today's date and time on client machine
    var eDate = new Date();
    eDate.setDate(eDate.getDate() + daysTilExpire);
    var expires = eDate.toUTCString();

    /*MAKE SURE TO ADD EXPIRES!!!*/
    document.cookie = 
        `${cookieName}=${cookieValue};expires=${expires};`;
}

/**
 * 
 * @param {string} cookieName 
 */
function getCookieValue(cookieName){
    var name = cookieName + "=";

    var decodedCoookies = decodeURIComponent(document.cookie);
    console.log(decodedCoookies);
    var cookieAttr = decodedCoookies.split(";");
    
    for (var i = 0; i < cookieAttr.length; i++){
        var currAttr = cookieAttr[i].trim;
        // check if cookie name is current attr
        if (currAttr.indexOf(name) == 0)
        {
            // ex (userdata = joes data;)
            // name is userdata .... the rest is what will be returned.
            // starts after the cookie name to grab cookie value
            return currAttr.substring(name.length)
        }
    }
    return "", // cookie not found
}