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
            { _id: 'hiphop123', name: 'Hip-Hop Foundation', description: 'A course that covers the basics of hip hop dance.', classes: [
                { title: 'Foundational Moves and Grooves', description: 'Learn the basic moves and grooves of hip hop dance.', teacher: 'Shuan Push' },
                { title: 'Rhythm, Musicality, and Flow', description: 'Develop an understanding of rhythm and musicality.' },
                { title: 'Choreography and Freestyle Expression', description: 'Explore choreographed sequences and freestyle expression.' }]
            },
            { _id: 'breaking456', name: 'Breaking Basics', description: 'Learn the fundamentals of breaking dance.' , classes: [
                { title: 'Breakdance fundamentals', description: 'Learn the basics of breaking.', teacher: 'Rudy Mbunzu' },
                { title: 'Toprock and Footwork', description: 'Master the art of toprock and footwork.', teacher: 'Bboy Jazzy' },
                { title: 'Freezes and Power Moves', description: 'Learn how to execute freezes and power moves.', teacher: 'Bboy Spin' }]
            },
            { _id: 'urban789', name: 'Urban Choreography', description: 'Explore modern urban dance choreography.' , classes: [
                { title: 'Urban Dance Styles', description: 'Learn various urban dance styles.', teacher: 'Janelle Cruz' },
                { title: 'Choreography Techniques', description: 'Understand choreography techniques.', teacher: 'Ricky Styles' },
                { title: 'Group Choreography Project', description: 'Collaborate on a group choreography project.', teacher: 'Janelle Cruz' }]
            }
        ];

        courses.forEach(course => {
            this.db.insert(course, function(err, newDoc) {
                if (err) {
                    console.log('Error inserting course: ' + err);
                } else {
                    console.log('Course inserted: ' + newDoc);
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
                    //to see what the returned data looks like
                    console.log('function all() returns: ', courses);
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


    getSchedule() {
        return new Promise((resolve, reject) => {
        this.db.find({}, function(err, courses) {
            if (err) {
            return reject(err);
            }
            
            // Find each course by its _id (assuming they exist in the DB)
            const hiphop = courses.find(c => c._id === 'hiphop123');
            const breaking = courses.find(c => c._id === 'breaking456');
            const urban = courses.find(c => c._id === 'urban789');
            
            // Build the schedule.
            // In this mapping:
            // • The first row ("10:00am") uses each course’s class at index 0.
            // • The second row ("12:00pm") uses each course’s class at index 1.
            // • The third row ("01:00pm") uses each course’s class at index 2.
            // If a teacher name is missing, we use "TBA" as a fallback.
            const schedule = {
            rows: [
                {
                time: "10:00am",
                cells: [
                    { content: { 
                        course: hiphop.name, 
                        class: hiphop.classes[0].title, 
                        teacher: hiphop.classes[0].teacher 
                    } 
                    },
                    { content: { 
                        course: breaking.name, 
                        class: breaking.classes[0].title, 
                        teacher: breaking.classes[0].teacher 
                    } 
                    },
                    { content: { 
                        course: urban.name, 
                        class: urban.classes[0].title, 
                        teacher: urban.classes[0].teacher 
                    } 
                    },
                    { content: { 
                        course: hiphop.name, 
                        class: hiphop.classes[1].title, 
                        teacher: hiphop.classes[1].teacher || "TBA" 
                    } 
                    },
                    { content: { 
                        course: hiphop.name, 
                        class: hiphop.classes[2].title, 
                        teacher: hiphop.classes[2].teacher || "TBA" 
                    } 
                    },
                    { content: { 
                        course: urban.name, 
                        class: urban.classes[2].title, 
                        teacher: urban.classes[2].teacher 
                    } 
                    },
                    { empty: true
                    }
                ]
                },
                {
                time: "12:00pm",
                cells: [
                    { content: { 
                        course: hiphop.name, 
                        class: hiphop.classes[1].title, 
                        teacher: hiphop.classes[1].teacher || "TBA" 
                    } 
                    },
                    { content: { 
                        course: breaking.name, 
                        class: breaking.classes[1].title, 
                        teacher: breaking.classes[1].teacher 
                    } 
                    },
                    { content: { 
                        course: urban.name, 
                        class: urban.classes[1].title, 
                        teacher: urban.classes[1].teacher 
                    } 
                    },
                    { content: { 
                        course: urban.name, 
                        class: urban.classes[2].title, 
                        teacher: urban.classes[2].teacher 
                    } 
                    },
                    { content: { 
                        course: breaking.name, 
                        class: breaking.classes[0].title, 
                        teacher: breaking.classes[0].teacher 
                    } 
                    },
                    { content: { 
                        course: hiphop.name, 
                        class: hiphop.classes[2].title, 
                        teacher: hiphop.classes[2].teacher || "TBA" 
                    } 
                    },
                    { empty: true
                    }
                ]
                },
                {
                time: "01:00pm",
                cells: [
                    { content: { 
                        course: hiphop.name, 
                        class: hiphop.classes[2].title, 
                        teacher: hiphop.classes[2].teacher || "TBA" 
                    } 
                    },
                    { content: { 
                        course: breaking.name, 
                        class: breaking.classes[2].title, 
                        teacher: breaking.classes[2].teacher 
                    } 
                    },
                    { content: { 
                        course: urban.name, 
                        class: urban.classes[2].title, 
                        teacher: urban.classes[2].teacher 
                    } 
                    },
                    { empty: true
                    },
                    { empty: true
                    },
                    { empty: true
                    },
                    { content: { 
                        course: urban.name, 
                        class: urban.classes[1].title, 
                        teacher: urban.classes[1].teacher 
                    } 
                    },
                ]
                }
            ]
            };
            
            resolve(schedule);
        });
        });
    }
    // getSchedule() {
    //     return new Promise((resolve, reject) => {
    //         this.db.find({}, function(err, courses) {
    //             if (err) {
    //                 reject(err);
    //             } else {
    //                 let schedule = [];
    //                 courses.forEach(course => {
    //                     course.classes.forEach(courseClass => {
    //                         schedule.push({
    //                             course: course.name,
    //                             class: courseClass.title,
    //                             teacher: courseClass.teacher
    //                         });
    //                     });
    //                 });
    //                 resolve(schedule);
    //             }
    //         });
    //     });
    // }
}

module.exports = Course;