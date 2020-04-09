import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.APP_KEY;

const user = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username can't be blank"],
        unique: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    email: {
        type: String,
            required: [true, "Email can't be blank"],
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, 'is invalid'],
            index: true
    },
    nickname: String,
    dateBirth: Date,
    password: {
        type: String,
        required: true
    },
    gender: String,
    isActive: Boolean,
    showNotifications: Boolean,
    image: String,
    hash: String,
    salt: String
}, {timestamps: true});

user.plugin(uniqueValidator, {message: 'This user is already taken.'});

user.methods.setPassword = function(password){
      this.salt = bcrypt.randomBytes(16).toString('hex');
      this.hash = bcrypt.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    };

user.methods.validPassword = function(password) {
    var hash = bcrypt.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
    };

user.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: new Date(exp.getTime() / 1000),
        }, secret);
    };

user.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        image: this.image
        };
    };

user.statics.findByLogin = async function (login) {
    let user = await this.findOne({
        username: login,
    });
    if (!user) {
        user = await this.findOne({ email: login });
    }
    return user;
};

const User = mongoose.model('User', user);

export default User;