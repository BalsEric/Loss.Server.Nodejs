//
//      Middlewares
//

// Middleware for checking if a user is logged In

exports.isLoggedIn=function (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            }
            res.redirect('/login');
        }
 