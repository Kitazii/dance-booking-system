const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const errorController = require('../controllers/errorController');

router.get('/', homeController.home_page);

router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;