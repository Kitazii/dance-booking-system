// Class model for the application
class Class {
    constructor(data) {
      this.classId = data.classId || null;
      this.title = data.title || null;
      this.description = data.description || null;
      this.summary = data.summary || null;
      this.teacher = data.teacher || null;
      this.date = data.date || null;
      this.time = data.time || null;
      this.location = data.location || null;
      this.price = data.price || null;

      this.attendedStudents  = data.attendedStudents || [];

    }
  }
  
  module.exports = Class;