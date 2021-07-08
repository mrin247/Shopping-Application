// Import models
const User = require('../models/user');

exports.postSignup = (req,res,next)=>{
    User.findOne({email: req.body.email}).exec((err,user)=>{
        if(user) return res.status(400).json({
            message: "User is already registered"
        })

        const {firstName, lastName, email, password} = req.body;
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            userName: Math.random().toString()
        })
        _user.save((err,data)=>{
            if(err) return res.status(400).json({
                err: err,
                message: "Something went wrong"
            })

            if(data){
                return res.status(201).json({
                    message: "user created successfully"
                })
            }
        });
    })
}