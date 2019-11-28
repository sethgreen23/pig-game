/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores,roundScore,activePlayer,gamePlaying,lastRoll;
//run the init function
init();

//add and event listener to the roll dice
document.querySelector(".btn-roll").addEventListener("click",function(){
    if(gamePlaying){
        //random number
        let dice1=Math.ceil(Math.random()*6);
        let dice2=Math.ceil(Math.random()*6);
        //show the dice
        let diceDOM1=document.querySelector("#dice1");
        let diceDOM2=document.querySelector("#dice2");
        diceDOM1.src="dice-"+dice1+".png";
        diceDOM2.src="dice-"+dice2+".png";
        document.querySelector("#dice1").style.display="block";
        document.querySelector("#dice2").style.display="block";
        //update the score
        if(dice1!=1 && dice2!=1){
            //add the dice to the roundscore
            roundScore+=dice1+dice2;
            //display the roundscore
            document.getElementById("current-"+activePlayer).textContent=roundScore;
        }else{
            nextPlayer();
        }
    }
    
});
//add an event listenenr to the hold button
document.querySelector(".btn-hold").addEventListener("click",function(){
    
    if(gamePlaying){
        //add the current roundscore to the score
        scores[activePlayer]+=roundScore;
        //if the player reach the 20 then he win
        if(scores[activePlayer]>=100){
            //player win
            //add the winner class 
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            //who the winner label on the player name
            document.getElementById("name-"+activePlayer).textContent="WINNER !";
            //hide the dice
            document.querySelector("#dice1").style.display="none";
            document.querySelector("#dice2").style.display="none";
            document.getElementById("score-"+activePlayer).textContent=scores[activePlayer];
            document.getElementById("current-"+activePlayer).textContent="0";
            gamePlaying=false;
        }else{
            //display the score to the player
            document.getElementById("score-"+activePlayer).textContent=scores[activePlayer];
            //give the hand to the next player
            nextPlayer();
            
        }
    }
    
});
//add event listenener to the new game button
document.querySelector(".btn-new").addEventListener("click",init);
//function of initialisation
function init(){
    //initilise variables
    scores=[0,0];
    roundScore=0;
    activePlayer=0;
    //initialise the current fields
    document.getElementById("current-0").textContent="0";
    document.getElementById("current-1").textContent="0";
    //initialise scores
    document.getElementById("score-1").textContent="0";
    document.getElementById("score-0").textContent="0";
    //delite the winner class
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    //add the active state tot eh first one
    document.querySelector(".player-0-panel").classList.add("active");
    //add the layer 1 to the first panel name
    document.getElementById("name-0").textContent="PLAYER 1"
    document.getElementById("name-1").textContent="PLAYER 2"
    //hide the dice
    document.querySelector("#dice1").style.display="none";
    document.querySelector("#dice2").style.display="none";
    //initialise gamePlaying
    gamePlaying=true;
}
//nextplayer function
function nextPlayer(){
    //we initilise the roundscore
    roundScore=0;
    //clearn the content of the current score of the active player
    document.getElementById("current-"+activePlayer).textContent='0';
    //hide the dice
    document.getElementById("dice1").style.display="none";
    document.getElementById("dice2").style.display="none";
    //change the activeplayer
    activePlayer===0?activePlayer=1:activePlayer=0;
    //toggle the active player class
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    
}