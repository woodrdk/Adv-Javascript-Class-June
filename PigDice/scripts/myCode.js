
var diceImage = ["die1.jpg", "die2.jpg","die3.jpg", "die4.jpg", "die5.jpg", "die6.jpg"];
var scoreTotal= 0;
var player1Score = 0;
var player2Score = 0;
var randomDie;
var player1 = true;

window.onload = function () {
    document.getElementById("roll").onclick = rollDice;
    document.getElementById("hold").onclick = holdTurn;
    document.getElementById("turnScore").readOnly = true;
    document.getElementById("player1Score").readOnly = true;
    document.getElementById("player2Score").readOnly = true;
    document.getElementById("winning").readOnly = true;
}

function rollDice(){
    //alert(scoreTotal);
    playAudio();
    randomDie = Math.round(Math.random()*5);
    document.getElementById("die").src="images/"+ diceImage[randomDie]; 
    document.getElementById("turnScore").value = (randomDie + 1);      
    if(randomDie == 0){
        document.getElementById("turnScore").value = ("");
        scoreTotal = 0;
        playerChange(scoreTotal);
    }
    else{
        playerScore(randomDie);   
    }
}

function playerScore(randomDie){
    scoreTotal += (randomDie +1);
    document.getElementById("turnScore").value = (scoreTotal);  
            
}

function holdTurn(){
    if(scoreTotal == 0){
        document.getElementById("turnScore").value = "Roll the Dice first";    
    }
    else{
        document.getElementById("turnScore").value = "0";
        playerChange(scoreTotal);  
        scoreTotal = 0;
    }
}

function playerChange(scoreTotal){    
    if(player1 == true)
    {
        document.getElementById("player1Board").style.backgroundColor = "white";        
        document.getElementById("player2Board").style.backgroundColor = "yellow";    
        player1Score +=scoreTotal;
        document.getElementById("player1Score").value = player1Score;
        player1 = false;
    }
    else{
        document.getElementById("player2Board").style.backgroundColor = "white";        
        document.getElementById("player1Board").style.backgroundColor = "yellow";    
        player2Score +=scoreTotal;
        document.getElementById("player2Score").value = player2Score;
        player1 = true;
    }  
    winning(player1Score, player2Score);
}

function winning(player1Score, player2Score){
    if(player1Score > 99 || player2Score > 99){
        if(player1Score > 99){
            document.getElementById("winning").value = "Player 1 wins the game! ";
            document.getElementById("player1Board").style.backgroundColor = "green";
            document.getElementById("player2Board").style.backgroundColor = "black"; 
        }
        else{
            document.getElementById("winning").value = "Player 2 wins the game! ";
            document.getElementById("player2Board").style.backgroundColor = "green";
            document.getElementById("player1Board").style.backgroundColor = "black";
        }
       // reset();

    }
    else{  
        if( player1Score == player2Score){
            document.getElementById("winning").value = "Tie Game ";
        }
        else if(player1Score > player2Score){
            document.getElementById("winning").value = "Player 1 is winning";
        }
        else{
            document.getElementById("winning").value = "Player 2 is winning";
        }
    }
}

function reset(){
    document.getElementById("turnScore").value = ("");
    document.getElementById("player1Score").value = ("0");
    document.getElementById("player2Score").value = ("0");
    document.getElementById("winning").value = "";
    document.getElementById("player2Board").style.backgroundColor = "white";
    document.getElementById("player1Board").style.backgroundColor = "white";
    scoreTotal= 0;
    player1Score = 0;
    player2Score = 0;
    player1 = true;
}



    
function playAudio() { 
    var rollingDice = document.getElementById("myAudio"); 
    rollingDice.play(); 
} 
