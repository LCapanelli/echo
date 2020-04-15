const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const chalk = require('chalk');

// const handlebars = require("handlebars");

// const indexRouter = require('../src/routes');
// const usersRouter = require('routerUser');

const connectDbModule = require('../src/config/dbConnect.ts');
const userSchema = require('../src/models/user.ts');

// APP ==================================================
const index = express();
const port = process.env.PORT || 3000;

index.get("/", (req, res) => {
  res.json({ message: 'ECHO API Working' });
});
// index.get('/', function (req, res) {
//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

const createUsers = async () => {
    const user1 = new userSchema.User({
        username: 'userTest', email: 'email@gmail.com', password: '888888'
    });

    await user1.save();
};

async function connectAsync() {
    function appListening() {
        return new Promise(resolve => {
                resolve(
                    index.listen(port, function (err) {
                        if (err) {
                            console.log(err);   // eslint-disable-line
                        } else {
                            console.log(chalk.greenBright(`APP ECHO: server started at ${port}`));  // eslint-disable-line
                            createUsers();
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
index.set('views', path.join(__dirname, 'views'));
index.set('view engine', 'hbs');

//Sets handlebars configurations (we will go through them later on)
// index.engine('hbs', handlebars({
//   layoutsDir: __dirname + '/views/layouts',
//   extname: 'hbs'
// }));

index.get('/', (req, res) => {
//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render('main', {layout : 'index'});
});

index.use(logger('dev'));
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());
index.use(bodyParser.json()); //converts data body to JSON
index.use(express.static(path.join(__dirname, 'public')));

// index.use('/', indexRouter);
// index.use('/users', usersRouter);

// catch 404 and forward to error handler
index.use(function(req, res, next) {
  next(createError(404));
});

// error handler
index.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = index;
