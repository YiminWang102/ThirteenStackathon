import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';

import GamePage from './GamePage';
import {setPlayer} from '../reducer/player';


class Room extends React.Component {
  constructor(props) {
    super();
    this.state = {
      leader: {},
      players: [],
      gameState: 0,
      cards: []
    };

    socket.on('roomUpdate', payload => {
      const {roomId} = props.routeParams;
      console.log('server broadcasted to room', payload.roomId,'to updateRoom');
      props.getPlayersInRoom(roomId)
        .then(room => {
          this.setState(room);
        })
    });

    socket.on('startRound', payload => {
      // const {roomId} = props.routeParams;
      const cards = payload;
      console.log('server broadcasted to room', payload.roomId, 'to startRound');
      console.log(payload);
      this.setState({
        gameState: 1,
        cards
      })

    })
  }

  render () {
    const self = this;
    const roomId = this.props.routeParams.roomId;
    const {players, leader, gameState} = this.state;
    const {chooseNickname, nickname, startRound} = this.props;
    return (
        !gameState ?
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
              <button onClick={() => {startRound(self, roomId)}} type="button" name="play" className="btn btn-default">Start Round!</button>
              : null
            }
          </div>
        :
        <GamePage {...this.state}/>
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
    socket.emit('leave room', {roomId, nickname});
    socket.off();
    if(nickname) axios.delete(`/api/rooms/${roomId}/${nickname}`);
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
  startRound: (self, roomId) => {
    axios.post(`/api/rooms/game/${roomId}`)
      .then(res => res.data)
      .then(() => {
        socket.emit('startRound', {roomId});
      })
    // self.setState({gameState: 1});
  }
});

const addPlayerToRoom = (player, roomId) => {
  return axios.put(`/api/rooms/${roomId}`, player)
    .catch(console.error.bind(console));
}

export default connect(mapState, mapDispatch)(Room);
