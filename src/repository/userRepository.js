const Datastore = require('gray-nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

    //for the demo the password is the bcrypt of the username
    init() {
        this.db.insert({ user: 'Peter', password: '$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C' });
        this.db.insert({ user: 'Ann', password: '$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S' });
        return this;
    }

    create(username, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var entry = { user: username, password: hash };
            that.db.insert(entry, function(err) {
                if (err) {
                    console.log('error inserting user:', username);
                }
            });
        });
    }

    lookup(user, cb) {
        this.db.find({'user': user}, function(err, entries) {
            console.log('lookup user:', user, 'entries:', entries,);
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