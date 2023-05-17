const redis = require('../redis');
const express = require('express');
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET Statistics listing */ 
router.get('/statistics', async (req, res) => {
  const redisCount = await redis.getAsync('todoCounter');
  if (redisCount === null) {
    await redis.setAsync('todoCounter', 0);
  }

  res.send({ added_todos: redisCount })
})

module.exports = router;
