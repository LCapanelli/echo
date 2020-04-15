// import mongoose from 'mongoose';
// import User from './user';
// import {body} from "express-validator";
// import {response} from "express";
//
// // const connectDb = () => {
// //     return mongoose.connect(process.env.DATABASE_URL);
// // };
//
// index.use(bodyParser.json());
//
// //POST user data to DB
// index.post('/user/signup', (req, res) => {
//     const user = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     }).save((err, response)=>{
//         if (err){
//             res.status(400).send(err);
//         } res.status(200).send(response);
//     })
// })
//
// const models = { User,};
//
// //export { connectDb };
// export default models;