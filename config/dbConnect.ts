const db = require('./database.ts');
const chalkDb = require('chalk');

const mongoose = require('mongoose');
const dbPath = `mongodb+srv://`+ db.mongodb.connection.username + `:` + db.mongodb.connection.password + `@` + db.mongodb.connection.host;

console.log(chalkDb.yellow("Mongoose default connection is open to " + dbPath)); // eslint-disable-line no-console

//export this function and imported by server.js
//module.exports = function(){
    const connectDB = async () => {
        try {
            await mongoose.connect(dbPath, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            console.log(chalkDb.bgGreen("MongoDB is Connected..."));
        } catch (err) {
            console.error(chalkDb.red(err.message));
            process.exit(1);
        }
    };
    // connectDB().then();
//}
