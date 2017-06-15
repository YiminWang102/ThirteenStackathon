const router = require('express').Router();
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
  const player = req.body.player;
  rooms.push({
    leader: player,
    players: []
  });
});

router.get('/:roomId', (req, res, next) => {
  res.send(req.room);
});

router.put('/:roomId',(req, res, next) => {
  console.log(req.body);
  const player = req.body;
  const room = req.room;
  room.players.push(player);
  res.send(room);
});
