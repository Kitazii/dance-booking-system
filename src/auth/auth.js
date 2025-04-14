bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userService= require('../service/userService');

exports.login = function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    userService.lookup(username, function(err, user) {
        if (err) {
            console.log("error looking up user", err);
            return res.status(401).send();
        }
        if(!user) {
            console.log("user ", username, "not found");
            return res.status(401).render('user/login', { error: "user does not exist" });
        }

        //compare provided password with stored password
        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                //if user exists we will write code to create a JWT here
                let payload = {
                    username: user.username,
                    role: user.role,
                    forename: user.forename,
                    surname: user.surname,
                    email: user.email
                };
                let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                res.cookie("jwt", accessToken);
                //and then pass onto the next middleware
                next();
            } else {
                return res.status(403).render('user/login', { error: "Incorrect credentials, please try again." });
            }
        });
    });
};

exports.register = function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const userData = {
        username: username,
        password: password,
    };

    if (!username || !password) {
        return res.send(401, 'no user or no password');
    }
    userService.lookup(username, function(err, u) {
        if (u) {
            return res.status(401).render('user/register', { error: "user exists" });
        }
        userService.create(userData);
        console.log('register user', username, "password", password);
        return next();
    });
}

exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt;
    if (!accessToken) {
        return res.status(403).send();
    }
    let payload;
    try {
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (e) {
        //if an error occurred return request unauthorized error
        res.status(401).send();
    }
};

exports.persistence = function (req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        try {
            // Verify the token to extract payload data
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // Attach user info to locals so it can be accessed in views
            res.locals.user = {
                username: payload.username,
                role: payload.role,
                forename: payload.forename,
                surname: payload.surname,
                email: payload.email
            };
        } catch (err) {
            // Optional: handle errors (e.g., token expired or invalid)
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
};


exports.authorizeRole = function(allowedRoles, idParamName = 'courseId', redirectPath = '/courses/details') {
    return function (req, res, next) {
        const token = req.cookies.jwt;
        const id = req.query[idParamName] || '';

        // If there is no token, user is not logged in, so we treat them as guest (allowed)
        if (!token) {
            //return res.status(403).send("Unauthorized: No token provided");
            return next();
        }
        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (allowedRoles.includes(payload.role)) {
                return next();
            } else {
            // Set a flash message for unauthorized access
            req.flash('errorAuth', 'Unauthorized. Must be unregistered or registered student.');
            // Redirect back to the details page without an error in the URL
            return res.redirect(`${redirectPath}?${idParamName}=${id}`);
            }
        } catch (err) {
            // Set a flash message for invalid token
            req.flash('errorAuth', 'Invalid token.');
            return res.redirect(`${redirectPath}?${idParamName}=${id}`);
        }
    }
};
