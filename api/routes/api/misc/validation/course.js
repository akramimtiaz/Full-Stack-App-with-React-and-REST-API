const { check } = require('express-validator/check');

const { models } = require('../../../../db');
const { User } = models;

exports.courseInfo = [
    check('title')
        .exists().withMessage(`'title' undefined`)
        .isLength({min: 2, max: 255}).withMessage(`please provide a valid title`),
    check('description')
        .exists().withMessage(`'description' undefined`)
        .isLength({min: 2}).withMessage(`please provide a valid description`),
    check('userId')
        .exists().withMessage(`'userId' undefined`)
        .isInt().withMessage('please provide a valid user-id')
        .custom(id => {
            return User.findByPk(id)
            .then(user => {
                if(!user){
                    return Promise.reject('user does not exist');
                }
            });
        })
];