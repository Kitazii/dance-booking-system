/**
 * 404 Error Page: Render a simple 404 not found message.
 */
exports.error_404_page = function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found');
};

/**
 * 500 Error Page: Render a simple internal server error message.
 */
exports.error_500_page = function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
};

/**
 * User Exists Page: Render a page indicating the user already exists.
 */
exports.user_exists_page = function(req, res) {
    res.render('errors/userExists', {
        user: res.locals.user
    });
}