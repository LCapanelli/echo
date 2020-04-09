// const numeral = require('../node_modules/numeral');
// const value = numeral(999).format('$0,0.00');
// const dbConnect = require('../app/config/dbConnect');
// console.log(`I would pay ${value} for this course!`); // eslint-disable-line no-console
// setTimeout(dbConnect, 1000);
// console.log(process.env.DB_PORT);
//console.log(dbFullPath);
// database connection
// mongoose
//     .connect(dbFullPath)
//     .then(() => console.log("=====> DB Connected"));
//
// mongoose.connection.on("error", err => {
//     console.log(`DB connection error: ${err.message}`);
// });
// MUDAR PARA BACKEND ou arquivo único de conexao
// const db = require('../config/database');
// // const mongoose = require('mongoose');
// import mongoose from 'mongoose';
//
// const dbFullPath = db.mongodb.connection.uri + db.mongodb.connection.host;
//
// const connectDB = async () => {
//     try {
//         await mongoose.connect('http://127.0.0.1:27017/test');
//         console.log("MongoDB is Connected...");
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };
