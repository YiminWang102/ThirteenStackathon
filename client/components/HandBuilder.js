import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const HandBuilder = props => {
  return (
    <div>
      <h1>THIS IS THE HANDBUILDER</h1>
    </div>
  );
}

const mapState = () => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(HandBuilder);
