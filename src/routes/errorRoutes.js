const express = require('express');
const {persistence} = require('../auth/auth')
const router = express.Router();

const errorController = require('../controllers/errorController');

router.get('/notauth', persistence, errorController.error_not_authorized_page);
router.get('/enrolexists', persistence, errorController.error_enrol_exists_page);

router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;