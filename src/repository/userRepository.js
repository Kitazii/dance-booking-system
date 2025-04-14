const Datastore = require('gray-nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/userModel'); // Import the User model

class UserRepository {
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded memory
            this.db = new Datastore({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            //in-memory
            this.db = new Datastore();
        }
    }

    init() {
        const users = [
            new User({
              forename: 'Sam',
              surname: 'Parker',
              email: 'sam@example.com',
              username: 'Sam',
              password: '$2a$10$MvcoTBGzmVUJtcy9k.moZeMZXCszsBzVTxKY2Nzz4GL9i4s4vInj2', // pre-hashed password
              role: 'admin'
            }),
            new User({
              forename: 'Ann',
              surname: 'Smith',
              email: 'ann@example.com',
              username: 'Ann',
              password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S', // pre-hashed password
              role: 'admin'
            }),
            new User({
              forename: 'Peter',
              surname: 'Brown',
              email: 'pet@example.com',
              username: 'Peter',
              password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C', // pre-hashed password
              role: 'student'
            })
        ];

        // Insert each user object into the database.
        users.forEach(user => {
            // Using spread operator to convert the instance to a plain object.
            this.db.insert({ ...user }, (err, newDoc) => {
            if (err) {
                console.log('Error inserting user:', err);
            } else {
                console.log('User inserted:', newDoc);
            }
            });
      });
    }

    create(userData) {
        bcrypt.hash(userData.password, saltRounds).then((hash) =>{
            const newUser = new User({
                forename: userData.forename || null,
                surname: userData.surname || null,
                email: userData.email || null,
                username: userData.username || null,
                password: hash,
                role: userData.role || 'student'
              });

            return new Promise((resolve, reject) => {
                this.db.insert({ ...newUser }, (err, newDoc) => {
                if (err) {
                    console.log('Error inserting user:', userData.username);
                    reject(err);
                } else {
                    console.log('New user created:', newDoc);
                    resolve(newDoc);
                }
                });
            });
        });
    }

    lookup(username, cb) {
        this.db.find({username: username}, function(err, entries) {
            console.log('lookup user:', username, 'entries:', entries,);
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length === 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }

    lookupPromise(username) {
        return new Promise((resolve, reject) => {
          this.db.find({ username: username }, (err, entries) => {
            console.log('lookup user:', username, 'entries:', entries);
            if (err) {
              return reject(err);
            } else {
              if (entries.length === 0) {
                return resolve(null);
              }
              return resolve(entries[0]);
            }
          });
        });
      }

    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, users) {
                if (err) {
                    reject(err);
                } else {
                    const usersInstances = users.map(data => new User(data));
                    resolve(usersInstances);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', usersInstances);
                }
            });
        });
    }

    deleteUser(username) {
        console.log("Deleting user by username: ", username);
        return new Promise((resolve, reject) => {
            this.db.remove(
                { username: username },
                {},
                (err, numRemoved) => {
                if (err) {
                    return reject(err);
                }
                console.log("user deleted, records removed: ", numRemoved);
                // Resolve with the number of removed documents.
                resolve(numRemoved);
                }
            );
        });
    }
}

module.exports = new UserRepository();