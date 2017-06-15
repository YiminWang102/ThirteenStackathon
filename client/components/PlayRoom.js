import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Room from './Room';
import {setPlayer} from '../reducer/player';
import axios from 'axios';
import { browserHistory } from 'react-router';


const PlayRoom = props => {

  const {chooseNickname, nickname} = props;
  return (
    <div>
      <h1>THIS IS THE PLAYROOM</h1>
      {
        nickname ?
        <h2>Welcome {nickname}</h2> :
        <form onSubmit={chooseNickname}>
          Choose a nickname:
          <input type="text" name="nickname"/>
          <button type="submit" className="btn btn-default"> Select </button>
        </form>
      }
      <Link to="/room" className="btn btn-default">Go To Room</Link>
    </div>
  );
}

const io = require('socket.io-client');
const socket = io();

const mapState = store => ({
  nickname: store.player.nickname,
  socketId: store.player.socketId
});

const mapDispatch = dispatch => ({
  chooseNickname: event => {
    event.preventDefault();
    const nickname = event.target.nickname.value;
    console.log(nickname);
    socket.emit('userName', nickname);
    dispatch(setPlayer({
      nickname,
      socketId: socket.id
    }));
  },

});

export default connect(mapState, mapDispatch)(PlayRoom);
