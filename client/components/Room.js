import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';

import {setPlayer} from '../reducer/player';


class Room extends React.Component {
  constructor(props) {
    super();
    this.state = {
      leader: {},
      players: [],
      gameState: 0
    };

    socket.on('roomUpdate', payload => {
      const {roomId} = props.routeParams;
      console.log('server broadcasted to room', payload.roomId,'to updateRoom');
      props.getPlayersInRoom(roomId)
        .then(room => {
          this.setState(room);
        })
    });
  }

  render () {
    const {players, leader} = this.state;
    const {chooseNickname, nickname, children} = this.props;
    const {roomId} = this.props.routeParams;
    return (
        !nickname ?
        <form onSubmit={chooseNickname}>
          Choose a nickname:
          <input type="text" name="nickname"/>
          <button type="submit" name="button" value={this.props.routeParams.roomId} className="btn btn-default"> Select </button>
        </form>
        :
        <div>
          <h1>THIS IS THE ROOM</h1>
          <h2>THIS IS THE LEADER: {leader.nickname} </h2>
          <h2>THESE ARE THE PLAYERS: </h2>
          {
            players.map( player => {
              return <h3 key={player.nickname}>{player.nickname}</h3>
            })
          }
          {
            /*players.length === 3 ?*/
            leader.nickname === nickname?
            <button onClick={() => {browserHistory(roomId)}} type="button" name="play" className="btn btn-default">Start Round!</button>
            : null
          }
          { children }
        </div>
    );
  }

  componentDidMount(){
    const {roomId} = this.props.routeParams;
    this.props.getPlayersInRoom(roomId)
      .then( room => {
        this.setState(room);
      });
  }

  componentWillUnmount() {
    console.log('component unmounting');
    const {nickname} = this.props;
    const {roomId} = this.props.routeParams;
    if(nickname) {
      axios.delete(`/api/rooms/${roomId}/${nickname}`)
        .then( () => {
          socket.emit('leave room', {roomId, nickname});
          this.props.resetNickname();
        });
    }
    socket.off();
  }
}

const io = require('socket.io-client');
const socket = io();

const mapState = store => ({
  nickname: store.player.nickname,
  socketId: store.player.socketId
});

const mapDispatch = dispatch => ({
  getPlayersInRoom: roomId => {
    return axios.get(`/api/rooms/${roomId}`)
    .then(res => res.data)
    .catch(console.error.bind(console));
  },
  joinRoom: (roomId, player) => {
    return axios.put(`/api/rooms/${roomId}`, player);
  },
  chooseNickname: event => {
    event.preventDefault();
    const nickname = event.target.nickname.value;
    const roomId = event.target.button.value;
    const player = {nickname, socketId: socket.id};
    dispatch(setPlayer(player));
    addPlayerToRoom(player, roomId)
      .then( () => {
        socket.emit('room', {
          nickname,
          roomId
        })
      });
  },
  resetNickname: () => {dispatch(setPlayer({nickname: ''}))},
  startRound: (self) => {
    self.setState({gameState: 1});
  }
});

const addPlayerToRoom = (player, roomId) => {
  return axios.put(`/api/rooms/${roomId}`, player)
    .catch(console.error.bind(console));
}

export default connect(mapState, mapDispatch)(Room);
