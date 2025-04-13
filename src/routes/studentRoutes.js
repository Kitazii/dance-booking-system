const express = require('express');
const {persistence, authorizeRole} = require('../auth/auth')
const router = express.Router();

const studentController = require('../controllers/studentController');
const errorController = require('../controllers/errorController');

const auth = 'student';

router.get('/main', persistence, authorizeRole(auth), studentController.main_dashboard);

router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;