exports.error_404_page = function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found');
};

exports.error_500_page = function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
};

exports.user_exists_page = function(req, res) {
    res.render('errors/userExists', {
        user: res.locals.user
    });
}