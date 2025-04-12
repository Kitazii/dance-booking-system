const courseService = require('../service/courseService');

exports.main_dashboard = function(req, res) {
    res.render('adminDashboard/main', {
        user: res.locals.user
    });
};

// ENROLLED
exports.enrolled_dashboard = function(req, res) {
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

exports.remove_enrolled_student = function(req, res) {
    const courseId = req.body.courseId;
    const studentEmail = req.body.email;
    courseService.removeEnrolledStudent(courseId, studentEmail)
    .then(() => {
        // Remove the student from attended students in all classes of that course.
        return courseService.removeAttendedStudent(courseId, null, studentEmail);
      })
      .then(() => {
            // Redirect to GET route that loads all courses
            res.redirect('/adminDashboard/enrolled');

        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

// ATTENDED
exports.attended_dashboard = function(req, res) {
    courseService.getAllClasses()
        .then((classes) => {
            res.render('adminDashboard/attended', {
                'classes': classes,
                user: res.locals.user
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

exports.remove_attended_student = function(req, res) {
    const courseId = req.body.courseId;
    const classId = req.body.classId;
    const studentEmail = req.body.email;
    courseService.removeAttendedStudent(courseId, classId, studentEmail)
        .then(() => {
            // Redirect to GET route that loads all courses
            res.redirect('/adminDashboard/attended');

        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

// COURSES
exports.courses_dashboard = function(req, res) {
    courseService.getAllCourses()
        .then((courses) => {
            res.render('adminDashboard/courses', {
                'courses': courses,
                user: res.locals.user
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

exports.delete_course = function(req, res) {
    const courseId = req.body.courseId;
    courseService.deleteCourse(courseId)
      .then(() => {
            // Redirect to GET route that loads all courses
            res.redirect('/adminDashboard/courses');

        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

exports.addCourse_form = function(req, res) {
    res.render('adminDashboard/newCourse', {
        user: res.locals.user
    });
};

exports.addedCourse = function(req, res) {
    // Build a new course object from form data.
    const courseData = {
        name: req.body.name,
        description: req.body.description,
        intro: req.body.intro,
        category: req.body.category,
        courseLead: req.body.courseLead,
        duration: req.body.duration,
        difficulty: req.body.difficulty,
        sessions: req.body.sessions,
        type: req.body.type,
        teachers: req.body.teachers,
        classes: []  // No classes at creation time; they can be added later.
    };
    courseService.addCourse(courseData)
        .then(() => {
            // After successfully adding the course, redirect to the courses dashboard.
            res.redirect('/adminDashboard/courses')

        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

// CLASSES
exports.classes_dashboard = function(req, res) {
    courseService.getAllClasses()
        .then((classes) => {
            res.render('adminDashboard/classes', {
                'classes': classes,
                user: res.locals.user
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

exports.delete_class = function(req, res) {
    const classId = req.body.classId;
    const courseId = req.body.courseId;
    console.log("Here is the classsssID:", classId);
    courseService.deleteClass(classId, courseId)
      .then(() => {
            // Redirect to GET route that loads all courses
            res.redirect('/adminDashboard/classes');

        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};