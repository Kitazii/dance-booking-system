const courseService = require('../service/courseService');

exports.main_dashboard_page = function(req, res) {
    res.render('adminDashboard/main', {
        user: res.locals.user
    });
};

exports.admin_dashboard_page = function(req, res) {
    courseService.getAllCourses()
        .then((courses) => {
            res.render('adminDashboard/enrolled', {
                'courses': courses,
                user: res.locals.user
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

exports.remove_student = function(req, res) {
    const courseId = req.body.courseId;
    const studentEmail = req.body.email;
    courseService.removeStudent(courseId, studentEmail)
        .then((courses) => {
            res.render('adminDashboard/enrolled', {
                'courses': courses,
                user: res.locals.user
            });
            console.log('promise resolved');
            console.log(courses);
        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};