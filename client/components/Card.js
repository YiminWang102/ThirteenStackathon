import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Card = props => {
  const {card} = props;
  const cardMap = [
    2,3,4,5,6,7,8,9,10,'jack','queen','king','ace'
  ];
  const name = cardMap[card.value-2] + '_of_' + card.suit.toLowerCase() + '.png';
  return (
      <img style={{margin:"3px"}}display="inline-block" src={`/${name}`} width={(100/13 * 2) + '%'} />
  );
}

const mapState = () => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(Card);
