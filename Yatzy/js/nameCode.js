var diceImage = ["die1.jpg", "die2.jpg","die3.jpg", "die4.jpg", "die5.jpg", "die6.jpg"];
var player2Name;
var player3Name;
var player4Name;
var players;
var namesArray = [];
var categoryArray = [];
var scoreTotal = 0;
var playerScoreTotal = [];
var playerArray = [];
var totalArray = [];
var playersTurn = 0;
var dieRoll = 0;

// onload preperation
// currently functioning as designed below
window.onload = function(){
    // following is to cut down on move die functions to 1 instead of 5
    var buttons = document.getElementsByClassName("die");
    var buttonsCount = buttons.length;
    for (var i = 0; i <= buttonsCount-1; i++) {
        buttons[i].onclick = function(e) {
            moveDie(this.id);
        };
    }

// /\/\/\/\/\/\/\  the get die  source function

}

// next step asking the user for their name
// currently functioning as designed below
var type = 0;
var speed = 10; //change back to 75 when done 10 is for testing sake
function typeWriter() {

    userName = document.getElementById("mainUserName").value.toUpperCase(); 
    var txt = "Do you want to play YATZY " + userName + " ?";
    document.getElementById("yourName").setAttribute("hidden", true);
    document.getElementById("doYou").removeAttribute("hidden");

    if (type < txt.length) {
    document.getElementById("doYou").innerHTML += txt.charAt(type);
    type++;
    setTimeout(typeWriter, speed);
    }

    else{
        document.getElementById("yesNoButton").removeAttribute("hidden");
    }

}

// next step is to verify username was input
// currently functioning as designed below
function verifyUserName(){

    if(document.getElementById("mainUserName").value.length < 1){
        document.getElementById("mainUserName").placeholder = "Enter Your Name";
    }
    else{
        typeWriter();
    }
}

// redirecting step asking if they want to play yatzy or redirect ot google.
// currently functioning as designed below
function redirect(){
    location.href = "http://www.google.com";
}

function loadGame(){
    document.getElementById("howMany").removeAttribute("hidden");
    document.getElementById("toPlay").setAttribute("hidden", true);
}
// asks how many players want to play
// currently functioning as designed below
function choose(choice){
    players = choice;
    playerName(players);
    document.getElementById("howMany").setAttribute("hidden", true);
}

// preps for how many players are to play
// currently functioning as designed below
function playerName(players){
    switch (players)
    {
        case "2":
            document.getElementById("playerTwoName").removeAttribute("hidden");
            break;
        
        case "3":
            document.getElementById("playerTwoName").removeAttribute("hidden");    
            document.getElementById("playerThreeName").removeAttribute("hidden");
            break;

        case "4":
            document.getElementById("playerTwoName").removeAttribute("hidden");    
            document.getElementById("playerThreeName").removeAttribute("hidden");
            document.getElementById("playerFourName").removeAttribute("hidden");
            break;
        
        default:
            addPlayerNames();
            document.getElementById("sendNames").removeAttribute("hidden");
            break;
    }
    document.getElementById("sendNames").removeAttribute("hidden");
}

// get and add player names
// currently functioning as designed below
function addPlayerNames(){

    player2Name = document.getElementById("playerTwoName").value.toUpperCase();
    player3Name = document.getElementById("playerThreeName").value.toUpperCase();
    player4Name = document.getElementById("playerFourName").value.toUpperCase();

    namesArray = [userName, player2Name, player3Name, player4Name];
    playerArray = ["", "playerTwoName", "playerThreeName", "playerFourName"];
    var valid = true;
    for (let index = 1; index < players; index++) {
        if(verifyNames(namesArray[index]) == false){
            document.getElementById(playerArray[index]).placeholder = "Enter A Name";
            valid = false;
        }
    }

    if(valid == true){
        document.getElementById("playerNames").setAttribute("hidden", true);
        makeScoreCard(players);
    } 
}

// verifies player names 
// currently functioning as designed below
function verifyNames(inputBox){
    if(inputBox.length >= 1){
        return true;
    }
    else{
        return false;
    }
}

// makes the score card on screen with player names 
// currently functioning as designed below
function makeScoreCard(players){
    document.getElementById("scoreCard").removeAttribute("hidden"); // make score card here
    document.getElementById("diced").removeAttribute("hidden");
    document.getElementById("hold").removeAttribute("hidden");
    document.getElementById("roll").removeAttribute("hidden");
    var howManyPlayers = document.getElementById("howManyPlayers");
    var scoreboxes = 24;
    categoryArray = ["Player","Upper Section", "Aces", "Twos","Threes","Fours","Fives","Sixes","Total Score","Bonus",
            "Total","Lower Section","Full House", "3 of a kind","4 of a kind","Small Straight","Large Straight","Yatzy","Chance","Double Yatzy","Lower Total",
            "Upper Total","Grand Total"];
    
    for(var g = 0; g < players; g++){
        var playerTxt = document.createTextNode(namesArray[g]);
        for (var i = 0; i < scoreboxes-1; i++) {
            var th = document.createElement("th");
            var text = document.createTextNode("");
            var category = document.getElementById(categoryArray[i]);
            th.id = categoryArray[i] + " player " + (g+1);
            if(i == 0 ){
                th.appendChild(playerTxt);
                th.style.padding="10px";
            }
            else{
                th.appendChild(text);
                th.style.padding ="2px";
            }
            category.appendChild(th);          
        }
    }
    
    
    //loop to make the code to change colors 
    for(var colorChange = 0; colorChange < 4; colorChange++ ){

    }
    document.getElementsByClassName("col" + playersTurn).style.backgroundColor = "white";
}

// is the roll dice function
function rollDice(){
    if(dieRoll == 0){
        document.getElementById("die1").removeAttribute("hidden");
        document.getElementById("die2").removeAttribute("hidden");
        document.getElementById("die3").removeAttribute("hidden");
        document.getElementById("die4").removeAttribute("hidden");
        document.getElementById("die5").removeAttribute("hidden");
    }
    if(dieRoll < 3){    
    
        //create a random integer between 0 and 5
        var randomdice1 = Math.round(Math.random()*5);
        var randomdice2 = Math.round(Math.random()*5);
        var randomdice3 = Math.round(Math.random()*5);
        var randomdice4 = Math.round(Math.random()*5);
        var randomdice5 = Math.round(Math.random()*5) ;
        var randomdice6 = Math.round(Math.random()*5) ;
    
        document.getElementById("die1").src="images/"+diceImage[randomdice1];
        document.getElementById("die2").src="images/"+diceImage[randomdice2];
        document.getElementById("die3").src="images/"+diceImage[randomdice3];
        document.getElementById("die4").src="images/"+diceImage[randomdice4];
        document.getElementById("die5").src="images/"+diceImage[randomdice5];
        dieRoll++;
    }
}

function hold(){
    getdies();
}

function turnScore(dieScore){
    dieScore.sort();
    var scoresString = dieScore.join('');
    var uniqueNums = [];
    $.each(dieScore, function(i, el){
        if($.inArray(el, uniqueNums) === -1) uniqueNums.push(el);
    });
    
    var uniqueScores = uniqueNums.join('');
        
    var threeOfKind = false;
    var kind3Total = 0;
    threeOfKind = /(\d{1})\1\1/.test(scoresString);
    if(threeOfKind == true){
        
        for(kind3 = 0; kind3 < 5; kind3++){
            kind3Total += dieScore[kind3];
        }
        alert("three of kind");
        alert(kind3Total);
    }


    var fourOfKind = false;
    var kind4Total = 0;
    fourOfKind = /(\d{1})\1\1\1/.test(scoresString);
    if(fourOfKind == true){
        for(kind4 = 0; kind4 < 5; kind4++){
            kind4Total += dieScore[kind4];
        }
        alert("four of kind");
        alert(kind4Total);
    }

    // not working yet
    var fullHouse = false;
    fullHouse = /(\d{1})\1/.test(scoresString) && /(\d{1})\1\1/.test(scoresString);
    if(fullHouse == true){
        alert("FUll HOUSE");
    }

    var yatzyScore = false;
    if(uniqueScores.length == 1){
        alert("yatzy");
    }

    var smallS = false;
    if(uniqueScores == "1234" || uniqueScores == "2345" || uniqueScores == "3456" ){
        smallS = true;
    }
    if (smallS == true) {
       // var ss = document.getElementById("Small Straight " + player);
       // var ssInfo = document.createTextNode("40");
       // ss.appendChild(ssInfo);alert("Small Straight");
        alert("Small Straight");
    }

    var largeS = false;
    if(uniqueScores == "12345" || uniqueScores == "23456"){
        largeS = true;
    }
    else if (largeS == true) {
        //var ls = document.getElementById("Large Straight " + player);
        //var lsInfo = document.createTextNode("40");
        //ss.appendChild(ssInfo);alert("Large Straight");
        alert("large straight");
    }
    // chance section of scoring working as coded needs to append to score board

    var chance = true;
    var chanceTotal = 0;
    if(chance == true){
        for(chanceLoop = 0; chanceLoop < 5; chanceLoop++){
            chanceTotal += dieScore[chanceLoop];
        }
        //var chanceLocation = document.getElementById("Chance player " + player);
        //var chanceInfo = document.createTextNode(chanceTotal);
        //chanceLocation.appendChild(chanceInfo);
        // alert(chanceTotal); calculates just needs to insert score 
    }
    
    playerTurn();
}


// get the dies for diescore and makes an array of the dice rolled

function getdies(){
    var dieSource = [document.getElementById("keptdie1").src, document.getElementById("keptdie2").src,document.getElementById("keptdie3").src,
                     document.getElementById("keptdie4").src, document.getElementById("keptdie5").src];
    var dieScore = [];
    for (let die = 0; die < dieSource.length; die++) {
        if(dieSource[die] == "http://127.0.0.1:5500/Yatzy//images/die1.jpg"){
            dieScore[die] = 1;
        }    
        if(dieSource[die] == "http://127.0.0.1:5500/Yatzy/images/die2.jpg"){
            dieScore[die] = 2;
        }    
        if(dieSource[die] == "http://127.0.0.1:5500/Yatzy/images/die3.jpg"){
            dieScore[die] = 3;
        }    
        if(dieSource[die] == "http://127.0.0.1:5500/Yatzy/images/die4.jpg"){
            dieScore[die] = 4;
        }    
        if(dieSource[die] == "http://127.0.0.1:5500/Yatzy/images/die5.jpg"){
            dieScore[die] = 5;
        }    
        if(dieSource[die] == "http://127.0.0.1:5500/Yatzy/images/die6.jpg"){
            dieScore[die] = 6;
        }    
    }
    // dieScore contains the 5 dies held
    // alert(dieScore);
    turnScore(dieScore);
}

// sets the player whos turn it is to white 
// currently functioning as designed below
function setColor(playersTurn)
{   
    document.getElementsByClassName("col" + playersTurn).style.backgroundColor = "white"
    //document.getElementById("Player player" + playersTurn).style.backgroundColor = "white";
}
// sets the player whos turn it was back to none  
// currently functioning as designed below
function removeColor(playersTurn)
{   
    //document.getElementsByClassName("col " + playersTurn) ById("Player player" + playersTurn).removeAttribute(style);
}

// changes which players turn it is for score and for indicator
function playerTurn(){
    alert("player changed");    
    removeColor(playersTurn);
    setScore(playersTurn);
    if(playersTurn == 3){
        playersTurn = 1;
    }
    else{
        playersTurn ++;
    }
   
    setColor(playersTurn);
    dieRoll = 0;


}

// needs finished
function setScore(playersTurn){
    // need to set the score that is clicked to the actual box and delete the other possible ones 
}

function moveDie(id){
    var keptdie;
    if(id.startsWith("die")){
        keptdie = "kept" + id;
    }
    else{
        keptdie = id;
    }
    
    var die = id;
  
    var held = document.getElementById(die).getAttribute("data-held");
    var dataHeld = document.getElementById(keptdie).getAttribute("data-held");
  
    if (held == null){
        document.getElementById(keptdie).src = document.getElementById(id).src;
        document.getElementById(id).setAttribute("hidden", true);
        document.getElementById(keptdie).setAttribute("data-held", true);
        document.getElementById(keptdie).removeAttribute("hidden");
        
    }
    if(dataHeld == "true"){
        //alert(die);
        if(die.startsWith("kept")){
            die = die.replace("kept", "");
        }
        document.getElementById(die).src = document.getElementById(keptdie).src;
        console.log(die);
        //alert("WORKS");
        document.getElementById(die).removeAttribute("hidden");
        //alert("dont work");
        document.getElementById(keptdie).setAttribute("hidden", true);
        document.getElementById(keptdie).removeAttribute("data-held");
        
    }
}


function gameOver(){
    for (let upperLoop = 0; index < players; upperLoop++) {
        var playerUpperScore = tallyScoreUpper();      
        document.getElementById("Total Score player " + upperLoop).value = playerUpperScore;    
           
        if(playerUpperScore >= 63){
            document.getElementById("Total player " + upperLoop).value = playerUpperScore + 35;    
            document.getElementById("Bonus player " + upperLoop).value = 35;    
        }
        else{
            document.getElementById("Total player " + upperLoop).value = playerUpperScore;    
            document.getElementById("Bonus player " + upperLoop).value = 0;    
        }
        
        document.getElementById("Upper Total player " + upperLoop).value = document.getElementById("Total player " + upperLoop).value;  
        
        var playerLowerScore = tallyScoreLower();
        document.getElementById("Total Total player " + upperLoop).value = playerLowerScore;    
        
        var playerTotalScore = tallyScoreUpper(playerLowerScore, playerUpperScore);
        document.getElementById("Grand Total player " + upperLoop).value = playerTotalScore;    
    }  
    userTotal = document.getElementById("Grand Total player 1").value;    
    player2Total = document.getElementById("Grand Total player 2").value;    
    player3Total = document.getElementById("Grand Total player 3").value;    
    player4Total = document.getElementById("Grand Total player 4").value;    
    totalArray = [userTotal, player2Total, player3Total, player4Total];
    whoWon(totalArray);
    //
    // want to add this line of code in to have a reset button when game is won
    // <input type="button" value="Reload Page" onClick="document.location.reload(true)">
    // winner screen
    
}
function tallyScoreUpper(){
    
    /*for (let playerCount = 1; playerCount < players; playerCount++) {
        for(var getScore = 2; getScore < 8; getScore++){
            scoreTotal = scoreTotal + parseInt(document.getElementById((categoryArray[getScore] + " player " + playerCount).value));
        }    
    } // prints a 0 at current fix the loop mess
    alert(scoreTotal); // for testing sake*/
    return 10; //upperScoreTotal;
}
function tallyScoreLower(){

    return 25; // lowerScoreTotal;
}

function tallyScoreTotal(upper, lower){
    var total = upper + lower;
    return total;
}

function whoWon(totalArray){
    document.getElementById("main").setAttribute("hidden", true);
    document.getElementById("winners").removeAttribute("hidden");
    if(players >= 1){
        document.getElementById("winners").removeAttribute("hidden");
        document.getElementById("if").removeAttribute("hidden");
        document.getElementById("winner").value = userTotal;
    }
    if(players >=2){
        document.getElementById("if2").removeAttribute("hidden");
        if (userTotal > player2Total){
            document.getElementById("winner").value = userTotal;
        }
        else{
            document.getElementById("winner").value = player2Name;
        }
    }

    // array
    // copy array
    // sort copy
    // if copy[i] = array
    //  then player[i] is in place [i]

    if(players >= 3){
        document.getElementById("if3").removeAttribute("hidden");
        // finish
        
    }
    if(players == 4){
        document.getElementById("if4").removeAttribute("hidden");
        // finish

    }
// need to figure out how i want to determine the order of win
    var clone = totalArray.slice(0);
    clone.sort();
    for (let order = 0; order < players; order++) {
        for (let ordercomp = 0; ordercomp < players; ordercomp++) {
            if(totalArray[order] = clone[ordercomp]){
                var winner = totalArray[order];            
            }
            
        }
    }
    
    
    var second;
    var third;
    var fourth;
    
    //for (let winner = 0; index < players; index++) {
        
    //}
    
}

// to do list
// make a box to show whos turn it is each turn
// make game code
// clean code
// design game better visually
// fix monitor size issues.
// commit up more 
// 2 arrays to sort and determine score winner??
/*

load                                X
what is your name                   X
validate a name was inputted        X
do you want to play                 X
    if not redirect to google       X
if so then how many players         X
enter player names                  X
validate player names               X
make score card                     X
player turn                         X
    roll                            X
    hold                            X
    scores figure out
    update score
    change player

when game over
    score lower total
    score upper total
    game total 
    winner screen

*/


