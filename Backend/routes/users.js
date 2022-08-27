var express = require('express');
var router = express.Router();
var pool = require('./pool')

/* GET users listing. */
router.post('/checkmobile', function (req, res, next) {
  pool.query("select * from users where mobileno=?", [req.body.mobileno], function (error, result) {
    if (error) {
      res.status(500).json({ result: false })
    }
    else {
      if (result.length == 1) {
        res.status(200).json({ result: true, data: result })
      }
      else {
        res.status(200).json({ result: false })
      }
    }
  })
});

router.post('/adduser', function (req, res, next) {
  pool.query("insert into  users values(?,?,?,?)", [req.body.mobileno, req.body.emailid, req.body.firstname, req.body.lastname], function (error, result) {
    if (error) {
      res.status(500).json({ result: false })
    }
    else {
      res.status(200).json({ result: true })
    }
  })
});

module.exports = router;
