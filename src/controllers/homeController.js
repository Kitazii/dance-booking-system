const courseDAO = require('../models/courseModel');
const classDAO = require('../models/classModel');
const course_db = new courseDAO();
const class_db = new classDAO();

exports.home_page = function(req, res) {
  res.render('home');
};