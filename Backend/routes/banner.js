var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

/* GET users listing. */
router.post("/savebannerimages", upload.any(), function (req, res, next) {
    var q = "insert into banner(bannerstatus,bannerpicture)values ?"
    pool.query(q, [req.files.map((item) => [req.body.bannerstatus, item.filename])], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ result: false });
        }
        else {            
            res.status(200).json({ result: true });
        }
    })
})

router.get('/displayallbanner', function (req, res) {
    pool.query("select * from banner", function (error, result) {
        if (error) {
            res.status(500).json({ result: [] })
        }
        else {
            res.status(200).json({ result: result })
        }
    })
})

router.post('/deletebanner', function (req, res, next) {
    pool.query("delete from  banner  where bannerid=?", [req.body.bannerid], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ result: false, msg: 'Server Error' })
        }
        else {
            res.status(200).json({ result: true, msg: 'Deleted' })

        }
    })
})


module.exports = router;