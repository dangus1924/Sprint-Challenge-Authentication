const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Jokes = require('../jokes/jokes-model')

const generateToken = user => {
  const payload = {
    sub: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '5m',
  }
  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

router.post('/register', async (req, res) => {
  // implement registration
  let user = req.body
  const hash = bcrypt.hashSync(user.password, 14)
  user.password = hash

  try {
    const registered = await Jokes.add(user)
    registered ? res.status(201).json(registered) : res.status(404)
  } catch(err) {
    res.status(500).json({ error: err.message})

  }
});

router.post('/login', async (req, res) => {
  // implement login
  let { username, password } = req.body;
  try {
    const login = await Jokes.findBy({ username }).first()
    if (login && bcrypt.compareSync(password, login.password)) {
      const token = generateToken(login)
      res.status(200).json({
        message: `Welcome ${login.username}!`,
        token 
      })
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({
      error: err.message
    })
  }
});

module.exports = router;
