const express = require('express');
const {persistence, authorizeRole} = require('../auth/auth')
const router = express.Router();

const adminController = require('../controllers/adminController');
const errorController = require('../controllers/errorController');

router.get('/main', persistence, authorizeRole('admin'), adminController.main_dashboard);

//enrolled students
router.get('/enrolled', persistence, authorizeRole('admin'), adminController.enrolled_dashboard);
router.post('/enrolled', persistence, authorizeRole('admin'), adminController.remove_enrolled_student);

//student attendance
router.get('/attended', persistence, authorizeRole('admin'), adminController.attended_dashboard);
router.post('/attended', persistence, authorizeRole('admin'), adminController.remove_attended_student);

//manage courses
router.get('/courses', persistence, authorizeRole('admin'), adminController.courses_dashboard);
router.post('/courses', persistence, authorizeRole('admin'), adminController.delete_course);
router.get('/newCourse', persistence, authorizeRole('admin'), adminController.addCourse_form);
router.post('/newCourse/add', persistence, authorizeRole('admin'), adminController.addedCourse);

//manage classes
router.get('/classes', persistence, authorizeRole('admin'), adminController.classes_dashboard);
router.post('/classes', persistence, authorizeRole('admin'), adminController.delete_class);


router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;