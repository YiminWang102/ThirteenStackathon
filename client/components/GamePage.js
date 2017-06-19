import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
      {props.cards.map(card => <Card key={card.value + card.suit} card={card} />)}
      </container>
    </div>
  )
}

const GamePage = props => {
  const {players, cards} = props;
  return (
    <div>
      <div className="container col-md-12">
        <h1>THIS IS THE GAME</h1>
      </div>
      <div className="container col-md-12">
        <button display="inline-block" className="btn btn-primary">Submit Hand</button>
      </div>
      <container className="container col-md-6">
        <HandRow cards={fakeCards.slice(0,3)}/>
        <HandRow cards={fakeCards.slice(3,8)}/>
        <HandRow cards={fakeCards.slice(8,13)}/>
      </container>
      <container className="container col-md-6">
        <div>
          <h1>temp hi</h1>
        </div>
      </container>
    </div>
  );
}

const mapState = () => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(GamePage);
