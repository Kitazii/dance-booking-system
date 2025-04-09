const express = require('express');
const {persistence, authorizeRole} = require('../auth/auth')
const router = express.Router();

const coursesController = require('../controllers/coursesController');
const errorController = require('../controllers/errorController');

router.get('/', persistence, coursesController.courses_page);
router.get('/details', persistence, coursesController.course_details_page);
router.get('/enrol', persistence, coursesController.course_enrol_page);
router.get('/attend', persistence, coursesController.course_attend_page);
router.post('/attended', persistence, coursesController.course_attended_page);
router.post('/enrolled', persistence, coursesController.course_enrolled_page);
//router.get('/details', persistence, authorizeRole(['student']), coursesController.course_details_page);
router.get('/class', persistence, coursesController.class_page);

router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;