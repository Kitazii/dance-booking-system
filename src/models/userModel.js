// User model for the application
class User {
    constructor(data) {
      this.forename = data.forename || null;
      this.surname = data.surname || null;
      this.email = data.email || null;
      this.username = data.username || null;
      this.password = data.password || null;
      this.role = data.role || null;
    }
  
    // Add methods that encapsulate behavior specific to a class, if needed.
  }
  
  module.exports = User;