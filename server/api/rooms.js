const router = require('express').Router();
const Game = require('../../src/Game.js');
module.exports = router;


const rooms = [
  {
    leader: {
      nickname: 'dankmeme123',
      socketId: 'abcdefg'
    },
    players: []
  }
];

router.param('roomId', (req, res, next, id) => {
  req.room = rooms[+id];
  next();
});

router.get('/', (req, res, next) => {
  res.send(rooms);
});

router.post('/', (req, res, next) => {
  rooms.push({
    leader: undefined,
    players: []
  });
  res.send({
    room: rooms[rooms.length-1],
    id: rooms.length-1
  });
});

router.get('/:roomId', (req, res, next) => {
  res.send(req.room);
});

router.put('/:roomId',(req, res, next) => {
  const player = req.body;
  const room = req.room;
  if(player.nickname && player.socketId){
    if(!room.leader) room.leader = player;
    else if(room.leader.nickname !== player.nickname) room.players.push(player);
    res.send(room);
  }
  else res.sendStatus(204);
});

router.delete('/:roomId/:nickname', (req, res, next) => {
  const nickname = req.params.nickname;
  const room = req.room;
  console.log('removing', nickname, 'from room', req.params.roomId);
  const newPlayers = room.players.filter(playerInRoom => {
    return nickname !== playerInRoom.nickname;
  });
  room.players = newPlayers;
  res.sendStatus(204);
});
