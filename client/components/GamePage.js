import React from 'react';
import Card from './Card';

const fakeCards = [];
const vals = [2,3,4,5]
const suits = ['HEARTS', 'CLUBS', 'SPADES','DIAMONDS']
for(let i = 0; i < suits.length; i++) {
  for(let j = 2; j < 7; j++)
    fakeCards.push({
      value: j,
      suit: suits[i]
    })
}
const HandRow = props => {
  return (
    <div>
      <container className="container">
      {props.cards.map(card => <Card cardToBeSwapped={props.cardToBeSwapped} swap={props.swap} key={card.value + card.suit} card={card} />)}
      </container>
    </div>
  )
}

class GamePage extends React.Component {
  constructor(props) {
    super(props);

    const cardsToBe = [];
    for(let i = 0; i < 13; i++) cardsToBe.push({value: null, suit: 'temp' + i});
    this.state = {
      cardsToBeSubmitted: cardsToBe,
      cardToBeSwapped: null,
      error: '',
      message: ''
    }

    this.swap = this.swap.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.submitHand = this.submitHand.bind(this);
  }

  swap(cardToBeSwapped) {
    if(this.state.cardToBeSwapped){
      const tempValue = cardToBeSwapped.value;
      const tempSuit = cardToBeSwapped.suit;
      cardToBeSwapped.value = this.state.cardToBeSwapped.value;
      cardToBeSwapped.suit = this.state.cardToBeSwapped.suit;
      this.state.cardToBeSwapped.value = tempValue;
      this.state.cardToBeSwapped.suit = tempSuit;
      this.setState({
        cardToBeSwapped: null
      })
    }
    else this.setState({cardToBeSwapped})
  }

  canSubmit(){
    return this.state.cardsToBeSubmitted.every(card => card.value);
  }

  submitHand(){
    if(this.canSubmit()) {
      this.props.submitHand(this.state.cardsToBeSubmitted.slice(0,13))
      this.setState({message: "PLEASE WAIT FOR OTHER PLAYERS TO FINISH BUILDING THEIR HANDS"})
    }
    else this.setState({error: "PLEASE SUBMIT A FULL HAND"})
  }

  render(){
    const {cardsToBeSubmitted, error, message} = this.state;
    return (
      <div>
        <div className="container col-md-12">
          {
            message ? <h2 className="alert alert-success">{message}</h2> :
            error ? <h2 className="alert alert-warning">{error}</h2> : <h2 className="alert alert-info">BUILD YOUR HAND</h2>
          }
        </div>
        <div className="container col-md-12">
          {message ? null :
            <button onClick={this.submitHand} display="inline" className="btn btn-primary">Submit Hand</button>
          }
        </div>
        <container className="container col-md-6">
          <HandRow cards={this.props.cards.slice(0,3)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
          <HandRow cards={this.props.cards.slice(3,8)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
          <HandRow cards={this.props.cards.slice(8,13)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
        </container>
        <container className="container col-md-6">
          <HandRow cards={cardsToBeSubmitted.slice(0,3)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
          <HandRow cards={cardsToBeSubmitted.slice(3,8)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
          <HandRow cards={cardsToBeSubmitted.slice(8,13)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
        </container>
      </div>
    );
  }
}
export default GamePage
