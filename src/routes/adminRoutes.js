const express = require('express');
const {persistence, authorizeRole} = require('../auth/auth')
const router = express.Router();

const adminController = require('../controllers/adminController');
const errorController = require('../controllers/errorController');

router.get('/main', persistence, authorizeRole('admin'), adminController.main_dashboard_page);
router.get('/enrolled', persistence, authorizeRole('admin'), adminController.admin_dashboard_page);
router.post('/enrolled', persistence, authorizeRole('admin'), adminController.remove_student);

router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;