var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.createConnection('mongodb://localhost/');

// mongoose.connection.on('error', function(err) {
//     console.error('Could not connect.  Error:', err);
// });

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const {PORT, DATABASE_URL} = require('./config');


var app = express();

// app.use(express.static('build'));

var jsonParser = bodyParser.json();

app.use(jsonParser);
// var passport = require('passport');

var amazon = require('amazon-product-api');


// var client = amazon.createClient({
//   awsId: "AKIAJMCTZQBGGVALF5MQ",
//   awsSecret: "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",
//   awsTag: "yosuke-assignment-20"
// });

var client = amazon.createClient({
  awsId: "AKIAIFAXTMOZPQMH7NKA",
  awsSecret: "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",
  awsTag: "yosuke-assignment-20"
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







