const courseService = require('../service/courseService');
const userService = require('../service/userService');


/**
 * Main Dashboard: Render main admin dashboard.
 */
exports.main_dashboard = function(req, res) {
    res.render('adminDashboard/main', {
        user: res.locals.user
    });
};

/**
 * Enrolled Dashboard: Render enrolled courses dashboard.
 */
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


/**
 * Remove Enrolled Student: Remove student from enrolled list.
 */
exports.remove_enrolled_student = function(req, res) {
    const courseId = req.body.courseId;
    const studentEmail = req.body.email;
    courseService.removeEnrolledStudent(courseId, studentEmail)
    .then(() => {
        //remove the student from attended students in all classes of that course.
        return courseService.removeAttendedStudent(courseId, null, studentEmail);
      })
      .then(() => {
            // redirect to GET route that loads all courses
            res.redirect('/adminDashboard/enrolled');

        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

/**
 * Attended Dashboard: Render attended classes dashboard.
 */
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

/**
 * Remove Attended Student: Remove student from a class.
 */
exports.remove_attended_student = function(req, res) {
    const courseId = req.body.courseId;
    const classId = req.body.classId;
    const studentEmail = req.body.email;
    courseService.removeAttendedStudent(courseId, classId, studentEmail)
        .then(() => {
            //redirect to GET route that loads all courses
            res.redirect('/adminDashboard/attended');

        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

/**
 * Courses Dashboard: Render courses dashboard.
 */
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

/**
 * Delete Course: Delete a course.
 */
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


/**
 * Add Course Form: Render form to add a new course.
 */
exports.add_course_form = function(req, res) {
    res.render('adminDashboard/newCourse', {
        user: res.locals.user
    });
};

/**
 * Added Course: Create a new course.
 */
exports.added_course = function(req, res) {
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
        classes: []  //no classes at creation time. Will be added later.
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

/**
 * Classes Dashboard: Render classes dashboard.
 */
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


/**
 * Delete Class: Delete a class from a course.
 */
exports.delete_class = function(req, res) {
    const classId = req.body.classId;
    const courseId = req.body.courseId;
    console.log("Here is the classsssID:", classId);
    console.log("Here is the courseID:", courseId);
    courseService.deleteClass(classId, courseId)
      .then(() => {
            // Redirect to GET route that loads all courses
            res.redirect('/adminDashboard/classes');

        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

/**
 * Add Class Form: Render form to add a new class.
 */
exports.add_class_form = function(req, res) {
    res.render('adminDashboard/newClass', {
        user: res.locals.user
    });
};

/**
 * Added Class: Create a new class.
 */
exports.added_class = function(req, res) {
    //extract the course ID and build the new class object from form data.
    const courseId = req.body.courseId;

    const rawDateString = req.body.date;
    const rawTimeString = req.body.time;

    //combine date and time into one string.
    const combinedDateTimeString = `${rawDateString} ${rawTimeString}`;

    //create a Date object from the combined string.
    const parsedDate = new Date(combinedDateTimeString);

    const formattedDate = parsedDate.toLocaleDateString('en-US'); 
    const formattedTime = parsedDate.toLocaleTimeString('en-US', {  
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });

        
    const classData = {
        classId: req.body.classId,
        title: req.body.title,
        description: req.body.description,
        summary: req.body.summary,
        teacher: req.body.teacher,
        date: formattedDate,
        time: formattedTime,
        location: req.body.location,
        price: parseFloat(req.body.price)
    };

    courseService.addClass(courseId, classData)
        .then(() => {
            res.redirect('/adminDashboard/classes');
        })
        .catch((err) => {
            console.error('Error adding class:', err);
            res.status(500).send("Error adding class");
        });
};

/**
 * Update Class Form: Render form to update a class.
 */
exports.update_class_form = function(req, res) {
    const classId = req.params.classId;
    const courseId = req.params.courseId;

    console.log("class ID lets goo", classId)
    
    // Fetch the class data using the courseId and classId.
    courseService.getClass(courseId, classId)
    .then((classData) => {
      res.render('adminDashboard/updateClass', {
        user: res.locals.user,
        courseId: courseId,
        class: classData
      });
    })
    .catch((err) => {
      console.error("Error fetching class data", err);
      res.status(500).send("Error fetching class data");
    });
};

/**
 * Updated Class: Update class data.
 */
exports.updated_class = function(req, res) {
    const courseId = req.body.courseId;
    const originalClassId = req.body.originalClassId;

    // Get the raw date and time values from the form
    const rawDateString = req.body.date;  // should be in YYYY-MM-DD format
    const rawTimeString = req.body.time;  // should be in HH:MM format

    // Combine date and time into one string
    const combinedDateTimeString = `${rawDateString} ${rawTimeString}`;

    //create a Date object
    const parsedDate = new Date(combinedDateTimeString);

    // Format the date and time
    const formattedDate = parsedDate.toLocaleDateString('en-US');  
    const formattedTime = parsedDate.toLocaleTimeString('en-US', {  
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
    });

    // Build the updated class data.
    const classData = {
    classId: req.body.classId,
    title: req.body.title,
    description: req.body.description,
    summary: req.body.summary,
    teacher: req.body.teacher,
    date: formattedDate,
    time: formattedTime,
    location: req.body.location,
    price: parseFloat(req.body.price)
    };

    courseService.updateClass(courseId, originalClassId, classData)
    .then(() => {
        res.redirect('/adminDashboard/classes');
    })
    .catch((err) => {
        console.error('Error updating class:', err);
        res.status(500).send("Error updating class");
    });
};

/**
 * Users Dashboard: Render users dashboard.
 */
exports.users_dashboard = function(req, res) {
    userService.getAllUsers()
        .then((users) => {
            const currentUser = res.locals.user;
            if (currentUser && currentUser.username) {
                users = users.filter(user => user.username !== currentUser.username);
            }
            res.render('adminDashboard/users', {
                users: users, //gets all the users
                user: currentUser //gets current logged in user
            });
            console.log('promise resolved');
        })
        .catch((err) => {
            console.error('promise rejected', err);
            res.status(500).send("Error loading users dashboard");
    });
};

/**
 * Delete User: Delete a user.
 */
exports.delete_user = function(req, res) {
    const username = req.body.username;
    userService.deleteUser(username)
      .then(() => {
            res.redirect('/adminDashboard/users');

        })
        .catch((err) => {
            console.error('promise rejected', err);
    });
};

/**
 * Add User Form: Render form to add a new user.
 */
exports.add_user_form = function(req, res) {
    res.render('adminDashboard/newUser', {
        user: res.locals.user
    });
};

/**
 * Added User: Create a new user.
 */
exports.added_user = function(req, res) {
    // Build a new course object from form data.
    const userData = {
        forename: req.body.forename,
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
        role: req.body.role,
        password: req.body.password
    };
     userService.lookupPromise(userData.username)
    .then((existingUser) => {
      if (existingUser) {
        // if a user already exists, throw an error that we later catch.
        throw new Error("UserAlreadyExists");
      }
      // Otherwise, create the user (assuming userService.create returns a promise)
      return userService.create(userData);
    })
    .then(() => {
      res.redirect('/adminDashboard/users');
    })
    .catch((err) => {
      if (err.message === "UserAlreadyExists") {
        res.redirect('/userExists');
      } else {
        console.error("Error creating user:", err);
        res.status(500).send("Error creating user");
      }
    });
};