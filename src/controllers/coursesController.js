const courseService = require('../service/courseService');

exports.courses_page = function(req, res) {
    courseService.getAllCourses()
        .then((courses) => {
            res.render('courses/courses', {
                'courses': courses,
                user: res.locals.user
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.error('promise rejected', err);
        });
};

exports.course_details_page = function(req, res) {
    const courseId = req.query.courseId;
    courseService.getCourseById(courseId)
        .then((courses) => {
            res.render('courses/details', {
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

exports.class_page = function(req, res) {
    const classId = req.query.classId;
    courseService.getClassById(classId)
        .then((courses) => {
            // Locate the specific class from the array
            const currentClass = courses.classes.find(c => c.classId === classId);
            res.render('courses/class', {
                currentClass: currentClass,
                'courses': courses,
                user: res.locals.user
            });
            console.log('promise resolved');
            console.log(res.locals.user);
        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

exports.course_enrol_page = function(req, res) {
    const courseId = req.query.courseId;
    console.log(courseId)
    courseService.getCourseById(courseId)
        .then((courses) => {
            res.render('courses/enrol', {
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

exports.course_enrolled_page = function(req, res) {
    const theUser = res.locals.user;
    const courseId = req.body.courseId;
    const enrollmentData= {
        forename: req.body.forename,
        surname: req.body.surname,
        email: req.body.email,
        username: theUser ? theUser.username : null
      };

      console.log("user", theUser, "courseId", courseId, "enrol",enrollmentData)
    courseService.postEnrolledData(courseId, enrollmentData)
        .then((courses) => {
            res.render('courses/enrolled', {
                'courses': courses,
                enrolledStudent: enrollmentData,
                user: res.locals.user
            });
            console.log('promise resolved');
            console.log(courses);
        })
        .catch((err) => {
            console.error('promise rejected', err);
            res.status(500).send('There was an error processing your enrollment.');
    });
};