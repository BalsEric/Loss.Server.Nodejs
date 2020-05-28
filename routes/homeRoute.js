
const express = require("express"),
      router  = express.Router({
        mergeParams: true
    }),
    home_controller = require('../controllers/homeController');

module.exports = router;