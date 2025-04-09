const userRepo = require('../repository/userRepository');

class UserService {
  init() {
    return userRepo.init();
  }

  create(username, password, role = 'customer') {
    return userRepo.create(username, password);
  }

  lookup(user, cb) {
    return userRepo.lookup(user, cb);
  }
}

module.exports = new UserService();