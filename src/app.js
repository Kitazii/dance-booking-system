const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const courseService = require('./service/courseService');
courseService.init();

//declare the routes
const homeRouter = require('./routes/homeRoutes');
const coursesRouter = require('./routes/coursesRoutes');
const servicesRouter = require('./routes/servicesRoutes');

const public = path.join(__dirname, 'public');

const app = express();
//using body-parser to parse incoming request bodies before your handle them
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(public));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

//use the routes
app.use('/', homeRouter)
app.use('/courses', coursesRouter)
app.use('/services', servicesRouter)

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});