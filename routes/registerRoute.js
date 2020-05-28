//
// Register routes
//

const express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    register_controller = require('../controllers/registerController');


// POST request for updating the USER collection

router.post("/register", register_controller.register);

module.exports = router;