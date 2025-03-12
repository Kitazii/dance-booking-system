const express = require('express');
const router = express.Router();

const servicesController = require('../controllers/servicesController');
const errorController = require('../controllers/errorController');

router.get('/', servicesController.services_page);
router.get('/details', servicesController.services_details_page);

router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;