const express = require('express');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth');
const router = express.Router();

const userController = require('../controllers/userController');
const errorController = require('../controllers/errorController');

router.get('/login', userController.user_login_page);
router.post('/login', login, userController.user_handle_login);

router.get('/register', userController.user_register_page);
router.post('/register', userController.create_new_user);

router.get('/logout', verify, userController.user_logout);

router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;