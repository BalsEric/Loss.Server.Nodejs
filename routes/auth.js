const jwt = require('express-jwt');
const userToken = require('../global/global')

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  const { body: { user } } = req;
  /*
  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    if( userToken.getTokenByUsername(user.username) === authorization.split(' ')[1]){
      return authorization.split(' ')[1];
    }
  }
  */
  if( authorization && userToken.getTokenByUsername(user.username) === authorization )
    return authorization;
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    
    credentialsRequired: false,
  }),
};

module.exports = auth;