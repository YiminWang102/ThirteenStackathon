const Hand = require('./Hand');
const Deck = require('./Deck');
const Thirteen = require('./ThirteenAi');

class Game {
  constructor(players){
    this.players = players;
    this.score = [0,0,0,0];
    this.deck = new Deck();
  }

  start() {
    this.deck.shuffle();
    return this.deck.split();
  }

  //takes an array of array of hands
  calculateScore(HandsArr){
    const ans = [0,0,0,0];
    for(let i = 0; i < HandsArr.length - 1; i++){
      let cards1 = HandsArr[i];
      // console.log(cards1);
      let hands1 = [];
      cards1.forEach(hand => hands1.push(hand));
      // hands1.push(new Hand(cards1.slice(0,3)));
      // hands1.push(new Hand(cards1.slice(3,8)));
      // hands1.push(new Hand(cards1.slice(8,13)));
      for(let j = i+1; j < HandsArr.length; j++){
        let cards2 = HandsArr[j];
        let hands2 = [];
        cards2.forEach(hand => hands2.push(hand));
        // hands2.push(new Hand(cards2.slice(0,3)));
        // hands2.push(new Hand(cards2.slice(3,8)));
        // hands2.push(new Hand(cards2.slice(8,13)));
        //console.log(hands1, '\n',hands2);
        let score = hands1.map((hand, i) => {
          console.log(hand, '\n', hands2[i]);
          console.log(hand.compareTo(hands2[i]));
          return hand.compareTo(hands2[i]);
        }).reduce((acc, val) => {
          let point = 0;
          if (val < 0) point = -1;
          else if(val > 0) point = 1;
          return acc + point;
        }, 0);
        ans[i] += score;
        ans[j] -= score;
      }
    }
    return ans;
  }

  updateScore(scoreArr){
    this.score = this.score.map((s, i) => {
      return s += scoreArr[i];
    });
    return this.score;
  }
}

module.exports = Game;


//tests
// const s1 = "kdkc7dtctd5h5c2dacahasjdjh";
// const cards1 = Thirteen.prototype.convert(s1);
// const s2 = "7s6c5d8d8s8h3d4s5c5h5sjdjh";
// const cards2 = Thirteen.prototype.convert(s2);
// const s3 = "adac9d9c9d5h5c2dac3hkskdkh";
// const cards3 = Thirteen.prototype.convert(s3);
// const s4 = "acahad6d6d7d8djd2h3h4h5h6h";
// const cards4 = Thirteen.prototype.convert(s4);
//
// const deck = new Deck();
// deck.shuffle();
// hands = deck.split();
// builtHands = hands.map(hand => {
//   const stringyHands = hand.map(card => card.toVSFormat()).join('');
//   return Thirteen.prototype.play(Thirteen.prototype.convert(stringyHands));
//   // handerinos.forEach(hander => console.log(hander));
//   // return handerinos.map(hander => hander.toVSFormat()).join('');
// });
// console.log(builtHands);
// const game = new Game();
// let cards = game.start();
// let score = game.calculateScore(builtHands);
//
// // const score = Game.prototype.calculateScore([cards1,cards2,cards3,cards4]);
// console.log(score);
