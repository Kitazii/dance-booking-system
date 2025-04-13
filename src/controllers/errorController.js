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

exports.error_not_authorized_page = function(req, res) {
    res.render('errors/notAuthorized', {
        user: res.locals.user
    });
}

exports.error_enrol_exists_page = function(req, res) {
    res.render('errors/enrolExists', {
        user: res.locals.user
    });
}

exports.error_already_attended_page = function(req, res) {
    res.render('errors/alreadyattended', {
        user: res.locals.user
    });
}

exports.error_not_enrol_page = function(req, res) {
    res.render('errors/notenrolled', {
        user: res.locals.user
    });
}

exports.user_exists_page = function(req, res) {
    res.render('errors/userExists', {
        user: res.locals.user
    });
}