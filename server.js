'use strict'

const mongoose = require('mongoose');
const express = require('express');
const mongo = require('mongo');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {PORT, DATABASE_URL, AWSID, AWSSECRET, AWSTAG} = require('./config');
const {User} = require('./models');
const router = express.Router();
const {BasicStrategy} = require('passport-http')
const validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
mongoose.Promise = global.Promise;

app.use(express.static('build'));
app.use(express.static('sweetalert-master'));
app.use(jsonParser);
app.use(morgan('common'));


// <-------- Sign up by using 'POST' method ---------> 

app.post('/signup', (req, res) => {
    if (!req.body) {
      res.statusMessage = "No request body";
      return res.status(400).end();
    }

    var {username, email, password, passwordConfirmation} = req.body;

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
      res.statusMessage = "password must match";
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
      return res.status(201).json(user.apiRepr());
    }).catch(error => {
      res.statusMessage = "Internal server error";
      return res.status(500).end();
    });
});

// <---------- Log in by using basicStrategy ------------>

const basicStrategy = new BasicStrategy({ disableBasicChallenge: true },function(username, password, callback) {
  let user;

  User
    .findOne({ $or:[{'username': username}, {'email':username}] })
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect username'});
      }
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

// <-------- Data has $ so we could not save datas in the app's API. 
// We need to clean $ first before storing datas. --------->

function cleanDollars(obj) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (property[0] === '$') {
        delete obj[property];
      } else if (typeof obj[property] == "object") {
        cleanDollars(obj[property]);
      }
    }
  }
  return obj;
}

// <----------- Retrieve data from Amazon API -------------->

var amazon = require('amazon-product-api');
var client = amazon.createClient({
  awsId: AWSID,
  awsSecret: AWSSECRET,
  awsTag: AWSTAG
});

app.get('/amazon/search', function(req, res){
  var page = req.query.page;

  if (page === '') {
    page = 1;
  } else {
    page = parseInt(page);
  }

  client.itemSearch({
    keywords: req.query.search_text,
    searchIndex: req.query.category,
    sort: 'salesrank', 
    responseGroup: 'ItemAttributes, Offers, Images, Reviews, PromotionSummary',
    itemPage: page,
    // TotalPages: "All",
    }, function(err, data){
      console.log('searcherror', err, data);
      res.json(data);
    }
  );
}); 

app.get('/amazon/product_details', function(req, res){
  client.itemLookup({
    idType: 'ASIN',
    itemId: req.query.ASIN,
    responseGroup: 'ItemAttributes, Offers, Images, Reviews, PromotionSummary'
  }, function(err, data) {
    if (err) {
      console.log('err', err);
      res.json(err)
    } else {
      res.json(data);
    }
  });
});

app.post('/favorites',
    passport.authenticate(
        'basic',
        {session: false}
    ),
    (req, res) => {
      let product = cleanDollars(req.body);
      User.findByIdAndUpdate(
        req.user._id,
        {$push: {"favorites": {product}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
          res.json(model.favorites);
        }
      );
    }
);

app.get('/favorites',
    passport.authenticate(
        'basic',
        {session: false}
    ),
    (req, res) => {
      res.json(req.user.favorites);
    }
);

app.delete('/favorites',
    passport.authenticate(
        'basic',
        {session: false}
    ),
    (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {$pull: {"favorites": {_id: req.body._id}}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
          res.json(req.user.favorites);
        });
});

let server;

function runServer(databaseUrl) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
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









