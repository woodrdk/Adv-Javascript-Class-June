
let pigGame = new Game(25);

window.onload = function(){
    document.getElementById("roll").onclick = roll;
    document.getElementById("pass").onclick = passTurn;
}

/**
 * when the user clicks the roll button
 */
function roll(){
    pigGame.rollDie();
}

/**
 *  when the user clicks pass turn
 */
function passTurn(){
    alert("PASSED"); 
}