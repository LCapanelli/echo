const mongooseUser = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongooseUser.Schema({
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
        required: true,
        minLength: 4
    },
    gender: String,
    isActive: Boolean,
    showNotifications: Boolean,
    image: String,
    hash: String
}, {timestamps: true});

UserSchema
    .plugin(uniqueValidator, { message: 'This user is already taken.' });

UserSchema.methods.validPassword = function(password) {
    bcrypt
        .compare(password, this.hash, function(err, result) {
        return result;
    });
    };

UserSchema.statics
    .findByLogin = async function (login) {
    let user = await this.findOne({
        username: login,
    });
    if (!user) {
        user = await this.findOne({ email: login });
    }
    return user;
};

// UserSchema.methods
//     .toAuthJSON = function(){
//     return {
//         username: this.username,
//         email: this.email,
//         token: this.generateJWT(),
//         image: this.image
//         };
//     };

module.exports = mongooseUser.model('User', UserSchema);
