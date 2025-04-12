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
        // this.db.insert({ user: 'Peter', password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C', role: 'student' });
        // this.db.insert({ user: 'Sam', password: '$2a$10$MvcoTBGzmVUJtcy9k.moZeMZXCszsBzVTxKY2Nzz4GL9i4s4vInj2', role: 'admin' });
        // this.db.insert({ user: 'Ann', password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S', role: 'staff' });
        // return this;
    }

    create(username, password, role = 'student') {
        bcrypt.hash(password, saltRounds).then((hash) =>{
            const newUser = new User({
                username: username,
                password: hash,
                role: role});
            //var entry = { user: username, password: hash, role: role };
            this.db.insert({ ...newUser }, (err, newDoc) => {
                if (err) {
                  console.log('Error inserting user:', username);
                } else {
                  console.log('New user created:', newDoc);
                }
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
}

module.exports = new UserRepository();