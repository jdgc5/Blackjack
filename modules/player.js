//Just discovered private attrb in JS. Testing them 

class Player {
    #name;
    #valid;
    #pickedCards;
    #chips;
    #currentCardSum;
    #display;

    constructor(name) {
        this.#name = name;
        this.#valid = true;
        this.#pickedCards = [];
        this.#chips = 1000;
        this.#currentCardSum = 0;
        this.#display = 0;
    }

    get name() {
        return this.#name;
    }

    set name(newName) {

        this.#name = newName;
    }

    get valid() {
        return this.#valid;
    }

    set valid(newValue) {
        this.#valid = newValue;
    }

    get pickedCards() {
        return this.#pickedCards;
    }

    set pickedCards(newPickedCards) {
        this.#pickedCards = newPickedCards;
    }

    get chips() {
        return this.#chips;
    }

    set chips(newChips) {
        this.#chips = newChips;
    }

    get currentCardSum() {
        return this.#currentCardSum;
    }

    set currentCardSum(newSum) {
        this.#currentCardSum = newSum;
    }

    get display(){
        return this.#display;
    }
    set display(newDisplay){
        this.#display = newDisplay;
    }

    addPickedCard(card){
        this.#pickedCards.push(card);
    } 
    removePickedCards(){
        this.#pickedCards = [];
    }

    currentScore() {
        this.#currentCardSum = 0;
        this.#pickedCards.forEach((item) => {
            this.#currentCardSum += item.number;
        });
        return this.#currentCardSum;
    }

    resetScore(){
        this.#currentCardSum = 0;
    }

    isValid() {
        return this.#valid;
    }

}

export { Player };