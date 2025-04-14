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
            // Send a response in case of error:
            res.render('courses/details', {
                courses: [],
                user: res.locals.user,
                error: "Unable to retrieve course details at this time."
            });
        });
};

exports.class_page = function(req, res) {
    const classId = req.query.classId;
    const error = req.flash('errorAuth');

    courseService.getClassById(classId)
    .then((courses) => {
        // Locate the specific class from the array
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
        // Optionally render an error view or similar
        res.render('courses/class', {
            currentClass: null,
            courses: [],
            user: res.locals.user,
            error: "Unable to retrieve class details at this time."
        });
    });
};


exports.course_enrol_page = function(req, res) {
  const courseId = req.query.courseId;
  //const error = req.query.error || null;
  const error = req.flash('errorEnrolled'); // returns an array; take the first item if exists
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
      // Use flash to store the error message securely
      req.flash('errorEnrolled', 'User already enrolled');
      return res.redirect(`/courses/enrol?courseId=${courseId}`);
    }
    return courseService.postEnrolledData(courseId, enrollmentData);
  }).then(updatedCourse => {
      // If the user was already enrolled and we redirected, updatedCourse will be undefined.
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

exports.course_attend_page = function(req, res) {
  const classId = req.query.classId;
  const error = req.flash('errorAttend'); // returns an array; take the first item if exists
  console.log('Fetching class for classId:', classId);
  
  courseService.getClassById(classId)
    .then(courses => {
      if (!courses) {
        // If no course/class is found, set a flash error and redirect to a safe location.
        req.flash('errorAttend', 'Class not found.');
        return res.redirect('/courses/details'); // adjust to an appropriate fallback path
      }
      // Now safely access classes on the courses object.
      const currentClass = courses.classes ? courses.classes.find(c => c.classId === classId) : null;
      
      if (!currentClass) {
        // If current class is not found, handle it similarly
        req.flash('errorAttend', 'Class not available.');
        return res.redirect('/courses/details'); // or another appropriate path
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
      // Optionally, set a flash message or render an error page
      res.status(500).send("Error retrieving class details.");
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
            req.flash('errorEnrolled', 'User is not enrolled in this course. Please enrol here');
            return res.redirect(`/courses/enrol?courseId=${courseId}`);
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
      req.flash('errorAttend', 'User already attending');
      return res.redirect(`/courses/attend?classId=${classId}`);
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