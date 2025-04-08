const courseService = require('../service/courseService');

exports.home_page = function(req, res) {
  courseService.getSchedule()
    .then((schedule) => {
      res.render('home', {
        'schedule': schedule,
        user: res.locals.user
        });
        console.log('promise resolved');
        console.log(res.locals.user);
    })
    .catch((err) => {
      console.error('promise rejected', err);
    });
};