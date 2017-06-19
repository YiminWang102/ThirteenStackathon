class Card {
  transform(value) {
    const cardvalues = {
      2: 'TWO',
      3: 'THREE',
      4: 'FOUR',
      5: 'FIVE',
      6: 'SIX',
      7: 'SEVEN',
      8: 'EIGHT',
      9: 'NINE',
      10:'TEN',
      11: 'JACK',
      12: 'QUEEN',
      13: 'KING',
      14: 'ACE'
    };
    const valueCards = {
      'TWO': 2,
      'THREE': 3,
      'FOUR': 4,
      'FIVE': 5,
      'SIX': 6,
      'SEVEN': 7,
      'EIGHT': 8,
      'NINE': 9,
      'TEN': 10,
      'JACK': 11,
      'QUEEN': 12,
      'KING': 13,
      'ACE': 14
    };
    return cardvalues[value];
  }

  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
  }

  toString() {
    return this.transform(this.value) + ' of ' + this.suit;
  }

  toVSFormat(){
    let type;
    let s;
    if (this.value <= 9) type = this.value;
    else if (this.value === 10) type = 't';
    else if (this.value === 11) type = 'j';
    else if (this.value === 12) type = 'q';
    else if (this.value === 13) type = 'k';
    else if (this.value === 14) type = 'a';

    if(this.suit === 'SPADES') s = 's';
    if(this.suit === 'DIAMONDS') s = 'd';
    if(this.suit === 'HEARTS') s = 'h';
    if(this.suit === 'CLUBS') s = 'c';


    return type + s;
  }

  newDeck() {
    const deck = [];
    const values = [];
    for(let i = 2; i <= 14; i++) values.push(i);
    const suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS'];
    for(let valueInd = 0; valueInd < values.length; valueInd++){
      for(let suitInd = 0; suitInd < suits.length; suitInd++){
        deck.push( new Card(values[valueInd], suits[suitInd]));
      }
    }
    return deck;
  }
}

module.exports = Card;
