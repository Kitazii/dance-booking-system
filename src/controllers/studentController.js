exports.main_dashboard = function(req, res) {
    res.render('studentDashboard/main', {
        user: res.locals.user
    });
};