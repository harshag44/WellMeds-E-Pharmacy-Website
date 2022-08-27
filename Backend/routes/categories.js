var express = require('express');
var router = express.Router();
var pool = require("./pool")
var upload = require("./multer")

/* GET users listing. */
router.post('/savecategories', upload.single('icon'), function (req, res, next) {    
    pool.query("insert into categories(categoryname,icon)values(?,?)", [req.body.categoryname, req.myfilename], function (error, result) {

        if (error) {
            console.log(error)
            res.status(500).json({ result: false })
        }
        else {
            res.status(200).json({ result: true })
        }
    })
});


router.post('/editicon', upload.single('icon'), function (req, res, next) {    
     pool.query("update categories set icon=? where categoryid=?", [req.myfilename,req.body.categoryid], function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).json({ result: false })
        }
        else {
            res.status(200).json({ result: true })
        }
    })
});

router.post('/editdata', function (req, res, next) {   
    pool.query("update categories set categoryname=? where categoryid=?", [req.body.categoryname,req.body.categoryid], function (error, result) {   
   if (error) {
            console.log(error)
            res.status(500).json({ result: false })
        }
        else {
            res.status(200).json({ result: true })
        }
    })
});

router.post('/deletedata', function (req, res, next) {   
    pool.query("delete from categories where categoryid=?", [req.body.categoryid], function (error, result) {   
   if (error) {
            console.log(error)
            res.status(500).json({ result: false })
        }
        else {
            res.status(200).json({ result: true })
        }
    })
});


router.get('/displayallcategories', function (req, res, next) {
    pool.query("select * from categories", function (error, result) {           
   if (error) {            
        console.log(error);
            res.status(500).json({ result: [] })
        }
        else {            
            res.status(200).json({ result: result })
        }
    })
})


module.exports = router;
