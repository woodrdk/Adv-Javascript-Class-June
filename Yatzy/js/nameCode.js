
// Welcome to "Yatzy" my Advanced Javascript school assignment for Spring Str 2018
// Robert M Wood Jr.
// June 19 2018 
// more updates to come and clean up with time
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

var playerTest = playerScoreTotal.slice(0); 

var winner = [];

/////////////////////// scores for the single digits 1 - 6
var chanceTotal = 0;   
var onesTotal = 0;
var twosTotal = 0;
var threesTotal = 0;
var foursTotal = 0;
var fivesTotal = 0;
var sixesTotal = 0;
var userName;
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
    var isAllHeld = false;
    isAllHeld = all5Held();
    if(isAllHeld == true){
        getdies();   
        document.getElementById("scoreButtons").removeAttribute("hidden");
    }
    
}

function all5Held(){
    if(document.getElementById("keptdie1").getAttribute("data-held") == "true" &&
        document.getElementById("keptdie2").getAttribute("data-held") == "true" &&
        document.getElementById("keptdie3").getAttribute("data-held") == "true" &&
        document.getElementById("keptdie4").getAttribute("data-held") == "true" &&
        document.getElementById("keptdie5").getAttribute("data-held") == "true"){
       return true; 
    }
    else{
        alert("Must have 5 dice held")
    }
}

function removePoints(){
    var y = document.querySelectorAll(".Points");
    for (var bye = 0; bye < y.length; bye++) {
        y[bye].classList.remove("Points");
    }
}

function valueExists(info){
    if(info.innerHTML == ""){
        return false;
    }
    else{
        return true;
        
    }
}
var fullHouse = false;
var threeOfKind = false;
var fourOfKind = false;
var smallS = false; 
var yatzyScore = false;
var largeS = false;
var chance = false;

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
            if( valueExists(document.getElementById(categoryUpperArray[displaySingles] + " player " + (playersTurn))) == false){
                document.getElementById(categoryUpperArray[displaySingles] + "Button").classList.add("Points");
            }
        }
    }

    var scoresString = dieScore.join('');
    var uniqueNums = [];
    $.each(dieScore, function(i, el){
        if($.inArray(el, uniqueNums) === -1) uniqueNums.push(el);
    });
    
    var uniqueScores = uniqueNums.join('');

    ////////////////////////////////////////////////////////////////////// 3 of kind
    var kind3Total = 0;
    threeOfKind = /(\d{1})\1\1/.test(scoresString);
    if(threeOfKind == true){
        
        for(kind3 = 0; kind3 < 5; kind3++){
            kind3Total += dieScore[kind3];
        }// refactor this for 3 kind 4 kind and chance 
        if(valueExists(document.getElementById("3 of a kind player " + playersTurn)) == false) {
            document.getElementById("3ofKindButton").classList.add("Points");
        }
    }
     
    /////////////////////////////////////////////////////////////////////// 4 of kind
    var kind4Total = 0;
    fourOfKind = /(\d{1})\1\1\1/.test(scoresString);
    if(fourOfKind == true){
        for(kind4 = 0; kind4 < 5; kind4++){
            kind4Total += dieScore[kind4];
        }
        document.getElementById("4ofKindButton").classList.add("Points");
    }

    ///////////////////////////////////////////////////////////////////////////// full house
    fullHouse = /(\d{1})\1/.test(scoresString) && /(\d{1})\1\1/.test(scoresString);
    if(fullHouse == true){
        document.getElementById("FullHouseButton").classList.add("Points");
    }

    ///////////////////////////////////////////////////////////////////////// yatzy
    var realYatzy = /(\d{1})\1\1\1\1/.test(scoresString);
    if(realYatzy == true){
        document.getElementById("YatzyButton").classList.add("Points");
        yatzyScore = true;
    }

    ///////////////////////////////////////////////////////////////////////// straights
    
    if (uniqueScores == "12345" || uniqueScores == "23456" ) {
        document.getElementById("LargeStraightButton").classList.add("Points");
        document.getElementById("SmallStraightButton").classList.add("Points");
        largeS = true;
    }

    if (SmallStraightVariables() == true) {
        document.getElementById("SmallStraightButton").classList.add("Points");
        smallS = true;
    }
    // chance
    if(chance == false){
        for(chanceLoop = 0; chanceLoop < 5; chanceLoop++){
            chanceTotal += dieScore[chanceLoop];
        }
        document.getElementById("ChanceButton").classList.add("Points");
    }
}
/////  fix this to fix small straight  also figure out how to fix full house issue
function SmallStraightVariables(){
    var SSV = ["11234", "21234", "31234", "41234", "51234", "61234" , "12345", "22345", "32345", "42345", "52345", "62345", "13456", "23456", "33456", "43456", "53456", "63456", "12341","12342","12343","12344","12345","12346", "23451","23452","23453","23454","23455","23456", "34561" ,"34562" ,"34563" ,"34564" ,"34565" ,"34566"];
    /*for(ssvLoop = 0; ssvLoop < SSV.length; ssvLoop++){
        if(uniqueScores == SSV){
            return true;
        }
    }
   */
    return true;
}
function Aces(){
    if(valueExists(document.getElementById("Aces player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(document.getElementById("AcesButton").className = "Points"){
            document.getElementById("Aces player " + playersTurn).innerHTML = onesTotal;   
        }
        else{
            document.getElementById("Aces player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
    
}
function Twos(){
    if(valueExists(document.getElementById("Twos player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(document.getElementById("TwosButton").className = "Points"){
            document.getElementById("Twos player " + playersTurn).innerHTML = twosTotal;   
        }
        else{
            document.getElementById("Twos player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
}
function Threes(){
    if(valueExists(document.getElementById("Threes player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(document.getElementById("ThreesButton").className = "Points"){
            document.getElementById("Threes player " + playersTurn).innerHTML = threesTotal;   
        }
        else{
            document.getElementById("Threes player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
}
function Fours(){
    if(valueExists(document.getElementById("Fours player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(document.getElementById("FoursButton").className = "Points"){
            document.getElementById("Fours player " + playersTurn).innerHTML = foursTotal;   
        }
        else{
            document.getElementById("Fours player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
}
function Fives(){
    if(valueExists(document.getElementById("Fives player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(document.getElementById("FivesButton").className = "Points"){
            document.getElementById("Fives player " + playersTurn).innerHTML = fivesTotal;   
        }
        else{
            document.getElementById("Fives player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
}
function Sixes(){
    if(valueExists(document.getElementById("Sixes player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(document.getElementById("SixesButton").className = "Points"){
            document.getElementById("Sixes player " + playersTurn).innerHTML = sixesTotal;   
        }
        else{
            document.getElementById("Sixes player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
}
function Chance(){
    if(valueExists(document.getElementById("Chance player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(chance == false){
            document.getElementById("Chance player " + playersTurn).innerHTML = chanceTotal;
        }
        else{
            document.getElementById("Chance player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
}
function FullHouse(){
    if(valueExists(document.getElementById("Full House player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(fullHouse == false){
            document.getElementById("Full House player " + playersTurn).innerHTML = "0";
        }
        else{
            document.getElementById("Full House player " + playersTurn).innerHTML = 25;
        }
        playerTurn();
    }
}
function Yatzy(){
    if(valueExists(document.getElementById("Yatzy player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(yatzyScore == true){
            document.getElementById("Yatzy player " + playersTurn).innerHTML = "50";
        }
        else{
            document.getElementById("Yatzy player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
}
function SmallStraight(){
    if(valueExists(document.getElementById("Small Straight player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(smallS == true){
            document.getElementById("Small Straight player " + playersTurn).innerHTML = "30";
        }
        else{
            document.getElementById("Small Straight player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
}
function LargeStraight(){
    if(valueExists(document.getElementById("Large Straight player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(largeS == true){
            document.getElementById("Large Straight player " + playersTurn).innerHTML = "40";
        }
        else{
            document.getElementById("Large Straight player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
}
function Kind4(){
    if(valueExists(document.getElementById("4 of a kind player " + playersTurn))){
        alert("Already have score here");
    }
    else{
        if(fourOfKind == true){
            document.getElementById("4 of a kind player " + playersTurn).innerHTML = chanceTotal;
        }
        else{
            document.getElementById("4 of a kind player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
}
function Kind3(){
    if(valueExists(document.getElementById( "3 of a kind player " + playersTurn) ) ) {
        alert("Already have score here");
    }
    else{
        if(threeOfKind == true){
            document.getElementById("3 of a kind player " + playersTurn).innerHTML = chanceTotal;
        }
        else{
            document.getElementById("3 of a kind player " + playersTurn).innerHTML = 0;
        }
        playerTurn();
    }
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
    //alert(playersTurnCount);
    if(playersTurnCount === (( 13 * players)-1)){
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

        document.getElementById("keptdie1").src = "";
        document.getElementById("keptdie2").src = "";
        document.getElementById("keptdie3").src = "";
        document.getElementById("keptdie4").src = "";
        document.getElementById("keptdie5").src = "";
        
        document.getElementById("keptdie1").setAttribute("data-held", false);
        document.getElementById("keptdie2").setAttribute("data-held", false);
        document.getElementById("keptdie3").setAttribute("data-held", false);
        document.getElementById("keptdie4").setAttribute("data-held", false);
        document.getElementById("keptdie5").setAttribute("data-held", false);

        chanceTotal = 0;
        onesTotal = 0;
        twosTotal = 0;
        threesTotal = 0;
        foursTotal = 0;
        fivesTotal = 0;
        sixesTotal = 0;
        scoresString = "";
        uniqueNums = [];
        dieScore = [];
        fullHouse = false;
        threeOfKind = false;
        fourOfKind = false;
        smallS = false; 
        yatzyScore = false;
        largeS = false;
        chance = false;
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
            userTotal = document.getElementById("Grand Total player 1").value; 
            player2Total = document.getElementById("Grand Total player 2").value;  
            break;        
        case "3":
            userTotal = document.getElementById("Grand Total player 1").value; 
            player2Total = document.getElementById("Grand Total player 2").value;  
            player3Total = document.getElementById("Grand Total player 3").value; 
            playerScoreTotal = [userTotal, player2Total, player3Total]; 
            break;

        case "4":
            userTotal = document.getElementById("Grand Total player 1").value; 
            player2Total = document.getElementById("Grand Total player 2").value;  
            player3Total = document.getElementById("Grand Total player 3").value; 
            player4Total = document.getElementById("Grand Total player 4").value; 
            playerScoreTotal = [userTotal, player2Total, player3Total, player4Total ]; 
            break;
        
        default:
            userTotal = document.getElementById("Grand Total player 1").value; 
            break;
    }  
    
    whoWon();   
}

function whoWon(){
    document.getElementById("main").setAttribute("hidden", true);
    document.getElementById("diced").setAttribute("hidden", true);
    document.getElementById("scoreButtons").setAttribute("hidden", true);
    document.getElementById("winners").removeAttribute("hidden");

    if(players == 1){
        document.getElementById("winners").removeAttribute("hidden");
        document.getElementById("if").removeAttribute("hidden");
        document.getElementById("winner").innerHTML = userName;
    }
    if(players ==2){
        document.getElementById("winners").removeAttribute("hidden");
        document.getElementById("if").removeAttribute("hidden");
        document.getElementById("if2").removeAttribute("hidden");
        if (userTotal > player2Total){
            document.getElementById("winner").innerHTML = userName;
            document.getElementById("1stPlace").innerHTML = player2Name;
        }
        else{
            document.getElementById("winner").innerHTML = player2Name;
            document.getElementById("1stPlace").innerHTML = userName;
        }
    }

    
    if(players == 3){
        document.getElementById("winners").removeAttribute("hidden");
        document.getElementById("if").removeAttribute("hidden");
        document.getElementById("if2").removeAttribute("hidden");
        document.getElementById("if3").removeAttribute("hidden");
        playerTest = playerTest.sort();
        for(var winners = 0; winners < playerScoreTotal.length; winners++){
            for(var rank = 0; rank < playerScoreTotal.length; rank++){
                if(playerScoreTotal[winners] == playerTest[rank]){
                    winner[winner] = "player " + (winner + 1);
                }
            }
            if(winner[winner] == "player1"){
                winner[winner] = userName;
            }
            if(winner[winner] == "player2"){
                winner[winner] = player2Name;
            }
            if(winner[winner] == "player3"){
                winner[winner] = player3Name;
            }
        }
        
        document.getElementById("winner").innerHTML = winner[0];
        document.getElementById("1stPlace").innerHTML = winner[1];
        document.getElementById("2ndPlace").innerHTML = winner[2];
    }

    if(players == 4){
        document.getElementById("winners").removeAttribute("hidden");
        document.getElementById("if").removeAttribute("hidden");
        document.getElementById("if2").removeAttribute("hidden");
        document.getElementById("if3").removeAttribute("hidden");
        document.getElementById("if4").removeAttribute("hidden");
        playerTest = playerTest.sort();
        for(var winners = 0; winners < playerScoreTotal.length; winners++){
            for(var rank = 0; rank < playerScoreTotal.length; rank++){
                if(playerScoreTotal[winners] == playerTest[rank]){
                    winner[winner] = "player " + winner + 1;
                }
            }
        }
        document.getElementById("winner").innerHTML = winner[0];
        document.getElementById("1stPlace").innerHTML = winner[1];
        document.getElementById("2ndPlace").innerHTML = winner[2];
        document.getElementById("4thPlace").innerHTML = winner[3]
    }
}
/*
    validate so that the buttons arent red if score already exists
    validate for small straight and fix full house
    reset the red for old rolls? 
    finish and fix scoring / trophys
*/


