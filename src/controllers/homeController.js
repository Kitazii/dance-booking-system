const courseService = require('../service/courseService');

exports.home_page = function(req, res) {
  courseService.getSchedule()
    .then((schedule) => {
      res.render('home', {
        'schedule': schedule
        });
        console.log('promise resolved');
    })
    .catch((err) => {
      console.error('promise rejected', err);
    });
};