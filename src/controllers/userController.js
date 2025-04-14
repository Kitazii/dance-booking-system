const userService = require('../service/userService');

exports.user_login_page = function(req, res) {
    res.render('user/login');
};

exports.user_handle_login = function(req, res) {
    res.redirect('/');
};

exports.user_logout = function(req, res) {
    res  
    .clearCookie('jwt')  
    .status(200)  
    .redirect('/');  
};

exports.user_register_page = function(req, res) {
    res.render('user/register')
};

exports.create_new_user = function(req, res) {
    res.redirect('/login');
};