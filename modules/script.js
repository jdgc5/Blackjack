import { Game } from "./game.js";
import { drawer } from "./drawer.js";

const NEWGAME = document.getElementById('newGame');
const INTERACEMESSAGES = document.querySelector('.interfaceMessages');
var game;
var playerNumber = 2;

NEWGAME.addEventListener('click', () => {
    newGame(playerNumber);
});

function newGame(playerNumber){
    
    if(game !=null)drawer.clearGame(game.players);
    if(game != null)game.resetGame();
    if(game != null)enableInterface();
    
    game = null;
    game = new Game(playerNumber); 
    game.setPlayers(playerNumber);
    start();
};

function start(){
    INTERACEMESSAGES.innerHTML = 'A new game has started';
    setTimeout(()=>{
        INTERACEMESSAGES.innerHTML = '';
    },10000)
    initialCards();
    nextTurn();
}

function initialCards(){
    game.giveFirstCard();
    game.players.forEach(player => {
        drawer.drawCard(player.pickedCards[0],player);
        disableInterface();
    });   
}

async function nextTurn() {
    let validPlayers = game.players.filter(player => player.valid === true);

    for (const validPlayer of validPlayers) {
        enableInterfacePlayer(validPlayer);
        drawer.playerTurn(validPlayer);
        await pickOrStand(validPlayer);
        drawer.playerOffTurn(validPlayer);
        disableInterfacePlayer(validPlayer)
    }
    afterTurn(validPlayers);
    checkWinner();
    
}

function afterTurn(validPlayers){
    game.checkPlayers();
    drawer.resetPlayerTurn(validPlayers);
}

function checkWinner(){
    let playerWon = game.checkWinner();
    if (playerWon == null){
        nextTurn();
    } else {
        winner(playerWon); 
        disableInterface();
    }
}

function winner(playerWon){
    try {
        INTERACEMESSAGES.innerHTML = playerWon.name ;
    } catch (e) {console.log('something went wrong'+ e)}
}

function disableInterfacePlayer(player){
        let divID = `pickCard${player.display}`;
        let divPICK = document.getElementById(divID);
        divPICK.style.pointerEvents = 'none';
        let divID2 = `stand${player.display}`;
        let divPICK2 = document.getElementById(divID2);
        divPICK2.style.pointerEvents = 'none';
    
}

function enableInterfacePlayer(player){
    let divID = `pickCard${player.display}`;
    let divPICK = document.getElementById(divID);
    divPICK.style.pointerEvents = 'auto';
    let divID2 = `stand${player.display}`;
    let divPICK2 = document.getElementById(divID2);
    divPICK2.style.pointerEvents = 'auto';

}

function disableInterface(){
    game.players.forEach(player=>{
        let divID = `pickCard${player.display}`;
        let divPICK = document.getElementById(divID);
        divPICK.style.pointerEvents = 'none';
        let divID2 = `stand${player.display}`;
        let divPICK2 = document.getElementById(divID2);
        divPICK2.style.pointerEvents = 'none';
    })
}

function enableInterface(){
    game.players.forEach(player=>{
        let divID = `pickCard${player.display}`;
        let divPICK = document.getElementById(divID);
        divPICK.style.pointerEvents = 'auto';
        let divID2 = `stand${player.display}`;
        let divPICK2 = document.getElementById(divID2);
        divPICK2.style.pointerEvents = 'auto';
    })
}

const pickOrStand = (validPlayer) => {
    return new Promise((resolve, reject) => {
        
        let pickACardID = `pickCard${validPlayer.display}`;
        let PICKACARD = document.getElementById(pickACardID);

        PICKACARD.addEventListener('click', function handleClick() {
            PICKACARD.removeEventListener('click', handleClick);

            try {
                let card = game.giveCard(validPlayer);
                drawer.drawCard(card, validPlayer);
                INTERACEMESSAGES.innerHTML = validPlayer.name + ' have picked a card';
            } catch (e) {
                INTERACEMESSAGES.innerHTML = ('something went wrong', e);
            }
            drawer.playerOffTurn(validPlayer);
            resolve('pick');
        });

        let standID = `stand${validPlayer.display}`;
        let STAND = document.getElementById(standID);

        STAND.addEventListener('click', function handleStandClick() {
            STAND.removeEventListener('click', handleStandClick);
            drawer.playerOffTurn(validPlayer);
            validPlayer.valid = false;
            resolve('stand');
        });

    });
};



