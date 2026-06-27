const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.signUp = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        //genrate a token 
        const token = jwt.sign(
            { newUser },
            process.env.SECRET_KEY,
            { expiresIn: process.env.LOGIN_EXPIRES })

        res.status(201).json({
            status: 'success',
            authToken: token,
            message: "userCreated Successfully",
            data: {
                newUser
            }
        })
    } catch (err) {
        res.status(500).json({
            status: "Fail",
            message: err.message
        })
    }
}

exports.login = async (req,res)=>{
    try{
        const email = req.body.email
        const password = req.body.password

        if(!email || email === ''){
            res.status(400).json({
                status:'fail',
                message:'please enter valid email'
            })
        }
        if(!password || password === ''){
            res.status(400).json({
                status:'fail',
                message:'please enter valid password'
            })
        }
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(403).json({
                status: 'fail',
                message: 'no user found'
            })
        }
        const match = await user.comparePassword(password, user.password)
        if(!match){
            res.status(403).json({
                status:'fail',
                message:'username or password is incorrect'
            })
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: process.env.LOGIN_EXPIRES })


        res.status(200).json({
            status:'success',
            message:'login successful',
            authToken: token
        })
    }
    catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}