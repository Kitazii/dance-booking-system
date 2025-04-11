const courseRepo = require('../repository/courseRepository');

class CourseService {
  init() {
    return courseRepo.init();
  }

  getAllCourses() {
    return courseRepo.getAllCourses();
  }

  getCourseById(courseId) {
    return courseRepo.getCourseById(courseId);
  }

  postEnrolledData(courseId, enrollmentData) {
    return courseRepo.postEnrolledData(courseId, enrollmentData);
  }

  postAttendedData(courseId, classId, attendenceData) {
    return courseRepo.postAttendedData(courseId, classId, attendenceData);
  }

  getAllClasses() {
    return courseRepo.getAllClasses();
  }

  getClassById(classId) {
    return courseRepo.getClassById(classId);
  }

  getSchedule() {
    return courseRepo.getSchedule();
  }

  removeEnrolledStudent(courseId, studentEmail) {
    return courseRepo.removeEnrolledStudent(courseId, studentEmail);
  }

  removeAttendedStudent(courseId, classId, studentEmail) {
    return courseRepo.removeAttendedStudent(courseId, classId, studentEmail);
  }

  deleteCourse(courseId) {
    return courseRepo.deleteCourse(courseId);
  }

  addCourse(courseData) {
    return courseRepo.addCourse(courseData);
  }
}

module.exports = new CourseService();