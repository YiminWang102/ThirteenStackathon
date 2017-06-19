const router = require('express').Router();
const Game = require('../../src/Game.js');
module.exports = router;


const rooms = [
  {
    leader: {
      nickname: 'dankmeme123',
      socketId: 'abcdefg'
    },
    players: [],
    game: null
  }
];

router.param('roomId', (req, res, next, id) => {
  req.room = rooms[+id];
  next();
});

router.post('/game/:roomId', (req, res, next) => {
  console.log(req.room);
  const room = req.room;
  if (!room.game){
    room.game = new Game(room.players);
  }
  res.send(room.game.start());
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
    room.players.push(player);
    res.send(room);
  }
  else res.sendStatus(204);
});

router.delete('/:roomId/:nickname', (req, res, next) => {
  const nickname = req.params.nickname;
  const room = req.room;
  console.log('removing', nickname, 'from room', req.params.roomId);
  if (room.leader.nickname === nickname) rooms.splice(+req.params.roomId, 1);
  else {
    const newPlayers = room.players.filter(playerInRoom => {
      return nickname !== playerInRoom.nickname;
    });
    room.players = newPlayers;
  }
  res.sendStatus(204);
});
