var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {proName:'Project 1 NodeJS'});
});

/* GET home page. */
router.post('/', function(req, res, next) {
  if(!req.user){
    res.render('login', {proName:'Project 1 NodeJS'});
  }else{
    res.redirect('/');
  }
}); 


module.exports = router;
