const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const express = require('express');
const mongo = require('mongo');
const bodyParser = require('body-parser');
const {PORT, DATABASE_URL} = require('./config');
const passport = require('passport');
const jsonParser = bodyParser.json();

const app = express();

app.use(express.static('build'));
app.use(jsonParser);

var amazon = require('amazon-product-api');




app.post('/signup', (req, res) => {
    if (!req.body) {
    return res.status(400).json({message: 'No request body'});
    }

    if (!('username' in req.body)) {
    return res.status(422).json({message: 'Missing field: username'});
    }

    let {username, password, email} = req.body;

    if (typeof username !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: username'});
    }

    username = username.trim();

    if (username === '') {
    return res.status(422).json({message: 'Missing field: username'});
    }

    if (!(password)) {
    return res.status(422).json({message: 'Missing field: password'});
    }

    if (typeof password !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: password'});
    }

    password = password.trim();

    if (password === '') {
    return res.status(422).json({message: 'Incorrect field length: password'});
    }

    if (!(email)) {
    return res.status(422).json({message: 'Missing field: email'});
    }

    if (typeof email !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: email'});
    }

    email = email.trim();

    if (email === '') {
    return res.status(422).json({message: 'Incorrect field length: email'});
    }

    // check for existing user
    return User
    .find({username})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({message: 'username already taken'});
      }
      // if no existing user, hash password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          username: username,
          password: hash,
          email: email
        })
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'})
    });
});


app.get('/amazon/:index', function(req, res){
    console.log(req.params.index);
    client.itemSearch({
      keywords: req.params.index,
      searchIndex: 'All',
      responseGroup: 'ItemAttributes,Offers,Images'
      }, function(err, data){
        console.log(data);
        res.json(data);
      }
    );
});

let server;

function runServer(databaseUrl) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
};

module.exports = {app, runServer};









