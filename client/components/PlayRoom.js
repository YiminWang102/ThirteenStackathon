import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Room from './Room';
import {setPlayer} from '../reducer/player';
import axios from 'axios';
import { browserHistory } from 'react-router';


class PlayRoom extends React.Component {
  constructor(){
    super();
    this.state = {
      rooms: []
    }
  }

  render() {
    const {chooseNickname, createLobby, nickname, socketId} = this.props;
    const {rooms} = this.state;
    return (
      <div>
        <h1>THIS IS THE PLAYROOM</h1>
        {
          <div>
            {
              rooms.map( (room, id) => {
                return (
                  <Link key={id} to={`/room/${id}`} className="btn btn-default">Go To Lobby #{id}</Link>
                )
              })
            }
            <button type="button" className="btn btn-primary" onClick={()=>{createLobby({nickname, socketId})}}>Create New Lobby</button>
          </div>
        }
      </div>
    );
  }

  componentDidMount(){
    this.props.getRooms()
      .then(rooms => {
        this.setState({rooms})
      })
  }
}

// const io = require('socket.io-client');
// const socket = io();

const mapState = store => ({
  nickname: store.player.nickname,
});

const mapDispatch = dispatch => ({
  getRooms: () => axios.get('/api/rooms').then(res => res.data),
  createLobby: player => {
    axios.post('/api/rooms', player)
      .then(res => res.data)
      .then(roomInfo => {
        browserHistory.push(`/room/${roomInfo.id}`);
      })
      .catch(console.error.bind(console));
  }

});

export default connect(mapState, mapDispatch)(PlayRoom);
