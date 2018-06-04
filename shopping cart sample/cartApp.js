class Product{

    constructor(id, price){
        this.productId = id;
        this.price = price;
    }
}

/**
 * @param {Product} product
 */
function addProductToCart(product){
    var prods = getItemsFromCart();
    prods.push(product);

    //convert array of products into single string
    var prodString = JSON.stringify(prods);
    console.log(prodString);
    setCookie("ShoppingCart", prodString, 365);
}
/**
 *
 * Gets an array of prodcuts from the cart
 * @returns {array<Product>}
 *
*/
function getItemsFromCart(){
    var cartCookieVal = 
        getCookieValue("ShoppingCart");

    if(cartCookieVal == ""){
        return new Array();
    }

    
    var prods = JSON.parse(cartCookieVal);
    return prods;
}

/**
*
*   returns the number of products in the cart
* @returns {number} Number of products
*
*/

function getNumberOfCartItems(){
    var cartProducts = getItemsFromCart();
    return cartProducts.length;
}