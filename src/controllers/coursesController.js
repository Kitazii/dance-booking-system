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
    const aUser = res.locals.user;
    if (aUser && aUser.role !== 'student') {
        return res.redirect('/notauth');
    }
    console.log('user', aUser);
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

exports.course_attend_page = function(req, res) {
    const aUser = res.locals.user;
    if (aUser && aUser.role !== 'student') {
        return res.redirect('/notauth');
    }
    console.log('user', aUser);
    const classId = req.query.classId;
    console.log("thee class id: ", classId)
    courseService.getClassById(classId)
        .then((courses) => {
            // Locate the specific class from the array
            const currentClass = courses.classes.find(c => c.classId === classId);
            res.render('courses/attend', {
                currentClass: currentClass,
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

    courseService.getCourseById(courseId)
    .then(course => {
      if (course && course.enrolledStudents && course.enrolledStudents.some(student => student.email === enrollmentData.email)) {
        console.log("Email already enrolled:", enrollmentData.email);
        // Redirect to error page if the email is already enrolled.
        return res.redirect('/enrolexists');
      }
     return courseService.postEnrolledData(courseId, enrollmentData);
    }).then(updatedCourse => {
        // If the course was already enrolled and we redirected, updatedCourse will be undefined.
        if (!updatedCourse) return;
        res.render('courses/enrolled', {
          courses: updatedCourse,
          enrolledStudent: enrollmentData,
          user: res.locals.user
        });
        console.log('Enrollment updated successfully:');
        console.log(updatedCourse);
      })
      .catch(err => {
        console.error('Error processing enrollment:', err);
        res.status(500).send('There was an error processing your enrollment.');
      });
  };

  exports.course_attended_page = function(req, res) {
    const theUser = res.locals.user;
    const classId = req.body.classId;
    const courseId = req.body.courseId;
    const attendenceData= {
        forename: null,
        surname: null,
        email: req.body.email,
        username: theUser ? theUser.username : null
      };

    console.log("user", theUser, "classId", classId, "attend", attendenceData)

    courseService.getClassById(classId)
    .then(course => {
        if (!course.enrolledStudents
            .some(student => student.email === attendenceData.email)) {
          console.log("Student is not enrolled in the course:", attendenceData.email);
          return res.redirect('/notenrolled');
        }
        course.enrolledStudents.find(student => {
          if (student.email === attendenceData.email) {
            attendenceData.forename = student.forename;
            attendenceData.surname = student.surname;
          }
        });
        // Locate the specific class object using the classId
      const currentClass = course.classes.find(c => c.classId === classId);
      if (currentClass && currentClass.attendedStudents &&
        currentClass.attendedStudents.some(student => student.email === attendenceData.email)) {
        console.log("Student already attended:", attendenceData.email);
        // Redirect to error page if the email is already enrolled.
        return res.redirect('/alreadyattended');
      }
     return courseService.postAttendedData(courseId, classId, attendenceData);
    }).then(updatedCourse => {
        // If the course was already enrolled and we redirected, updatedCourse will be undefined.
        if (!updatedCourse) return;

        // Locate the specific class from the array
        const currentClass = updatedCourse.classes.find(c => c.classId === classId);
        res.render('courses/attended', {
          currentClass: currentClass,
          courses: updatedCourse,
          attendedStudent: attendenceData,
          user: res.locals.user
        });
        console.log('Attendance  updated successfully:');
        console.log(updatedCourse);
      })
      .catch(err => {
        console.error('Error processing attendance:', err);
        res.status(500).send('There was an error processing your attendance.');
      });
  };