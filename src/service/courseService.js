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

  getClassById(classId) {
    return courseRepo.getClassById(classId);
  }

  getSchedule() {
    return courseRepo.getSchedule();
  }

  removeStudent(courseId, studentEmail) {
    return courseRepo.removeStudent(courseId, studentEmail);
  }
}

module.exports = new CourseService();