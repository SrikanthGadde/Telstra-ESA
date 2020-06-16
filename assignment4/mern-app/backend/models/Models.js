const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        default: '',
        required: true,
        trim: true,
        minlength: 3
    },
    lastName: {
        type: String,
        default: '',
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        default: '',
        required: true,
        trim: true,
        minlength: 3
    }
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Users', userSchema);



const contactSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        default: '',
        required: false,
        trim: true,
    },
    phone: {
        type: Number,
        default: '',
        required: true,
        trim: false,
        minlength: 10
    },
    createdBy: [String]
});

module.exports = mongoose.model('Contacts', contactSchema);

const sessionSchema = new Schema({
    email: {
        type: String,
        default: '',
        required: true,
        trim: true,
        minlength: 5
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Sessions', sessionSchema);