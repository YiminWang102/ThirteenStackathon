import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const HomePage = props => {
  return (
    <div>
      <h1>WELCOME TO PLAY THIRTEEN</h1>
      <Link to="/handbuilder" className="btn btn-default">Hand Builder</Link>
      <Link to="/practice" className="btn btn-default">Practice Against Computers</Link>
      <Link to="/play" className="btn btn-default">Play Against People</Link>
    </div>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(HomePage);
