const Card = require('./Card');

class Hand {
  constructor(handArr) {
    this.size = handArr.length;
    this.hand = handArr.sort( (a, b) =>{
      return a.value - b.value;
    });
    this.type = this.defineHand();
  }

  toString() {
    return this.hand.map(card => card.toString()).join('\n');
  }

  toVSFormat() {
    return this.hand.map(card => card.toVSFormat()).join('');
  }

  isQuads(){
    const hand = this.hand;
    if (hand[0].value === hand[1].value && hand[0].value ===
      hand[2].value && hand[0].value === hand[3].value)return true;
    else if (hand[4].value === hand[1].value &&
      hand[4].value === hand[2].value && hand[4].value === hand[3].value)return true;
    else return false;
  }

  isStraightFlush() {
    return this.isFlush() && this.isStraight();
  }

  isFullHouse(){
    const hand = this.hand;
    if (hand[0].value === hand[1].value && hand[0].value === hand[2].value &&
      hand[3].value === hand[4].value) return true;
    else if (hand[0].value === hand[1].value && hand[2].value === hand[3].value &&
      hand[3].value === hand[4].value) return true;
    else return false;
  }

  isFlush(){
    const hand = this.hand;
    for(let i = 1; i < hand.length; i++){
      if(hand[0].suit !== hand[i].suit) return false;
    }
    return true;
  }

  isStraight(){
    const hand = this.hand;
    if(this.size === 3) {
      if(hand[0].value === 2)
        if(hand[1].value === 3)
          if(hand[2].value === 14)
            return true;
    }
    if(this.size === 5) {
      if(hand[0].value === 2)
        if(hand[1].value === 3)
          if(hand[2].value === 4)
            if(hand[3].value === 5)
              if(hand[4].value === 14)
                return true;
    }
    for(let i = 0; i < hand.length; i++) {
      if (hand[i].value - hand[0].value !== i)
        return false;
    }
    return true;
  }

  isTrips(){
    const hand = this.hand;
    for(let i = 0; i < hand.length-2; i++){
      if(hand[i].value === hand[i+1].value && hand[i].value === hand[i+2].value)
        return true;
    }
    return false;
  }

  isTwoPair() {
    const hand = this.hand;
    if(hand[0].value !== hand[1].value){
      if(hand[1].value === hand[2].value && hand[3].value === hand[4].value)
        return true;
    }
    else if(hand[2].value === hand[3].value || hand[3].value === hand[4].value)
      return true;
    else return false;
  }

  isOnePair() {
    const hand = this.hand;
    for(let i = 0; i < hand.length - 1; i++) {
      if (hand[i].value === hand[i+1].value) return true;
    }
    return false;
  }

  defineHand(){
    let type;
    if (this.size === 5){
      if(this.isStraightFlush()) type = {name: 'STRAIGHTFLUSH', value: 13};
      else if (this.isQuads()) type = {name: 'QUADS', value: 10};
      else if (this.isFullHouse()) type = {name: 'FULLHOUSE', value: 8};
      else if (this.isFlush()) type = {name: 'FLUSH', value: 7};
      else if (this.isStraight()) type = {name: 'STRAIGHT', value: 6};
      else if (this.isTrips()) type = {name: 'TRIPS', value: 5};
      else if (this.isTwoPair()) type = {name: 'TWOPAIR', value: 4};
      else if (this.isOnePair()) type = {name: 'ONEPAIR', value: 3};
      else type = {name: 'HIGHCARD', value: 0};
    }
    else{
      if (this.isTrips()) type = {name: 'TRIPS', value: 5};
      else if (this.isOnePair()) type = {name: 'ONEPAIR', value: 3};
      else type = {name: 'HIGHCARD', value: 0};
    }
    return type;
  }

  compareTo(h) {
    if (this.type.value !== h.type.value) return this.type.value - h.type.value;
    if (this.type.name === 'STRAIGHTFLUSH' || this.type.name === 'STRAIGHT')
      return this.hand[3].value - h.hand[3].value;
    if (this.type.name === 'FLUSH' || this.type.name === 'HIGHCARD') {
      for(let i = h.size -1; i >= 0; i--){
        if (this.hand[i].value !== h.hand[i].value)
          return this.hand[i].value - h.hand[i].value;
      }
      return 0;
    }
    if (this.type.name === 'QUADS'){
      let tVal = 0;
      let hVal = 0;
      if(this.hand[0].value === this.hand[1].value)
        tVal = this.hand[0].value;
      else tVal = this.hand[1].value;

      if(h.hand[0].value === h.hand[1].value)
        hVal = h.hand[0].value;
      else hVal = h.hand[1].value;
      return tVal - hVal;
    }
    if (this.type.name === 'FULLHOUSE' || this.type.name === 'TRIPS'){
      return this.hand[2].value - h.hand[2].value;
    }

    if (this.type.name === 'ONEPAIR'){
      let tVal = 0;
      let tKick = [];
      let hVal = 0;
      let hKick = [];
      for(let i = 0; i < this.size; i++){
        if(tVal === 0 && this.hand[i].value == this.hand[i + 1].value){
          tVal = this.hand[i].value;
          i++;
        }
        else
          tKick.push(this.hand[i].value);
      }

      for(let i = 0; i < h.size; i++){
        if(hVal === 0 && h.hand[i].value == h.hand[i + 1].value){
          hVal = h.hand[i].value;
          i++;
        }
        else
          hKick.push(h.hand[i].value);
      }
      if(tVal !== hVal)
        return tVal - hVal;
      else{
        for(let i = hKick.length - 1; i >= 0; i--)
          if(hKick[i] !== tKick[i])
            return tKick[i] - hKick[i];
      }
      return 0;
    }
    else if (this.type.name === 'TWOPAIR') {
      let tVal1 = 0;
      let tVal2 = 0;
      let tKick = 0;
      let hVal1 = 0;
      let hVal2 = 0;
      let hKick = 0;

      if(this.hand[0].value == this.hand[1].value){
        tVal1 = this.hand[0].value;
        if(this.hand[2].value == this.hand[3].value){
          tVal2 = this.hand[2].value;
          tKick = this.hand[4].value;
        }
        else{
          tKick = this.hand[2].value;
          tVal2 = this.hand[3].value;
        }
      }
      else{
        tKick = this.hand[0].value;
        tVal1 = this.hand[1].value;
        tVal2 = this.hand[3].value;
      }

      if(h.hand[0].value == h.hand[1].value){
        hVal1 = h.hand[0].value;
        if(h.hand[2].value == h.hand[3].value){
          hVal2 = h.hand[2].value;
          hKick = h.hand[4].value;
        }
        else{
          hKick = h.hand[2].value;
          hVal2 = h.hand[3].value;
        }
      }
      else{
        hKick = h.hand[0].value;
        hVal1 = h.hand[1].value;
        hVal2 = h.hand[3].value;
      }

      if(tVal2 !== hVal2)
        return tVal2 - hVal2;
      if(tVal1 !== hVal1)
        return tVal1 - hVal1;
      return tKick - hKick;
    }
  }
}

module.exports = Hand;

//Tests
const SPADES = 'SPADES';
const CLUBS = 'CLUBS';
const DIAMONDS = 'DIAMONDS';
const HEARTS = 'HEARTS';

const SA = new Card(14, SPADES);
const S2 = new Card(2, SPADES);
const S3 = new Card(3, SPADES);
const S4 = new Card(4, SPADES);
const S5 = new Card(5, SPADES);
const S6 = new Card(6, SPADES);
const S7 = new Card(7, SPADES);
const S8 = new Card(8, SPADES);
const S9 = new Card(9, SPADES);
const S10 = new Card(10, SPADES);
const SJ = new Card(11, SPADES);
const SQ = new Card(12, SPADES);
const SK = new Card(14, SPADES);

const CA = new Card(14, CLUBS);
const C2 = new Card(2, CLUBS);
const C3 = new Card(3, CLUBS);
const C4 = new Card(4, CLUBS);
const C5 = new Card(5, CLUBS);
const C6 = new Card(6, CLUBS);
const C7 = new Card(7, CLUBS);
const C8 = new Card(8, CLUBS);
const C9 = new Card(9, CLUBS);
const C10 = new Card(10, CLUBS);
const CJ = new Card(11, CLUBS);
const CQ = new Card(12, CLUBS);
const CK = new Card(14, CLUBS);

const DA = new Card(14, DIAMONDS);
const D2 = new Card(2, DIAMONDS);
const D3 = new Card(3, DIAMONDS);
const D4 = new Card(4, DIAMONDS);
const D5 = new Card(5, DIAMONDS);

const HA = new Card(14, HEARTS);
const H2 = new Card(2, HEARTS);
const H3 = new Card(3, HEARTS);
const H4 = new Card(4, HEARTS);
const H5 = new Card(5, HEARTS);
const H6 = new Card(6, HEARTS);

// h1 = new Hand([H3,H4,H5,H6,H2]);
// console.log(h1);
//
// h2 = new Hand([S4,S5,S6,D5,D4]);
// h3 = new Hand([S4,S5,S7,D5,D4]);
// console.log(h2.compareTo(h3));
//
// h4 = new Hand([S4,S5,C4,D5,D4]);
// h5 = new Hand([S4,S5,C5,D5,D4]);
// console.log(h4.compareTo(h5));
//
// console.log(h4.compareTo(h2));
//
// h6 = new Hand([S4,S5,C4,H4,D4]);
// h7 = new Hand([S4,S5,C5,H5,D5]);
// console.log(h6.compareTo(h7));
//
// h10 = new Hand([CA,DA,H4,D4,C7]);
// console.log(h10);
