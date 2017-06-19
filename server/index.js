const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const PORT = process.env.PORT || 8080;
const app = express();

const rooms = require('./api/rooms');

module.exports = app;

const createApp = () => app
  .use(morgan('dev'))
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use(express.static(path.join(__dirname, '..', 'public/cards')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api/rooms', rooms.router)
  .use('/api', require('./api'))
  .use((req, res, next) =>
    path.extname(req.path).length > 0 ? res.status(404).send('Not found') : next())
  .use('*', (req, res) =>
    res.sendFile(path.join(__dirname, '..', 'public/index.html')))
  .use((err, req, res, next) =>
    res.status(err.status || 500).send(err.message || 'Internal server error.'));

createApp();
const server = app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('room', data => {
    const {roomId, nickname} = data;
    socket.join(roomId);
    console.log(nickname, 'joined room number', roomId);
    io.sockets.in(roomId).emit('roomUpdate', {roomId});
  });

  socket.on('leave room', data => {
    const {roomId, nickname} = data;
    console.log('player with nickname', nickname, 'is leaving room number', roomId);
    socket.leave(roomId);
    io.sockets.in(roomId).emit('roomUpdate', {roomId});
  });

  socket.on('startRound', data => {
    const {roomId} = data;
    const {players, game} = rooms.rooms[roomId];
    const deck = game.deck.split();
    players.forEach((player, i) => {
      io.sockets.connected[player.socketId].emit('startRound', deck[i]);
    });
    console.log('Starting Round');
  });

});
