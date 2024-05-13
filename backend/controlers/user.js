const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = (req, res, next)=> {
    bcrypt.hash(req.body.password, 10, )
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save().then(result => {
            res.status(200).json({
                message: 'User Created',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'User with this email was already created!'
            })
        })
    })
}

exports.login = (req, res, next)=>{
    let fetchedUser;
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user) {
            return res.status(401).json({
                message: 'User with this email does not exist'
            })
        }
        fetchedUser = user
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result) {
            return res.status(404).json({
                message: 'Invalid password'
            })
        }
            const token = jwt.sign({
                email: fetchedUser.email, userId: fetchedUser._id}, 
                'secret_this_should_be_longer', 
                {expiresIn: '1h'})
                console.log(token)
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            })
    })
    }