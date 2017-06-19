const Hand = require('./Hand');
const Card = require('./Card');

class ThirteenAi {

  play(c){
    let top = null;
    let middle = null;
    let bottom = null;

    let Score = 0;

    let printed = false;

    for (let i = 0; i < c.length-4; i++){
      for(let j = i+1; j < c.length-3; j++){
        for(let k = j+1; k < c.length-2; k++){
          for(let l = k+1; l < c.length-1; l++){
            for(let m = l+1; m < c.length; m++){
              let temp = [];
              for(let a = 0; a < c.length; a++)
                temp.push(c[a]);
              let a1 = [];
              a1.push(c[i]);
              a1.push(c[j]);
              a1.push(c[k]);
              a1.push(c[l]);
              a1.push(c[m]);
              temp.splice(i,1);
              temp.splice(j-1,1);
              temp.splice(k-2,1);
              temp.splice(l-3,1);
              temp.splice(m-4,1);
              let tBot = new Hand(a1);
              for (let v = 0; v < temp.length-4; v++)
                for(let w = v+1; w < temp.length-3; w++)
                  for(let x = w+1; x < temp.length-2; x++)
                    for(let y = x+1; y < temp.length-1; y++)
                      for(let z = y+1; z < temp.length; z++){
                        let a2 = [];
                        let temp2 = [];
                        for(let b = 0; b < temp.length; b++)
                          temp2.push(temp[b]);
                        a2.push(temp[v]);
                        a2.push(temp[w]);
                        a2.push(temp[x]);
                        a2.push(temp[y]);
                        a2.push(temp[z]);
                        temp2.splice(v,1);
                        temp2.splice(w-1,1);
                        temp2.splice(x-2,1);
                        temp2.splice(y-3,1);
                        temp2.splice(z-4,1);

                        if(!printed) console.log([temp2, a2, a1].map(dank => dank.toString()));
                        printed = true;

                        let tMid = new Hand(a2);

                        let tTop = new Hand(temp2);

                        if (tBot.compareTo(tMid) >= 0 && tMid.compareTo(tTop) >= 0){
                          //get a score
                          let tScore = tBot.type.value + tMid.type.value + tTop.type.value;
                          //start with three "base" hands
                          if(bottom === null){
                            bottom = tBot;
                            middle = tMid;
                            top = tTop;
                            Score = tScore;
                          }
                          //If score is better, go with new hand
                          if (tScore > Score){
                            Score = tScore;
                            bottom = tBot;
                            middle = tMid;
                            top = tTop;
                          }
                          //here is where you can change up how to play hands if they have same score
                          if(tScore === Score){
                            //prioritize strongest bottom
                            if(tBot.type.value > bottom.type.value){
                              bottom = tBot;
                              middle = tMid;
                              top = tTop;
                            }
                            //middle is next priority
                            //All two-pairs get pushed down.
                            else if(tMid.type.value > middle.type.value){
                              bottom = tBot;
                              middle = tMid;
                              top = tTop;
                            }
                            else if(tTop.compareTo(top) >= 0){
                              bottom = tBot;
                              middle = tMid;
                              top = tTop;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

      let al = [];
      al.push(top);
      al.push(middle);
      al.push(bottom);

      return al;
  }

  convert(s) {
    const c = [];
    for(let i = 0; i < s.length; i+=2){
      let ch1 = s[i];
      let ch2 = s[i+1];
      let suit;
      let value;

      if(ch1 === 'a') value = 14;
      else if(ch1 === 'k') value = 13;
      else if(ch1 === 'q') value = 12;
      else if(ch1 === 'j') value = 11;
      else if(ch1 === 't') value = 10;
      else value = +ch1;

      if (ch2 === 'd') suit = 'DIAMONDS';
      if (ch2 === 's') suit = 'SPADES';
      if (ch2 === 'h') suit = 'HEARTS';
      if (ch2 === 'c') suit = 'CLUBS';

      c.push(new Card(value, suit));
    }
    return c;
  }
}

module.exports = ThirteenAi;


//Tests
//
// const s = "kdkc7dtctd5h5c2d2h3c3hqhqc";
// const cards = ThirteenAi.prototype.convert(s);
// const hands = ThirteenAi.prototype.play(cards);
//
// console.log(hands.map(hand => hand.toString()).join('\n\n'));

// const s = "jd5d8d7d6d2h3h4h5h6hahadac";
// const cards = ThirteenAi.prototype.convert(s);
// const hands = ThirteenAi.prototype.play(cards);
//
// console.log(hands.map(hand => hand.toString()).join('\n\n'));
