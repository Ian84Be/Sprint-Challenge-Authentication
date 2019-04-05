const axios = require('axios');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;
const { authenticate } = require('../auth/authenticate');

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, jwtKey, options);
}

const db = require('../database/dbConfig.js');

async function register(req, res) {
  let user = req.body;
  if (!user.username || !user.password) {
      res.status(400).json({error:'please provide username/password/department'});
  } else {
    try {
      user.password = bcrypt.hashSync(user.password, 8);
      const [id] = await db('users').insert(user);
      if (id) {
          const newUser = await db('users').where({id}).first();
          const token = generateToken(newUser);
          res.status(201).json({message: `welcome ${newUser.username}`,token});
      }
    }
    catch(err) {
        res.status(500).json(err);
    }
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
      res.status(400).json({error:'please provide username/password'});
  } else {
      try {
          const [validUser] = await db('users').where({username});
          if (validUser && bcrypt.compareSync(password, validUser.password)) {
              const token = generateToken(validUser);
              res.status(200).json({message: `${validUser.username} LOGGED IN`,token});
          } else {
              res.status(401).json({message:'invalid credentials'});
          }
      }
      catch(err) {
          res.status(500).json(err);
      }
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
