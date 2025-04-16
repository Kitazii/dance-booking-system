const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//singleton calls
const courseService = require('./service/courseService');
const userService = require('./service/userService');
courseService.init();
userService.init();

//declare the routes
const homeRouter = require('./routes/homeRoutes');
const coursesRouter = require('./routes/coursesRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const studentRouter = require('./routes/studentRoutes');
const errorRouter = require('./routes/errorRoutes');

const public = path.join(__dirname, 'public');

const app = express();

app.use(cookieParser());
//using body-parser to parse incoming request bodies before your handle them
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(public));

//Set up session and flash messages
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({
  secret: process.env.SESSION_SECRET, // Change for production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure: true if you are using HTTPS
}));

app.use(flash());

// Global middleware to load classes for navigation
app.use((req, res, next) => {
  // Use the service to load all classes across courses
  courseService.getAllClasses()
    .then(classes => {
      // Attach the classes to res.locals so they are available to all views
      res.locals.classes = classes;
      next();
    })
    .catch(err => {
      console.error("Error fetching classes for navigation:", err);
      next(err);
    });
});

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

//use the routes
app.use('/courses', coursesRouter);
app.use('/adminDashboard', adminRouter);
app.use('/studentDashboard', studentRouter);
app.use('/', homeRouter);
app.use('/', userRouter);
app.use('/', errorRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});