var express = require('express');
const pool = require('./pool');
var router = express.Router();


/* GET home page. */
router.post('/chkadminlogin', function (req, res, next) {
    pool.query("select * from admins where emailid=? and password=?", [req.body.emailid, req.body.password], function (error, result) {
        if (error) {
            res.status(500).json({ result: false })

        }
        else {
            if (result.length == 0)
                res.status(200).json({ result: false })
            else
                res.status(200).json({ result: true, data: result })

        }


    })


});

module.exports = router;
