const classModel = require('./classModel'); // Assuming classModel.js is in the same directory

class Course {
    constructor(data) {
      this.id = data._id;
      this.name = data.name;
      this.description = data.description;
      this.intro = data.intro;
      this.category = data.category;
      this.courseLead = data.courseLead;
      this.duration = data.duration;
      this.difficulty = data.difficulty;
      this.sessions = data.sessions;
      this.type = data.type;
      this.teachers = data.teachers;
      // Convert plain class objects to ClassModel instances
      this.classes = Array.isArray(data.classes)
        ? data.classes.map(item => new classModel(item))
        : [];
      //defaults to empty array
      this.enrolledStudents = data.enrolledStudents || [];
      this.attendedStudents = data.attendedStudents || [];
    }
  
    // Example helper: compute a short summary if needed
    getSummary() {
      return this.intro && this.intro.substring(0, 150) + '...';
    }
  }
  
  module.exports = Course;