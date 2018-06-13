
var diceImage = ["die1.jpg", "die2.jpg","die3.jpg", "die4.jpg", "die5.jpg", "die6.jpg"]; // array of image code for the dice images
var player2Name;        // player 2s name inputted in the text box
var player3Name;        // player 3s name inputted in the text box
var player4Name;        // player 4s name inputted in the text box
var players;            // how many players
var namesArray = [];    // array of the players names
var categoryArray = []; // array containing the names of the categories of scoring
var scoreTotal = 0;     // score total ? not sure if used at present
var playerScoreTotal = [];  // player score total array containing all players scores
var playerArray = [];   
var totalArray = [];
var playersTurn = 1;    // which players turn it is 1 - 4
var dieRoll = 0;        // how many rolls have been made
var playersTurnCount = 0;   // total players turns made to count for the game ending

/////////////////////// scores for the single digits 1 - 6
var chanceTotal = 0;   
var onesTotal = 0;
var twosTotal = 0;
var threesTotal = 0;
var foursTotal = 0;
var fivesTotal = 0;
var sixesTotal = 0;

            // onload preperation
window.onload = function(){
    // following is to cut down on move die functions to 1 instead of 5
    var buttons = document.getElementsByClassName("die");
    var buttonsCount = buttons.length;
    for (var i = 0; i <= buttonsCount-1; i++) {
        buttons[i].onclick = function(e) {
            moveDie(this.id);
        };
    }
}
            // next step asking the user for their name
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
function verifyUserName(){
    if(document.getElementById("mainUserName").value.length < 1){
        document.getElementById("mainUserName").placeholder = "Enter Your Name";
    }
    else{
        typeWriter();
    }
}

            // redirecting step asking if they want to play yatzy or redirect ot google.
function redirect(){
    location.href = "http://www.google.com";
}

function loadGame(){
    document.getElementById("howMany").removeAttribute("hidden");
    document.getElementById("toPlay").setAttribute("hidden", true);
}
            // asks how many players want to play
function choose(choice){
    players = choice;
    playerName(players);
    document.getElementById("howMany").setAttribute("hidden", true);
}

            // preps for how many players are to play
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
function verifyNames(inputBox){
    if(inputBox.length >= 1){
        return true;
    }
    else{
        return false;
    }
}

            // makes the score card on screen with player names 
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
            th.classList.add("scoresCenter");
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
    document.getElementById("col" + playersTurn).style.backgroundColor = "white";
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
    if(dieRoll == 3){
       // make last dice not held HELD TODO TODO TODO TODO
    }
}

function hold(){
    getdies();   
    document.getElementById("scoreButtons").removeAttribute("hidden");
    Points();

}

function Points(){
    var x = document.querySelectorAll(".Points");
    for (var i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "red";
        x[i].style.color = "white";
    }
}

///// need this to work
function removePoints(){
    var y = document.querySelectorAll(".Points");
    
    for (var bye = 0; bye < y.length; bye++) {
        y[bye].classList.toggle("points");
    }
}

function turnScore(dieScore){
    dieScore.sort();
    for(var singlesScore = 0; singlesScore < dieScore.length; singlesScore++){
        if(dieScore[singlesScore] == 1 ){
            onesTotal += 1;            
        }
        if(dieScore[singlesScore] == 2 ){
            twosTotal += 2;            
        }
        if(dieScore[singlesScore] == 3 ){
            threesTotal += 3;           
        }
        if(dieScore[singlesScore] == 4 ){
            foursTotal += 4;            
        }
        if(dieScore[singlesScore] == 5 ){
            fivesTotal += 5;            
        }
        if(dieScore[singlesScore] == 6 ){
            sixesTotal += 6;            
        }
    }
    singleScoressArray = [ onesTotal, twosTotal, threesTotal, foursTotal, fivesTotal, sixesTotal ];

    categoryUpperArray = ["Aces", "Twos","Threes","Fours","Fives","Sixes","Total Score","Bonus",
            "Total", "Upper Total","Grand Total"];

    for(displaySingles = 0; displaySingles < singleScoressArray.length; displaySingles++){
        if(singleScoressArray[displaySingles] > 0){
            document.getElementById(categoryUpperArray[displaySingles] + "Button").classList.add("Points");

            //document.getElementById(categoryUpperArray[displaySingles] + " player " + playersTurn).value = singleScoressArray[displaySingles];
        }
    }

    var scoresString = dieScore.join('');
    var uniqueNums = [];

    $.each(dieScore, function(i, el){
        if($.inArray(el, uniqueNums) === -1) uniqueNums.push(el);
    });
    
    var uniqueScores = uniqueNums.join('');

    ////////////////////////////////////////////////////////////////////// 3 of kind
    var threeOfKind = false;
    var kind3Total = 0;
    threeOfKind = /(\d{1})\1\1/.test(scoresString);
    if(threeOfKind == true){
        
        for(kind3 = 0; kind3 < 5; kind3++){
            kind3Total += dieScore[kind3];
        }// refactor this for 3 kind 4 kind and chance 
        document.getElementById("3ofKindButton").classList.add("Points");
    }
     
    /////////////////////////////////////////////////////////////////////// 4 of kind

    var fourOfKind = false;
    var kind4Total = 0;
    fourOfKind = /(\d{1})\1\1\1/.test(scoresString);
    if(fourOfKind == true){
        for(kind4 = 0; kind4 < 5; kind4++){
            kind4Total += dieScore[kind4];
        }
        document.getElementById("4ofKindButton").classList.add("Points");
    }

    ///////////////////////////////////////////////////////////////////////////// full house
    var fullHouse = false;
    fullHouse = /(\d{1})\1/.test(scoresString) && /(\d{1})\1\1/.test(scoresString);
    if(fullHouse == true){
        document.getElementById("FullHouseButton").classList.add("Points");
    }

    ///////////////////////////////////////////////////////////////////////// yatzy
    var yatzyScore = false;
    if(uniqueScores.length == 1){
        document.getElementById("YatzyButton").classList.add("Points");
    }

    ///////////////////////////////////////////////////////////////////////// small straight
    var smallS = false;
    if (uniqueScores == "12345" || uniqueScores == "23456" ) {
        document.getElementById("LargeStraightButton").classList.add("Points");
        document.getElementById("SmallStraightButton").classList.add("Points");
    }

    if (uniqueScores == "1234" || uniqueScores == "2345" || uniqueScores == "3456" ) {
        document.getElementById("SmallStraightButton").classList.add("Points");
    }
    

    ///////////////////////////////////////////////////////////// large straight
    var largeS = false;
    //&& document.getElementById("Large Straight player " + playersTurn).value == " "
    
    
    /////////////////////////////////////////////////////////// chance
    var chance = true;

    if(chance == true){
        for(chanceLoop = 0; chanceLoop < 5; chanceLoop++){
            chanceTotal += dieScore[chanceLoop];
        }
        document.getElementById("ChanceButton").classList.add("Points");
    }
    
}

function Aces(){
    document.getElementById("Aces player " + playersTurn).innerHTML = onesTotal;
    playerTurn();
}
function Twos(){
    document.getElementById("Twos player " + playersTurn).innerHTML = twosTotal;
    playerTurn();
}
function Threes(){
    document.getElementById("Threes player " + playersTurn).innerHTML = threesTotal;
    playerTurn();
}
function Fours(){
    document.getElementById("Fours player " + playersTurn).innerHTML = foursTotal;
    playerTurn();
}
function Fives(){
    document.getElementById("Fives player " + playersTurn).innerHTML = fivesTotal;
    playerTurn();
}
function Sixes(){
    document.getElementById("Sixes player " + playersTurn).innerHTML = sixesTotal;
    playerTurn();
}
function Chance(){
    document.getElementById("Chance player " + playersTurn).innerHTML = chanceTotal;
    playerTurn();
}
function FullHouse(){
    document.getElementById("Full House player " + playersTurn).innerHTML = "25";
    playerTurn();
}
function Yatzy(){
    document.getElementById("Yatzy player " + playersTurn).innerHTML = "50";
    playerTurn();
}
function SmallStraight(){
    document.getElementById("Small Straight player " + playersTurn).innerHTML = "30";
    playerTurn();
}
function LargeStraight(){
    document.getElementById("Large Straight player " + playersTurn).innerHTML = "40";
    playerTurn();
}
function Kind4(){
    document.getElementById("4 of a kind player " + playersTurn).innerHTML = chanceTotal;
    playerTurn();
}
function Kind3(){
    document.getElementById("3 of a kind player " + playersTurn).innerHTML = chanceTotal;
    playerTurn();
}

            // get the dies for diescore and makes an array of the dice rolled
function getdies(){
    var dieSource = [document.getElementById("keptdie1").src, document.getElementById("keptdie2").src, document.getElementById("keptdie3").src,
                     document.getElementById("keptdie4").src, document.getElementById("keptdie5").src];
    var dieScore = [];      // dieScore contains the 5 dies held
    for (var die = 0; die < dieSource.length; die++) {
        if(dieSource[die] == "http://127.0.0.1:5500/images/die1.jpg"){
            dieScore[die] = 1;
        }    
        if(dieSource[die] == "http://127.0.0.1:5500/images/die2.jpg"){
            dieScore[die] = 2;
        }    
        if(dieSource[die] == "http://127.0.0.1:5500/images/die3.jpg"){
            dieScore[die] = 3;
        }    
        if(dieSource[die] == "http://127.0.0.1:5500/images/die4.jpg"){
            dieScore[die] = 4;
        }    
        if(dieSource[die] == "http://127.0.0.1:5500/images/die5.jpg"){
            dieScore[die] = 5;
        }    
        if(dieSource[die] == "http://127.0.0.1:5500/images/die6.jpg"){
            dieScore[die] = 6;
        }    
    }
    turnScore(dieScore);
}

            // sets the player whos turn it is to white 
function setColor(playersTurn){   
    document.getElementById("col" + playersTurn).style.backgroundColor = "white";
}

// sets the player whos turn it was back to none  
function removeColor(playersTurn){   
    document.getElementById("col" + playersTurn).style.backgroundColor = "greenyellow";
}

// changes which players turn it is for score and for indicator
function playerTurn(){ 
    if(playersTurnCount === ((12 * players) + players - 1 )){
        gameOver();
    }
    else{
        removeColor(playersTurn);    
        if(playersTurn == players){
            playersTurn = 1;
        }
        else{
            playersTurn ++;
        }
        setColor(playersTurn);
        dieRoll = 0;

        document.getElementById("keptdie1").setAttribute("hidden", true);
        document.getElementById("keptdie2").setAttribute("hidden", true);
        document.getElementById("keptdie3").setAttribute("hidden", true);
        document.getElementById("keptdie4").setAttribute("hidden", true);
        document.getElementById("keptdie5").setAttribute("hidden", true);
 
        document.getElementById("scoreButtons").setAttribute("hidden", true);
        chanceTotal = 0;
        onesTotal = 0;
        twosTotal = 0;
        threesTotal = 0;
        foursTotal = 0;
        fivesTotal = 0;
        sixesTotal = 0;

        playersTurnCount++;
        removePoints();
    }
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
    else{
        //alert(die);
        if(die.startsWith("kept")){
            die = die.replace("kept", "");
        }
        document.getElementById(die).src = document.getElementById(keptdie).src;
        document.getElementById(die).removeAttribute("hidden");
        document.getElementById(keptdie).setAttribute("hidden", true);
        document.getElementById(keptdie).removeAttribute("data-held");
        
    }
}

function gameOver(){
    alert("game over");
    for (var upperLoop = 1; upperLoop <= players; upperLoop++) {
        var upperScoreTotal = 0;
        for(var getScore = 2; getScore < 8; getScore++){
            upperScoreTotal += parseInt(document.getElementById((categoryArray[getScore] + " player " + upperLoop)).innerText);
        } 
        document.getElementById("Total Score player " + upperLoop).innerHTML = upperScoreTotal;    
           
        if(upperScoreTotal >= 63){
            document.getElementById("Total player " + upperLoop).innerHTML = upperScoreTotal + 35;    
            document.getElementById("Bonus player " + upperLoop).innerHTML = 35;    
        }
        else{
            document.getElementById("Total player " + upperLoop).innerHTML = upperScoreTotal;    
            document.getElementById("Bonus player " + upperLoop).innerHTML = 0;    
        }
        
        var lowerScoreTotal = 0;
        for(var getScoreLower = 12; getScoreLower < 19; getScoreLower++){
            lowerScoreTotal += parseInt(document.getElementById((categoryArray[getScoreLower] + " player " + upperLoop)).innerText);
        }
        document.getElementById("Lower Total player " + upperLoop).innerHTML = lowerScoreTotal; 
        document.getElementById("Grand Total player " + upperLoop).innerHTML = upperScoreTotal + lowerScoreTotal;   
        document.getElementById("Upper Total player " + upperLoop).innerHTML = document.getElementById("Total player " + upperLoop).innerText;  // for Bottom upper total score
          
    }  

    switch (players)
    {
        case "2":
            player2Total = document.getElementById("Grand Total player 2").value;  
            break;
        
        case "3":
            player2Total = document.getElementById("Grand Total player 2").value;  
            player3Total = document.getElementById("Grand Total player 3").value; 
            break;

        case "4":
            player2Total = document.getElementById("Grand Total player 2").value;  
            player3Total = document.getElementById("Grand Total player 3").value; 
            player4Total = document.getElementById("Grand Total player 4").value; 
            break;
        
        default:
            userTotal = document.getElementById("Grand Total player 1").value; 
            break;
    }  
    whoWon();
    //
    // want to add this line of code in to have a reset button when game is won
    // <input type="button" value="Reload Page" onClick="document.location.reload(true)">
    // winner screen
    
}

function whoWon(){
    document.getElementById("main").setAttribute("hidden", true);
    document.getElementById("diced").setAttribute("hidden", true);
    document.getElementById("winners").removeAttribute("hidden");

    if(players == 1){
        document.getElementById("winners").removeAttribute("hidden");
        document.getElementById("if").removeAttribute("hidden");
        document.getElementById("winner").innerHTML = userName;
    }
    if(players >=2){
        document.getElementById("if2").removeAttribute("hidden");
        if (userTotal > player2Total){
            document.getElementById("winner").innerHTML = userTotal;
        }
        else{
            document.getElementById("winner").innerHTML = player2Name;
        }
    }

    if(players >= 3){
        document.getElementById("if3").removeAttribute("hidden");
        // finish      
    }
    if(players == 4){
        document.getElementById("if4").removeAttribute("hidden");
        // finish

    }
}
/*
    scores figure out
    update score

    validate if has score cannot add no button
    validate so that the buttons arent red if score already exists
    large and small straight still get small and large when only have small?
    final turn the leftover dice go to the kept dice
    reset the red for old rolls? 


    notes reference info from joe in class

    var currentRoll = 0;
var turnNumber = 0;
var upperSectionTotal = 0;

window.onload = function(){
    document.getElementById("roll-dice").onclick = rollDice;

    //set up die images onclick to toggle held
    var dieElements = document.querySelectorAll("#dice-section>img");
    for (var index = 0; index < dieElements.length; index++) {
        dieElements[index].onclick = toggleDieHeld;
    }

    //set up scoreBox onclick to set score
    var scoringElements = document.querySelectorAll("td.scorable");
    for (let currIndex = 0; currIndex < scoringElements.length; currIndex++) {
        scoringElements[currIndex].onclick = calcScore;
    }

    rollDice();
}

 
function rollDice(){
    var dice = getDiceElements();
    
    for (let index = 0; index < dice.length; index++) {
        if(isDieHeld(dice[index])){
            continue;
        }
        var rollValue = getRandom();
        dice[index].setAttribute("dice-value", rollValue);
        setDieImage(dice[index], rollValue);
    }
    currentRoll++;
    if(currentRoll == 3){
        document.getElementById("roll-dice").setAttribute("disabled", true);
    }
        document.getElementById("current-roll").innerText = "Roll #" + currentRoll;       
 
}


function getDiceElements(){
    return document.querySelectorAll("#dice-section>img");
}

function getDiceValues(){
    var dieElements = getDiceElements();
    var dieVals = [];
    for (var index = 0; index < dieElements.length; index++) {
        //get value from img element and add to array
        dieVals.push(dieElements[index].getAttribute("dice-value"));
    }
    return dieVals;
}

function isDieHeld(dieElement){
    if(dieElement.getAttribute("dice-held") == "true"){
        return true;
    }
    return false;
}
function resetHeld(){
    var dieElements = getDiceElements();
    for(var i = 0; i < dieElements.length; i++){
        dieElements[i].setAttribute("dice-held", "false");
    }
}
function toggleDieHeld(){
    var currDieElement = this;
    if(currDieElement.getAttribute("dice-held") == "false"){
        currDieElement.setAttribute("dice-held", "true");
    }
    else{
        currDieElement.setAttribute("dice-held", "false");
    }
}

function endTurn(){
    currentRoll = 0;
    turnNumber++;

    if(turnNumber == 13)
        alert("End Game here");

    rollDice();
    resetHeld();

    document.getElementById("roll-dice").removeAttribute("disabled");
}
function getRandom(){
    return Math.floor((Math.random() * 6) + 1);
}
function setDieImage(dieImageElement, rollValue){
    switch(rollValue){
        case 1:
            dieImageElement.src = "/images/die1.png";
            break;
        case 2:
            dieImageElement.src = "/images/die2.png";
            break;
        case 3:
            dieImageElement.src = "/images/die3.png";
            break;
        case 4:
            dieImageElement.src = "/images/die4.png";
            break;
        case 5:
            dieImageElement.src = "/images/die5.png";
            break;
        case 6:
            dieImageElement.src = "/images/die6.png";
            break;
    }
}
function calcScore(){
    //get selected scoreBox element (the <td> that was clicked)
    var scoreElement = this;

    //ensures scoreBox is not already scored
    if(alreadyScored(scoreElement)){
        alert("You already chose this");
        return;
    }

    //get the type of score and ensure it cannot be scored again
    var scoreType = scoreElement.getAttribute("data-score");
    scoreElement.setAttribute("already-scored", true);
    
    //get dice roll values
    var diceValues = getDiceValues();
    var score = 0;
    switch(scoreType){
        case "ones":
            score = calcUpperSection(diceValues, 1);
            displayScore(scoreElement, score);
            upperSectionTotal += score;
        break;
        case "twos":
            score = calcUpperSection(diceValues, 2);
            displayScore(scoreElement, score);
            upperSectionTotal += score;
        break;
        case "threes":
        break;
        case "fours":
        break;
        case "fives":
        break;
        case "sixes":
        break;
        case "three-of-a-kind":
        break;
        case "four-of-a-kind":
        break;
        case "small-straight":
        break;
        case "large-straight":
        break;
        case "yatzy":
        break;
        case "chance":
        break;
        case "full-house":
        break;
    }
    //after score is picked end players turn
    endTurn();
}

function calcUpperSection(diceValues, numToCheck){
    var sum = 0;
    for(var i = 0; i < diceValues.length; i++){
        if(diceValues[i] == numToCheck){
            sum += numToCheck;
        }
    }
    return sum;
}

function alreadyScored(scoreElement){
    if(scoreElement.hasAttribute("already-scored"))
        return true;
    return false;
}

function displayScore(scoreElement, scoreVal){
    var displayTableData = scoreElement.nextElementSibling;
    displayTableData.innerText = scoreVal;
}
*/


