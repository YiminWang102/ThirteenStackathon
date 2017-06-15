import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';

class Room extends React.Component {
  constructor() {
    super();
    this.state = {
      leader: {},
      players: []
    };
  }

  render () {
    return (
      <div>
        <h1>THIS IS THE ROOM</h1>
        <h2>THIS IS THE LEADER: {this.state.leader.nickname} </h2>
        <h2>THESE ARE THE PLAYERS: </h2>
      </div>
    );
  }

  componentDidMount(){
    this.props.joinRoom({
      nickname: this.props.nickname,
      socketId: this.props.socketId
    })
      .then( () => this.props.getPlayersInRoom())
      .then( room => {
        console.log(room);
        this.setState(room);
      });
  }
}

const mapState = store => ({
  nickname: store.player.nickname,
  socketId: store.player.socketId
});

const mapDispatch = dispatch => ({
  getPlayersInRoom: () => {
    return axios.get('/api/rooms/0')
    .then(res => res.data)
    .catch(console.error.bind(console));
  },
  joinRoom: player => {
    return axios.put('/api/rooms/0', player);
  }
});

export default connect(mapState, mapDispatch)(Room);
