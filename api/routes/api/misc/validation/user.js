const { check } = require('express-validator/check');

const { models } = require('../../../../db');
const { User } = models;

exports.userInfo = [
    check('firstName')
        .exists().withMessage(`'firstName' undefined`)
        .isLength({min: 2, max: 255}).withMessage(`please provide a valid first name`),
    check('lastName')
        .exists().withMessage(`'lastName' undefined`)
        .isLength({min: 2, max: 255}).withMessage(`please provide a valid last name`),
    check('password')
        .exists().withMessage(`'password' undefined`)
        .isLength({min: 5, max: 20}).withMessage(`please provide a valid password`),
    check('emailAddress')
        .exists().withMessage(`'emailAddress' undefined`)
        .isEmail().withMessage(`please provide a valid email`)
        .custom(email => {
            if(email){
                return User.findOne({
                    where: {
                        emailAddress: email
                    }
                })
                .then(user => {
                    if(user){
                        return Promise.reject('The specified email is already in use');
                    } 
                });
            } else {
                return Promise.reject('email undefined');
            }
        })
];