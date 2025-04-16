const userRepo = require('../repository/userRepository');

//for security we use a service layer to access the repository layer
class UserService {
  init() {
    return userRepo.init();
  }

  create(userData) {
    return userRepo.create(userData);
  }

  lookup(user, cb) {
    return userRepo.lookup(user, cb);
  }

  lookupPromise(user) {
    return userRepo.lookupPromise(user);
  }
  
  getAllUsers() {
    return userRepo.getAllUsers();
  }

  deleteUser(username) {
    return userRepo.deleteUser(username);
  }

  // addUser(userData) {
  //   return userRepo.addUser(userData);
  // }
}

module.exports = new UserService();