const redis = require('../redis');
const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();

/* GET todos listing. */
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const data = await Todo.findById(id);

  res.send(data);
});

router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  try {
    const redisCounter = await redis.getAsync('todoCounter');
    const todoCounter = !Number(redisCounter) ? 0 : Number(redisCounter); 

    const todo = await Todo.create({
      text: req.body.text,
      done: false,
    });

    await redis.setAsync('todoCounter', todoCounter + 1);

    res.send(todo);
  } catch (error) {
    res.sendStatus(400);
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* DELETE individual todo by id */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedData = await Todo.findByIdAndDelete(id);
  res.status(200).send(deletedData);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
