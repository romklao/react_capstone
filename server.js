
const mongoose = require('mongoose');
const express = require('express');
const mongo = require('mongo');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {PORT, DATABASE_URL} = require('./config');
const {User} = require('./models');
const router = express.Router();
const {BasicStrategy} = require('passport-http')
const validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const bcrypt = require('bcrypt');

const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


app.use(express.static('build'));
app.use(jsonParser);
app.use(morgan('common'));

app.post('/signup', (req, res) => {
    console.log('signup')

    if (!req.body) {
      res.statusMessage = "No request body";
      return res.status(400).end();
    }

    var {username, email, password, passwordConfirmation} = req.body;
            console.log('req.body', req.body)

    if (!('username' in req.body)) {
      res.statusMessage = "Incorrect field: username";
      return res.status(422).end();
    }

    if (typeof username !== 'string') {
      res.statusMessage = "Incorrect field type: username";
      return res.status(422).end();
    }

    username = username.trim();

    if (username === '') {
      res.statusMessage = "Missing field: username";
      return res.status(422).end();
    }

    if (!(email)) {
      res.statusMessage = "Missing field: email";
      return res.status(422).end();
    return res.status(422).send('Missing field: email');
    }

    if (typeof email !== 'string') {
      res.statusMessage = "Incorrect field type: email";
      return res.status(422).end();
    }

    email = email.trim();

    if (email === '') {
      res.statusMessage = "Missing field: email";
      return res.status(422).end();
    }

    if (!(password)) {
      res.statusMessage = "Missing field: password";
      return res.status(422).end();
    }

    if (typeof password !== 'string') {
      res.statusMessage = "Incorrect field type: password";
      return res.status(422).end();
    }

    password = password.trim();

    if (password === '') {
      res.statusMessage = "Missing field: password";
      return res.status(422).end();
    }

    if (!(passwordConfirmation)) {
      res.statusMessage = "Missing field: confirm password";
      return res.status(422).end();
    }

    if (typeof passwordConfirmation !== 'string') {
      res.statusMessage = "Incorrect field type: confirm password";
      return res.status(422).end();
    }

    passwordConfirmation = passwordConfirmation.trim();

    if (passwordConfirmation === '') {
      res.statusMessage = "Missing field: confirm password";
      return res.status(422).end();
    }

    if (password !== passwordConfirmation) {
      res.statusMessage = "password and confirm password must match";
      return res.status(422).end();
    }
    // check for existing user
    return User
    .find({email})
    .count()
    .exec()
    .then(count => {

      if (count > 0) {
        res.statusMessage = "email already taken";
        return res.status(422).end();
      }
      // if no existing user, hash password
      return User.hashPassword(password)
    }).then(hash => {
      return User
        .create({
          username: username,
          password: hash,
          email: email
        })
    }).then(user => {
      console.log('user', user)
      return res.status(201).json(user.apiRepr());
    }).catch(error => {
      res.statusMessage = "Internal server error";
      return res.status(500).end();
    });
});


// passport.use(new LocalStrategy(
//     function(username, password, done) {
//     User
//       .findOne({ username: username }, function(error, user) {
//           console.log('user', user)
//           if (error) { 
//             return done(error); 
//           }
//           if (!user) {
//             return done(null, false, { message: 'Incorrect username.' });
//           }
//           if (!user.validPassword(password)) {
//             return done(null, false, { message: 'Incorrect password.' });
//           }
//           return done(null, user);
//     });
//   }
// ));

// app.use(passport.initialize());

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });

// app.post('/login',
//   passport.authenticate(
//     'local', 
//     {session: true}),
//     (req, res) => res.json({user: req.user.apiRepr()})
// );

const basicStrategy = new BasicStrategy({ disableBasicChallenge: true },function(username, password, callback) {
    console.log('username', username, 'password', password);
  let user;

  User
    .findOne({ $or:[{'username': username}, {'email':username}] })
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      console.log('user', user);
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, user)
      }
    });
});

passport.use(basicStrategy);
app.use(passport.initialize());

app.post('/login',
  passport.authenticate(
    'basic',
    {session: false}),
    (req, res) => res.json({user: req.user.apiRepr()})
);


var amazon = require('amazon-product-api');
var client = amazon.createClient({
  awsId: "AKIAJMVO6AWNUL6FKAYQ",
  awsSecret: "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",
  awsTag: "home202007-20"
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









