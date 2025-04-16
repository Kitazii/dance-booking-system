const express = require('express');
const {persistence, authorizeRole} = require('../auth/auth')
const router = express.Router();

//get necessary controllers
const studentController = require('../controllers/studentController');
const errorController = require('../controllers/errorController');

//store the role of the user in a variable
const auth = ['student'];

//routes for student dashboard
router.get('/main', persistence, authorizeRole(auth), studentController.main_dashboard);

//deals with errors
router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;