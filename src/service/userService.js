const userRepo = require('../repository/userRepository');

class UserService {
  init() {
    return userRepo.init();
  }

  create(username, password) {
    return userRepo.create(username, password);
  }

  lookup(user, cb) {
    return userRepo.lookup(user, cb);
  }
}

module.exports = new UserService();