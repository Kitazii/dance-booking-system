const courseDAO = require('../models/courseModel');
const course_db = new courseDAO();

course_db.init();

exports.courses_page = function(req, res) {
    course_db.getAllCourses()
        .then((courses) => {
            res.render('courses/courses', {
                'courses': courses
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.error('promise rejected', err);
        });
};