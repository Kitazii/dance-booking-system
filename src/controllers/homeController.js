const courseDAO = require('../models/courseModel');
const course_db = new courseDAO();

course_db.init();

exports.home_page = function(req, res) {
  course_db.getSchedule()
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