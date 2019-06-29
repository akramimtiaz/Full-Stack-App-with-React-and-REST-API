const { validationResult } = require('express-validator/check');
const bcryptjs = require('bcryptjs');

const { models } = require('../db');
const { User } = models;

exports.getUser = (req, res) => {
    const user = req.currentUser;
    res.json(user);
}

exports.createUser = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        res.status(400).json({ errors: errorMessages });
    } else {
        let user = req.body;
        user.password = bcryptjs.hashSync(user.password);
        
        User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress,
            password: user.password
        })
        .then(() => res.status(201).location('/').end())
        .catch(err => console.log(err));
    }
}