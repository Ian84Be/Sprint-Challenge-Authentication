const axios = require('axios');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const db = require('../database/dbConfig.js');

async function register(req, res) {
  console.log(req);
  if (!req.body.username || !req.body.password) {
    res.status(400).json({error:'Please provide username/password'});
  } else {
    try {
      const [newUser] = await db('users').insert(req.body);
      if (newUser) {
        res.status(201).json(newUser);
      }
    }
    catch(err) {
      res.status(500).json(err);
    }
  }
}

function login(req, res) {
  // implement user login
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
