let drawer = {
    drawCard :(card,player) =>{
    let cardtoDraw = card;
    let shareCardsID = `shareCards${player.display}`;
    let SHARECARDS = document.getElementById(shareCardsID);
    let element = document.createElement('p');
    element.className = 'parrafo';
    element.innerHTML = cardtoDraw.number + ' ' + cardtoDraw.palo;
    drawer.drawScore(player);
    SHARECARDS.appendChild(element);
    },
    drawScore :(player) =>{
        let numberID = `number${player.display}`;
        let NUMBER = document.getElementById(numberID)
        NUMBER.innerHTML = player.currentScore();
    },
    clearGame:(players)=>{

        players.forEach((player)=>{
            let shareCardsID = `shareCards${player.display}`;
            let shareCards = document.getElementById(shareCardsID);
            let turnID = `turn${player.display}`;
            let turn = document.getElementById(turnID);
            try {
                turn.classList.remove('red');
                turn.classList.remove('green');
            } catch (e) {}

            while (shareCards.firstChild){
                shareCards.removeChild(shareCards.firstChild);
            }
        })
    },
    playerTurn:(player)=>{
        let turnID = `turn${player.display}`;
        let TURN = document.getElementById(turnID);
        TURN.classList.add('green');    
    },
    playerOffTurn:(player)=>{
        let turnID = `turn${player.display}`;
        let TURN = document.getElementById(turnID);
        TURN.classList.remove('green');    
    },
    playerNoValid:(player)=>{
        let turnID = `turn${player.display}`;
        let TURN = document.getElementById(turnID);
        TURN.classList.add('gray');    
    },
    resetPlayerTurn:(players)=>{
        players.forEach((player)=>{
            let turnID = `turn${player.display}`;
            let TURN = document.getElementById(turnID);
            TURN.classList.remove('red');
            TURN.classList.remove('green');
        })
    }
    
}

export { drawer };