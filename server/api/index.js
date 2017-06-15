const router = require('express').Router();
module.exports = router;

router.use('/rooms', require('./rooms'));

router.use((req, res) => {
  res.status(404).send('Not found');
});
