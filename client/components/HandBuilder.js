import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from './Card';
import axios from 'axios';


const suits = ['SPADES', 'HEARTS', 'CLUBS', 'DIAMONDS'];

const HandRow = props => {
  return (
    <div>
      <container className="container">
        {props.cards.map(card => <Card scale="0.85" cardToBeSwapped={props.cardToBeSwapped} swap={props.swap} key={card.value + card.suit} card={card} />)}
      </container>
    </div>
  )
}

export default class HandBuilder extends React.Component {
  constructor(){
    super();
    this.state = {
      cardList: [],
      selectedCards: [],
      cardToBeSwapped: null,
      builtHand: []
    }

    this.swap = this.swap.bind(this);
    this.generateHand = this.generateHand.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset(){
    const newState = {
      cardList: [],
      selectedCards: [],
      cardToBeSwapped: null,
      builtHand: []
    }
    for(let j = 0; j < 4; j++)
      for(let i = 2; i < 15; i++)
        newState.cardList.push({value: i, suit: suits[j]});
    for(let i = 0; i < 13; i++)
      newState.selectedCards.push({value: null, suit:'temp' + i});
    this.setState(newState);
  }

  componentDidMount(){
    this.reset();
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

  generateHand(){
    axios.post('/api/rooms/help', this.state.selectedCards)
    .then(res => res.data)
    .then(cards => {
      console.log(cards);
      this.setState({builtHand: cards})
    })
  }

  render(){
    const {cardList, selectedCards, builtHand} = this.state;
    return (
      <div>
      {
      builtHand.length ?
          <div>
            <button onClick={this.reset} className="btn btn-default">Reset</button>
            <container className="container col-md-12">
              <HandRow cards={builtHand.slice(0,3)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
              <HandRow cards={builtHand.slice(3,8)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
              <HandRow cards={builtHand.slice(8,13)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
            </container>
          </div>
        :
          <div>
            <container className="container col-md-12">
              <h1 display="inline">Build Your Hand</h1>
              <button onClick={this.generateHand} display="inline" className="btn btn-primary">Build Hand</button>
            </container>
            <container className="container col-md-6">
              <HandRow cards={cardList.slice(0,13)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
              <HandRow cards={cardList.slice(13,26)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
            </container>
            <container className="container col-md-6">
              <HandRow cards={cardList.slice(26,39)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
              <HandRow cards={cardList.slice(39,52)} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
            </container>
            <container className="container col-md-12">
              <HandRow cards={selectedCards} cardToBeSwapped={this.state.cardToBeSwapped} swap={this.swap}/>
            </container>
          </div>
        }
        </div>
    );
  }
}
