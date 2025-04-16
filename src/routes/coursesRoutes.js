const express = require('express');
const {persistence, authorizeRole} = require('../auth/auth')
const router = express.Router();

//get necessary controllers
const coursesController = require('../controllers/coursesController');
const errorController = require('../controllers/errorController');

//store the role of the user in a variable
const auth = ['student'];

//routes for courses
router.get('/', persistence, coursesController.courses_page);
router.get('/details', persistence, coursesController.course_details_page);
router.get('/enrol', persistence, authorizeRole(auth), coursesController.course_enrol_page);
router.get('/attend', persistence, authorizeRole(auth, 'classId', '/courses/class'), coursesController.course_attend_page);
router.post('/attended', persistence, coursesController.course_attended_page);
router.post('/enrolled', persistence, coursesController.course_enrolled_page);
router.get('/class', persistence, coursesController.class_page);

//deals with errors
router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;