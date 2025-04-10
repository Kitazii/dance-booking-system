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
const servicesRouter = require('./routes/servicesRoutes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const errorRouter = require('./routes/errorRoutes');

const public = path.join(__dirname, 'public');

const app = express();

app.use(cookieParser());
//using body-parser to parse incoming request bodies before your handle them
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(public));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

//use the routes
app.use('/courses', coursesRouter);
app.use('/services', servicesRouter);
app.use('/adminDashboard', adminRouter);
app.use('/', homeRouter);
app.use('/', userRouter);
app.use('/', errorRouter);


app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});