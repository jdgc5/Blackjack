import { Player } from "./player.js"

class Game {
    constructor() {
        this.players = [];
        this.baraja = new Array(48).fill(0).map((card,index)=>{
            return {
                "number" : (index % 12) +1 ,
                "palo" : ['picas','corazones','treboles','diamantes'][Math.floor(index/12)],
                "active" : true,
            }
        }).filter((item)=>{
            return item.number != 8 && item.number != 9
        });
    }

    checkPlayers() {
        this.players.filter(player => player.valid === true).forEach(player => {
            if (player.currentCardSum >= 21) player.valid = false;
        });
    }
    checkWinner() {
        if (!this.players.find(player => player.valid == true)){
            let validPlayers = this.players.filter(player => player.currentCardSum <= 21);
    
            if (validPlayers.length > 0) {
                let maxScorePlayer = validPlayers.reduce((maxPlayer, currentPlayer) => {
                    if (currentPlayer.currentCardSum > maxPlayer.currentCardSum) {
                        return currentPlayer;
                    } else if (currentPlayer.currentCardSum === maxPlayer.currentCardSum && currentPlayer !== maxPlayer) {
                        return { name: 'Both Players won' };
                    }
                    return maxPlayer;
                }, validPlayers[0]);
                let currentName = maxScorePlayer.name;
                let newName = currentName + ' won the game';
                Reflect.set(maxScorePlayer,'name', newName);
                return maxScorePlayer;
            } else {
                return { name : 'All players lost'};
            }
        }
        return null;
    }
    
    
    

    setPlayers(playerNumber){
        
        for (let i = 0; i < playerNumber; i++) {
            let playerName = `Player ${i + 1}`;
            playerName = new Player(playerName);
            playerName.display = i;
            this.players.push(playerName);            
        }
    }

    giveCard(player) {
        if (player.isValid()) {
            let selectedBaraja = this.baraja.filter((card) => card.active);
            let randomCard = Math.floor(Math.random() * selectedBaraja.length);
            let chosenCard = selectedBaraja[randomCard];
            this.desactiveCard(chosenCard);
            player.addPickedCard(chosenCard);
            return chosenCard;
        }   
    }

    giveFirstCard() {
        this.players.forEach(player => { 
            this.giveCard(player);  
        });
    }
    
    desactiveCard(chosenCard){

        const index = this.baraja.findIndex((card) => 
        card.number === chosenCard.number && card.palo === chosenCard.palo);
        this.baraja[index].active = false;
    }

    resetGame(){
        this.baraja.filter(card=> card.active == false).forEach(card =>{
            card.active = true
        });
        this.players.forEach((player)=>{
            player.removePickedCards();
            player.resetScore();
        })
    }

}

export { Game };

