const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

//POST new user route (optional, everyone has access)
router.get('/', auth.required, (req, res, next) => {
  res.send("fasf");
});


module.exports = router;