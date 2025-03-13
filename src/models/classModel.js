const nedb = require('gray-nedb');

class Class {
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

    // Initialize the database with some data for classes depending on the course
    init() {
        const classes = [
            // Classes for Hip-Hop Foundation (courseId: 'hiphop123')
            { courseId: 'hiphop123', title: 'Foundational Moves and Grooves', description: 'Learn the basic moves and grooves of hip hop dance.' },
            { courseId: 'hiphop123', title: 'Rhythm, Musicality, and Flow', description: 'Develop an understanding of rhythm and musicality.' },
            { courseId: 'hiphop123', title: 'Choreography and Freestyle Expression', description: 'Explore choreographed sequences and freestyle expression.' },
            // Classes for Breaking Basics (courseId: 'breaking456')
            { courseId: 'breaking456', title: 'Breakdance Fundamentals', description: 'Master the essential techniques of breakdancing.' },
            { courseId: 'breaking456', title: 'Power Moves & Freezes, Freestyle & Battle Techniques', description: 'Learn power moves, freezes and battle techniques.' },
            // Class for Urban Choreography (courseId: 'urban789')
            { courseId: 'urban789', title: 'Urban Dance Foundations, Choreographic Composition, Performance & Stage Presence', description: 'Develop urban dance fundamentals along with choreographic composition and stage presence skills.' }
        ];

        this.db.insert(classes, function (err, newDocs) {
            if (err) {
              console.error('Error inserting classes:', err);
            } else {
              console.log('Inserted classes:', JSON.stringify(newDoc));
            }
        });
    }

    // Get all classes by course Id
    getClassesByCourseId(courseId) {
        return new Promise((resolve, reject) => {
            this.db.find({ courseId: courseId }, function(err, classes) {
                if (err) {
                    reject(err);
                } else {
                    resolve(classes);
                }
            });
        });
    }
}

module.exports = Class;