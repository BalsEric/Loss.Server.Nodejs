const userToken = require('../../global/global');
const mongoose = require('mongoose');
const passport = require('passport');
const Users = mongoose.model('Users');

exports.getAllUsers = function(req, res){
    try {
        User.find({}, function(err, users){
            if( err ) res.sendStatus(err.code);
            res.send(users)});
    }   
    catch {
        res.sendStatus(404);
    }
  }

exports.getUserByUsername = function(req, res){
    const { body: { username } } = req;
    if(!username) {
        return res.status(422).json({
        errors: {
            username: 'is required',
        },
        });
    }
    try {
        User.findOne({'username': username}, function(err, user){
            if( err ) res.sendStatus(err.code);
            res.send(user)});
    }   
    catch {
        res.sendStatus(404);
    }
  }

exports.getUserByEmail = function(req, res){
    const { body: { email } } = req;
    if(!email) {
        return res.status(422).json({
        errors: {
            email: 'is required',
        },
        });
    }
    try {
        User.findOne({'email': email}, function(err, user){
            if( err ) res.sendStatus(err.code);
            res.send(user) });
    }   
    catch {
        res.sendStatus(404);
    }
  }

exports.register = function(req, res, next){
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  finalUser.save()
    .then(() => passport.authenticate('local', { session: true }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      userToken.addToken(user.token, user.username);
       
       return res.send({ token: user.token});
    }
   
    return status(400).info;
  })(req, res, next));
}

exports.login = (req, res, next) => {
  const { body: { user } } = req;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      userToken.addToken(user.token, user.username);
    
      return res.send({ token: user.token});
    }
    return status(400).info;
  })(req, res, next);
};
