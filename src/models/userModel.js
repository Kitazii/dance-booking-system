class User {
    constructor(data) {
      this.email = data.email || null;
      this.username = data.username || null;
      this.password = data.password || null;
    }
  
    // Add methods that encapsulate behavior specific to a class, if needed.
  }
  
  module.exports = User;