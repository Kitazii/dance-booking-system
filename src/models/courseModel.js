const nedb = require('gray-nedb');

class Course {
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded memory
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            //in-memory
            this.db = new nedb();
        }
    }

    // Initialize the database with some data
    init() {
        const courses =  [
            { _id: 'hiphop123', name: 'Hip-Hop Foundation', description: 'A course that covers the basics of hip hop dance.' },
            { _id: 'breaking456', name: 'Breaking Basics', description: 'Learn the fundamentals of breaking dance.' },
            { _id: 'urban789', name: 'Urban Choreography', description: 'Explore modern urban dance choreography.' }
        ];
        
        courses.forEach(course => {
            this.db.insert(course, function(err, newDoc) {
                if (err) {
                    console.log('Error inserting course: ' + err);
                } else {
                    console.log('Course inserted: ' + JSON.stringify(newDoc));
                }
            });
        });
    }

    // Get all courses
    getAllCourses() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, courses) {
                if (err) {
                    reject(err);
                } else {
                    resolve(courses);
                }
            });
        });
    }

    // Get course by ID
    getCourseById(courseId) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: courseId }, function(err, course) {
                if (err) {
                    reject(err);
                } else {
                    resolve(course);
                }
            });
        });
    }
}

module.exports = Course;