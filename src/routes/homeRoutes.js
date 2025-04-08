const express = require('express');
const {persistence} = require('../auth/auth')
const router = express.Router();

const homeController = require('../controllers/homeController');
const errorController = require('../controllers/errorController');

router.get('/', persistence, homeController.home_page);

router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;