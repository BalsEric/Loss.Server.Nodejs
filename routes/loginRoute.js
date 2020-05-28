//
// login routes
//

const express = require("express"),
      router  = express.Router({
        mergeParams: true
    }),
    login_controller = require('../controllers/loginController');

// POST request for updating USERS 

router.post("/login", login_controller.login);

// GET requrest for logout

router.get("/logout", login_controller.logout);

module.exports = router;