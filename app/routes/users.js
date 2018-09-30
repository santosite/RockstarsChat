var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.user){
    proName="Project 1 NodeJS";
    res.render('indexUsers',{
      title: 'Profile:',
      user: req.user.displayName});
  }else{
    proName="Project 1 NodeJS"
    res.render('indexUsers',{
      title: 'No profile'});
  }
  
});

module.exports = router;
