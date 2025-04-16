const courseService = require('../service/courseService');

/**
 * Courses Page: Fetch and render the list of all courses.
 */
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

/**
 * Course Details Page: Fetch and render details for a specific course.
 */
exports.course_details_page = function(req, res) {
    const courseId = req.query.courseId;
    const error = req.flash('errorAuth');

    courseService.getCourseById(courseId)
        .then((courses) => {
            res.render('courses/details', {
                'courses': courses,
                user: res.locals.user,
                error: error
            });
            console.log('promise resolved');
            console.log(courses);
        })
        .catch((err) => {
          console.error('Error retrieving course details:', err);
            //send a response in case of error:
            res.render('courses/details', {
                courses: [],
                user: res.locals.user,
                error: "Unable to retrieve course details at this time."
            });
        });
};

/**
 * Class Page: Fetch course details and render a specific class.
 */
exports.class_page = function(req, res) {
    const classId = req.query.classId;
    const error = req.flash('errorAuth');

    courseService.getClassById(classId)
    .then((courses) => {
        // get the specific class from the array
        const currentClass = courses.classes.find(c => c.classId === classId);
        res.render('courses/class', {
            currentClass: currentClass,
            'courses': courses,
            user: res.locals.user,
            error: error
        });
        console.log('promise resolved');
        console.log(res.locals.user);
    })
    .catch((err) => {
        console.error('promise rejected', err);
        res.render('courses/class', {
            currentClass: null,
            courses: [],
            user: res.locals.user,
            error: "Unable to retrieve class details at this time."
        });
    });
};

/**
 * Course Enrol Page: Fetch course details and render the enrolment page.
 */
exports.course_enrol_page = function(req, res) {
  const courseId = req.query.courseId;
  const error = req.flash('errorEnrolled'); // returns an array. Search for the item using a string param
  courseService.getCourseById(courseId)
      .then((courses) => {
          res.render('courses/enrol', {
              'courses': courses,
              user: res.locals.user,
              error: error.length ? error[0] : null
          });
          console.log('promise resolved');
          console.log(courses);
      })
      .catch((err) => {
          console.error('promise rejected', err);
  });
};

/**
 * Course Enrolled Page: Process enrolment data and update enrolment.
 */
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
      // use flash to store the error message securely
      req.flash('errorEnrolled', 'User already enrolled');
      return res.redirect(`/courses/enrol?courseId=${courseId}`);
    }
    return courseService.postEnrolledData(courseId, enrollmentData);
  }).then(updatedCourse => {
      // If the user was already enrolled and we redirected, updatedCourse will be undefined
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

/**
 * Course Attend Page: Fetch class details and render the attend page.
 */
exports.course_attend_page = function(req, res) {
  const classId = req.query.classId;
  const error = req.flash('errorAttend');
  console.log('Fetching class for classId:', classId);
  
  courseService.getClassById(classId)
    .then(courses => {
      if (!courses) {
        //second string is the error message
        req.flash('errorAttend', 'Class not found.');
        return res.redirect('/courses/details');
      }

      const currentClass = courses.classes ? courses.classes.find(c => c.classId === classId) : null;
      
      if (!currentClass) {
        // If current class is not found, handle it similarly
        req.flash('errorAttend', 'Class not available.');
        return res.redirect('/courses/details');
      }

      res.render('courses/attend', {
        currentClass: currentClass,
        courses: courses,
        user: res.locals.user,
        error: error.length ? error[0] : null
      });
      console.log('Course attend page rendered successfully.');
    })
    .catch(err => {
      console.error('Error retrieving class:', err);
      res.status(500).send("Error retrieving class details.");
    });
};


/**
 * Course Attended Page: Process attendance data and update attendance.
 */
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
            req.flash('errorEnrolled', 'User is not enrolled in this course. Please enrol here');
            return res.redirect(`/courses/enrol?courseId=${courseId}`);
      }
      course.enrolledStudents.find(student => {
        if (student.email === attendenceData.email) {
          attendenceData.forename = student.forename;
          attendenceData.surname = student.surname;
        }
      });

    const currentClass = course.classes.find(c => c.classId === classId);
    // Check if the student has already attended this class
    if (currentClass && currentClass.attendedStudents &&
      currentClass.attendedStudents.some(student => student.email === attendenceData.email)) {
      console.log("Student already attended:", attendenceData.email);
      // Redirect to error page if the email is already enrolled
      req.flash('errorAttend', 'User already attending');
      return res.redirect(`/courses/attend?classId=${classId}`);
    }

    return courseService.postAttendedData(courseId, classId, attendenceData);

  }).then(updatedCourse => {
      //if the course was already enrolled and we redirected, updatedCourse will be undefined.
      if (!updatedCourse) return;

      // get the specific class from the array
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