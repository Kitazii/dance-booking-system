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

exports.course_details_page = function(req, res) {
    const courseId = req.query.courseId;
    course_db.getCourseById(courseId)
        .then((courses) => {
            res.render('courses/details', {
                'courses': courses
            });
            console.log('promise resolved');
            console.log(courses);
        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

exports.class_page = function(req, res) {
    const classId = req.query.classId;
    course_db.getClassById(classId)
        .then((courses) => {
            // Locate the specific class from the array
            const currentClass = courses.classes.find(c => c.classId === classId);
            res.render('courses/class', {
                currentClass: currentClass
            });
            console.log('promise resolved');
            console.log(courses);
        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};