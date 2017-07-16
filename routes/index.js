var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Timestamp Microservice' });
});

router.get('/:time', function(req, res, next) {

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

module.exports = router;