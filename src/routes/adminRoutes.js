const express = require('express');
const {persistence, authorizeRole} = require('../auth/auth')
const router = express.Router();

const adminController = require('../controllers/adminController');
const errorController = require('../controllers/errorController');

const auth = 'admin';

router.get('/main', persistence, authorizeRole(auth), adminController.main_dashboard);

//enrolled students
router.get('/enrolled', persistence, authorizeRole(auth), adminController.enrolled_dashboard);
router.post('/enrolled', persistence, authorizeRole(auth), adminController.remove_enrolled_student);

//student attendance
router.get('/attended', persistence, authorizeRole(auth), adminController.attended_dashboard);
router.post('/attended', persistence, authorizeRole(auth), adminController.remove_attended_student);

//manage courses
router.get('/courses', persistence, authorizeRole(auth), adminController.courses_dashboard);
router.post('/courses', persistence, authorizeRole(auth), adminController.delete_course);
router.get('/newCourse', persistence, authorizeRole(auth), adminController.add_course_form);
router.post('/newCourse/add', persistence, authorizeRole(auth), adminController.added_course);

//manage classes
router.get('/classes', persistence, authorizeRole(auth), adminController.classes_dashboard);
router.post('/classes', persistence, authorizeRole(auth), adminController.delete_class);
router.get('/newClass', persistence, authorizeRole(auth), adminController.add_class_form);
router.post('/newClass/add', persistence, authorizeRole(auth), adminController.added_class);
router.get('/updateClass/:classId/:courseId', persistence, authorizeRole(auth), adminController.update_class_form);
router.post('/updateClass/update', persistence, authorizeRole(auth), adminController.updated_class);

//manage users
router.get('/users', persistence, authorizeRole(auth), adminController.users_dashboard);
router.post('/users', persistence, authorizeRole(auth), adminController.delete_user);
router.get('/newUser', persistence, authorizeRole(auth), adminController.add_user_form);
router.post('/newUser/add', persistence, authorizeRole(auth), adminController.added_user);

router.use(function(err, req, res, next) {
    errorController.error_404_page(err, req, res, next);
});

router.use(function(err, req, res, next) {
    errorController.error_500_page(err, req, res, next);
});

module.exports = router;