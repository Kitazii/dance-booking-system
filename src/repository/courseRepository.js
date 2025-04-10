const nedb = require('gray-nedb');
const Course = require('../models/courseModel');

class CourseRepository {
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

        let breakingIntro = `Break dancing (often called b-boying or b-girling) originated in the early 1970s in the Bronx, New York. As one of the four core elements of hip-hop 
        culture—alongside DJing, MCing, and graffiti—break dancing quickly spread around the world, influencing music videos, movies, and street culture.Our Breaking Basics course 
        explores the foundation of break dancing, from toprock and footwork to power moves and freezes. Each session helps you build core strength, agility, and musicality. 
        By the end of this course, you’ll feel more confident freestyling and creating your own unique style. Whether you’re brand new or looking to refine your skills,  
        this class sets you up for success on the dance floor.`;

         let hiphopIntro = `Hip-Hop dance is a dynamic expression of culture and rhythm, emerging from the urban streets of America and evolving through innovative styles and 
         energetic movement. Our Hip-Hop Foundation course highlights these vibrant techniques, blending funk, soul, and street dance to build confidence, musicality, and 
         creativity in every step. Whether you’re just beginning or refining your skills, this class empowers you to express your unique style through dance.`;

        let urbanChoreoIntro = `Urban Choreography fuses contemporary movement with street-inspired energy, offering a fresh take on modern dance. This course challenges you to 
        push creative boundaries and craft dynamic routines that capture the spirit of urban culture. Through innovative choreography and expressive movement, you’ll learn to 
        transform rhythm into art, building the skills and confidence to make your mark on the dance floor.`;
        
        let summarised = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

        let date = new Date();
        const formattedDate = date.toLocaleDateString('en-US');
        const formattedTime = date.toLocaleTimeString('en-US');

        const courses =  [
            {
                _id: 'hiphop123',
                name: 'Hip-Hop Foundation',
                description: 'A course that covers the basics of hip hop dance.',
                intro: hiphopIntro,
                category: 'Hip-Hop',
                courseLead: 'Man Like Ush',
                duration: '9 Months',
                difficulty: 'Basic',
                sessions: '12 Sessions/Weekly',
                type: 'Class',
                teachers: 3,
                classes: [
                    { classId: 'move&groove', title: 'Foundational Moves and Grooves', description: 'Learn the basic moves and grooves of hip hop dance.', summary:summarised,
                        teacher: 'Shuan Push', date: formattedDate, time: formattedTime, location: '77 Southpark Ave, Glagow G12 8LE', price: 14.99 },
                    { classId: 'ryhthm&mus', title: 'Rhythm, Musicality, and Flow', description: 'Develop an understanding of rhythm and musicality.', summary:summarised,
                        teacher: 'Man Like Ush', date: formattedDate, time: formattedTime, location: '77 Southpark Ave, Glagow G12 8LE', price: 12.99},
                    { classId: 'choreo&free', title: 'Choreography and Freestyle Expression', description: 'Explore choreographed sequences and freestyle expression.', summary:summarised,
                        teacher: 'Kieran Burns', date: formattedDate, time: formattedTime, location: '77 Southpark Ave, Glagow G12 8LE', price: 9.99 }]
            },
            {
                _id: 'breaking456',
                name: 'Breaking Basics',
                description: 'Learn the fundamentals of breaking dance.',
                intro: breakingIntro,
                category: 'Break Dancing',
                courseLead: 'Rudy Mbunzu',
                duration: '9 Months',
                difficulty: 'Basic',
                sessions: '12 Sessions/Weekly',
                type: 'Class',
                teachers: 3,
                classes: [
                    { classId: 'bboyFun', title: 'Breakdance fundamentals', description: 'Learn the basics of breaking.', summary:summarised,
                        teacher: 'Rudy Mbunzu', date: formattedDate, time: formattedTime, location: '77 Southpark Ave, Glagow G12 8LE', price: 12.99 },
                    { classId: 'topRock', title: 'Toprock and Footwork', description: 'Master the art of toprock and footwork.', summary:summarised,
                        teacher: 'Bboy Jazzy', date: formattedDate, time: formattedTime, location: '77 Southpark Ave, Glagow G12 8LE', price: 9.99 },
                    { classId: 'freeze&p',title: 'Freezes and Power Moves', description: 'Learn how to execute freezes and power moves.', summary:summarised,
                        teacher: 'Bboy Spin', date: formattedDate, time: formattedTime, location: '77 Southpark Ave, Glagow G12 8LE', price: 13.99 }]
            },
            {
                _id: 'urban789',
                name: 'Urban Choreography',
                description: 'Explore modern urban dance choreography.',
                intro: urbanChoreoIntro,
                category: 'Urban',
                courseLead: 'Ricky Styles',
                duration: '4 Weeks',
                difficulty: 'Intermediate',
                sessions: '2 Sessions/Weekly',
                type: 'Workshop',
                teachers: 3,
                classes: [
                    { classId: 'urband', title: 'Urban Dance Styles', description: 'Learn various urban dance styles.', summary:summarised,
                        teacher: 'Janelle Cruz', date: formattedDate, time: formattedTime, location: '77 Southpark Ave, Glagow G12 8LE', price: 9.99},
                    { classId: 'choreot', title: 'Choreography Techniques', description: 'Understand choreography techniques.', summary:summarised,
                        teacher: 'Ricky Styles', date: formattedDate, time: formattedTime, location: '77 Southpark Ave, Glagow G12 8LE', price: 10.99 },
                    { classId: 'groupcp', title: 'Group Choreography Project', description: 'Collaborate on a group choreography project.', summary:summarised,
                        teacher: 'Janelle Cruz', date: formattedDate, time: formattedTime, location: '77 Southpark Ave, Glagow G12 8LE', price: 9.99 }]
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
                    const courseInstances = courses.map(data => new Course(data));
                    resolve(courseInstances);
                    //to see what the returned data looks like
                    console.log('function all() returns: ', courseInstances);
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
                    resolve(course ? new Course(course) : null);
                }
            });
        });
    }

    // Post enrolled student data by course by ID
    postEnrolledData(courseId, enrollmentData) {
        return new Promise((resolve, reject) => {
            this.db.update(
              { _id: courseId },
              { $push: { enrolledStudents: enrollmentData } },
              {},
              (err, numReplaced) => {
                if (err) {
                  reject(err);
                } else {
                    console.log("document updated", numReplaced);
                  // After updating, fetch the updated course document.
                  this.db.findOne({ _id: courseId }, (err, course) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(course ? new Course(course) : null);
                    }
                    console.log("document updated", numReplaced);
                  });
                }
            });
        });
    }

    postAttendedData(courseId, classId, attendenceData) {
        return new Promise((resolve, reject) => {
             // Find the course document by courseId.
            this.db.findOne({ _id: courseId }, (err, course) => {
                if (err) {
                return reject(err);
                }
                if (!course) {
                return reject(new Error('Course not found'));
                }
        
                // Ensure the "classes" array exists.
                if (!Array.isArray(course.classes)) {
                return reject(new Error('No classes available in this course.'));
                }
        
                // Locate the index of the class with the matching classId.
                const classIndex = course.classes.findIndex(c => c.classId === classId);
                if (classIndex === -1) {
                return reject(new Error('Class not found'));
                }
        
                // Ensure attendedStudents exists on the class object.
                if (!course.classes[classIndex].attendedStudents) {
                course.classes[classIndex].attendedStudents = [];
                }
        
                // Check for duplicate attendance here if needed (this check might have been done in the controller).
                if (course.classes[classIndex].attendedStudents.some(student => student.email === attendenceData.email)) {
                return reject(new Error('Student already attended this class'));
                }

                // Push the attendance data into the class's attendedStudents array.
                course.classes[classIndex].attendedStudents.push(attendenceData)
  
                this.db.update(
                { _id: courseId},
                course,
                {},
                (err, numReplaced) => {
                    if (err) {
                    reject(err);
                    }
                    console.log("document updated", numReplaced);
                    // After updating, fetch the updated course document.
                    this.db.findOne({ _id: courseId }, (err, updatedCourse) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(updatedCourse  ? new Course(updatedCourse) : null);
                    }
                    console.log("document updated", numReplaced);
                    });
                });
            });
        });
    }

    // Get class by Id
    getClassById(classId) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ 'classes.classId': classId }, function(err, course) {
                if (err) {
                    reject(err);
                } else {
                    resolve(course ? new Course(course) : null);
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
}

module.exports = new CourseRepository();