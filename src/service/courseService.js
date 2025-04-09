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

  postAttendedData(courseId, attendenceData) {
    return courseRepo.postAttendedData(courseId, attendenceData);
  }

  getClassById(classId) {
    return courseRepo.getClassById(classId);
  }

  getSchedule() {
    return courseRepo.getSchedule();
  }
}

module.exports = new CourseService();