const Card = require('./Card');
class Deck {
  constructor() {
    this.deck = Card.prototype.newDeck();
  }

  shuffle() {
    for(let i = 51; i >= 0; i--) {
      const n = Math.floor(Math.random() * i);
      let tempCard = this.deck[i];
      this.deck[i] = this.deck[n];
      this.deck[n] = tempCard;
    }
  }

  toString() {
    return this.deck.toString();
  }

  split() {
    const quarters = [];
    for(let i = 0; i < 4; i++){
      quarters.push(this.deck.slice(i * 13, (i + 1) * 13));
    }
    return quarters;
  }
}

module.exports = Deck;

//Tests:
//
// const myDeck = new Deck();
// console.log(myDeck);
// console.log(myDeck.split());
// myDeck.shuffle();
// console.log(myDeck);
// myDeck.shuffle();
// console.log(myDeck);
// myDeck.shuffle();
// console.log(myDeck);
