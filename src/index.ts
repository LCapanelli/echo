const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const chalk = require('chalk');

const handlebars = require("express-handlebars");

// const indexRouter = require('../src/routes/index.ts');

const connectDbModule = require('../src/config/dbConnect.ts');
const userSchema = require('./routes/users.ts');

// APP ==================================================
const app = express();
const port = process.env.PORT;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.json({ message: 'ECHO API Working' });
// });

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", userSchema);

// const createUsers = async () => {
//     const user1 = new userSchema.User({
//         username: 'userTest', email: 'email@gmail.com'
//     });
//     try {
//         await user1.setPassword('909090');
//     } catch (err) {
//         console.log(err);   // eslint-disable-line
//     } finally {
//         await user1.save();
//     }
// };

async function connectAsync() {
    function appListening() {
        return new Promise(resolve => {
                resolve(
                    app.listen(port, function (err) {
                        if (err) {
                            console.log(err);   // eslint-disable-line
                        } else {
                            console.log(chalk.greenBright(`APP ECHO: server started at ${port}`));  // eslint-disable-line
                            // createUsers();
                        }
                    })
                );
        });
    }
    await connectDbModule.connectDb().then(appListening);
}

connectAsync().then(r => console.log('-- connectAsync success --'));


// ======================================================
// view engine setup
const viewsPath = path.join(__dirname, '..', 'views');
app.set('views', viewsPath);

const hbs = handlebars.create({
    defaultLayout: 'main',
    layoutsDir: viewsPath + '/layouts',
    partialsDir: viewsPath + '/partials',
    extname: '.hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
//Serves the body of the page aka "main.hbs" to the container //aka "index.hbs"
  res.render('main', { layout: 'index' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
