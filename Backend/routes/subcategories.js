var express = require('express');
var router = express.Router();
var pool = require("./pool")
var upload = require("./multer")

/* GET users listing. */
router.post('/savesubcategories', upload.single('icon'), function (req, res, next) {
    pool.query("insert into subcategories(categoryid,subcategoryname,description,icon)values(?,?,?,?)", [req.body.categoryid,req.body.subcategoryname, req.body.description, req.myfilename], function (error, result) {
console.log(req.body);
        if (error) {
            console.log(error)
            res.status(500).json({ result: false })
        }
        else {
            res.status(200).json({ result: true })
        }
    })
});


router.get('/displayallsubcategories', function (req, res, next) {
    pool.query("select * from subcategories", function (error, result) {           
   if (error) {            
        console.log(error);
            res.status(500).json({ result: [] })
        }
        else {            
            res.status(200).json({ result: result })
        }

    })
})


router.post("/displaysubcategory", function (req, res, next) {
    console.log(req.body);
    pool.query("select * from subcategories where categoryid=?", [req.body.categoryid], function (error, result) {
        if (error) {
            res.status(500).json({ result: [] });
        } else {
            res.status(200).json({ result: result });
        }
    });
});
 

router.post('/editicon', upload.single('icon'), function (req, res, next) {    
    pool.query("update subcategories set icon=? where subcategoryid=?", [req.myfilename,req.body.subcategoryid], function (error, result) {
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
    console.log('editreq',req.body);

   pool.query("update subcategories set categoryid=?, subcategoryname=?, description=? where subcategoryid=?", [req.body.categoryid,req.body.subcategoryname,req.body.description,req.body.subcategoryid], function (error, result) {    
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
  console.log(req.body);
   pool.query("delete from subcategories where subcategoryid=?", [req.body.subcategoryid], function (error, result) {
//   console.log("this is delete name",req.body.categoryname);
  if (error) {
           console.log(error)
           res.status(500).json({ result: false })
       }
       else {
           res.status(200).json({ result: true })
       }
   })
});



module.exports = router;
