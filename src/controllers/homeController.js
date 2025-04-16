exports.home_page = function(req, res) {
  res.render('home', {
    user: res.locals.user
});
};