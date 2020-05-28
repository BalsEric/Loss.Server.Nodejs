

const express = require("express"),
      router  = express.Router({
        mergeParams: true
    }),
    userController = require("../controllers/userController");

// POST request for updating USERS 

router.get('/all', userController.getAllUsers);

// GET requrest for logout

router.get("/username", userController.getUserByUsername);

router.get("/email", userController.getUserByEmail);

module.exports = router;