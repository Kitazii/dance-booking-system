const express = require('express');
const {persistence} = require('../auth/auth')
const router = express.Router();

//get necessary controllers
const homeController = require('../controllers/homeController');
const errorController = require('../controllers/errorController');

//home routes
router.get('/', persistence, homeController.home_page);

//deals with errors
router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;