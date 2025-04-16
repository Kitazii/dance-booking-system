const express = require('express');
const {persistence} = require('../auth/auth')
const router = express.Router();

//get necessary controllers
const errorController = require('../controllers/errorController');

//error based routes
router.get('/userexists', persistence, errorController.user_exists_page);

router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;