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

  getClass(courseId, classId) {
    return courseRepo.getClass(courseId, classId);
  }

  // getSchedule() {
  //   return courseRepo.getSchedule();
  // }

  removeEnrolledStudent(courseId, studentEmail) {
    return courseRepo.removeEnrolledStudent(courseId, studentEmail);
  }

  removeAttendedStudent(courseId, classId, studentEmail) {
    return courseRepo.removeAttendedStudent(courseId, classId, studentEmail);
  }

  deleteCourse(courseId) {
    return courseRepo.deleteCourse(courseId);
  }

  addCourse(courseId,courseData) {
    return courseRepo.addCourse(courseId,courseData);
  }

  deleteClass(classId, courseId) {
    return courseRepo.deleteClass(classId, courseId);
  }

  addClass(classId, courseId) {
    return courseRepo.addClass(classId, courseId);
  }

  updateClass(courseId, originalClassId, classData) {
    return courseRepo.updateClass(courseId, originalClassId, classData);
  }
}

module.exports = new CourseService();