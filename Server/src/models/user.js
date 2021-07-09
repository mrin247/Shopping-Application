const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

// ! Create user schema
const userSchema= new Schema({
    firstName:{
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName:{
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20,
    },
    userName:{
        type: String,
        require: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    contactNumber: {type: String},
    profilePicture: {type: String},
},{timestamps:true});


// ! userSchema methods
userSchema.virtual('password').set(function(password){
    this.hash_password= bcrypt.hashSync(password,10);
});

userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
});

userSchema.methods= {
    authenticate: function(password){
        return bcrypt.compareSync(password,this.hash_password);
    }
};

// ! exports userSchema as User model
module.exports = mongoose.model('User', userSchema);