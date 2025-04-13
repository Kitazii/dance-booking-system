const userService = require('../service/userService');

exports.user_login_page = function(req, res) {
    res.render('user/login');
};

exports.user_handle_login = function(req, res) {
    // res.render('home' , {
    //     user: 'user'
    // });
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
    const user = req.body.username;
    const password = req.body.password;

    const userData = {
        username: user,
        password: password,
    };

    if (!user || !password) {
        return res.send(401, 'no user or no password');
    }
    userService.lookup(user, function(err, u) {
        if (u) {
            return res.redirect('/userExists');
        }
        userService.create(userData);
        console.log('register user', user, "password", password);
        return res.redirect('/login');
    });
};