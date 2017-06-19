import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const GamePage = props => {
  return (
    <div>
      <h1>THIS IS THE GAME</h1>
    </div>
  );
}

const mapState = () => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(GamePage);
