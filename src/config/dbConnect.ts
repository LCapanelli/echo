const mongoose = require('mongoose');
const db = require('./database.ts');
const dbPath = `mongodb+srv://`+ db.mongodb.connection.username + `:` + db.mongodb.connection.password + `@` + db.mongodb.connection.host;

const chalkDb = require('chalk');

// console.log(chalkDb.yellow("Mongoose default connection is open to " + dbPath)); // eslint-disable-line no-console

    exports.connectDb = async () => {
        try {
            await mongoose.connect(dbPath, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            // mongoose.set('useCreateIndex', true);
            console.log(chalkDb.greenBright("MongoDB is Connected..."));    // eslint-disable-line no-console
        } catch (err) {
            console.error(chalkDb.red(err.message));    // eslint-disable-line
            process.exit(1);
        }
    }
