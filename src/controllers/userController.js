/**
 * User Login Page: Render the user login template.
 */
exports.user_login_page = function(req, res) {
    res.render('user/login');
};

/**
 * User Handle Login: Redirect to home after login.
 */
exports.user_handle_login = function(req, res) {
    res.redirect('/');
};

/**
 * User Logout: Clear the JWT cookie and redirect to home.
 */
exports.user_logout = function(req, res) {
    res  
    .clearCookie('jwt')  
    .status(200)  
    .redirect('/');  
};


/**
 * User Register Page: Render the user registration template.
 */
exports.user_register_page = function(req, res) {
    res.render('user/register')
};


/**
 * Create New User: Redirect to login after new user registration.
 */
exports.create_new_user = function(req, res) {
    res.redirect('/login');
};