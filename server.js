// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

var routes = require('./routes/index');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

/* */

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Timestamp Microservice' });
});

app.get('/:time', function(req, res, next) {

  function unixToNatural(unix) {
    var time = new Date(unix * 1000),
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        month = months[time.getMonth()],
        date = time.getDate(),
        year = time.getFullYear(),
        naturalDate = month + ' ' + date + ', ' + year,
        data = {
          unix: time / 1000,
          natural: naturalDate
        };

        return data;
  }


  // checks if URL parameter contains numbers only
  if (!isNaN(req.params.time)) {
    var result = unixToNatural(req.params.time);
    res.json(result);
  } else {
    // checks if URL parameter contains valid date
    if (!isNaN(new Date(req.params.time))) {
      var d = new Date(req.params.time),
          x = d.getFullYear(),
          y = d.getMonth(),
          z = d.getDate(),
          utc = new Date(Date.UTC(x,y,z)),
          unix = Date.parse(utc) / 1000;

      var result2 = unixToNatural(unix);
      res.json(result2);
    } else {
      res.json({unix: null, natural: null});
    }
  }
});




// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
