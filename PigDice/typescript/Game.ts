
class Game{
    private gameTotalPlayer1:number;
    private gameTotalPlayer2:number;
    private currentPlayer:number;
    private gameState:string; //started, playing, finished
    private currentTurnTotal:number;
    private pointsToWin:number;

    constructor(numPointsToWin:number){
        this.pointsToWin = numPointsToWin;
        this.gameTotalPlayer1 = 0;
        this.gameTotalPlayer2 = 0;
        this.currentTurnTotal = 0;
        this.currentPlayer = 1;
    
    }

    getGameTotal(playerNum:number):number{
        if(playerNum == 1)
            return this.gameTotalPlayer1;
        else if(playerNum == 2)
            return this.gameTotalPlayer2;
        else
            return null;
    }

    rollDie():number{
        let roll = getRandomIntegerValue(1,6);
        if(roll == 1){
            this.passTurn();
        }
        this.currentTurnTotal += roll;

        if(this.currentPlayer == 1){
            if(this.currentTurnTotal +
            this.gameTotalPlayer1 >= this.pointsToWin){
                this.gameState = "finished";
            }
        }
        return roll;
    }

    passTurn(){
        //reset turn total
        this.currentTurnTotal = 0;

        //same as below with conditional/ternary
        //operator
        this.currentPlayer = 
            (this.currentPlayer == 1) ? 2 : 1;
        /*
        if(this.currentPlayer == 1){
            this.currentPlayer = 2;
        }
        else{
            this.currentPlayer = 1;
        }*/
    }

}

/**
 * Gets an integer random value
 * @param minValue The inclusive min value
 * @param maxValue The inclusive max value
 */
function getRandomIntegerValue
    (minValue, maxValue):number{
    return Math.floor(Math.random() * 10 + 1);
}