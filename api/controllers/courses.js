const { models } = require('../db');
const { User, Course } = models;

const { validationResult } = require('express-validator/check');

exports.getCourses = (req, res) => {
    Course.findAll({
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded', 'userId'],
        include: [{ model: User, as: 'User', attributes: ['id', 'firstName', 'lastName', 'emailAddress']}] //association User table to also be included in query
    })
    .then(courses => res.status(200).json(courses))
    .catch(error => console.log(error));
}

exports.getCourse = (req, res) => {
    const id = req.params.id;
    Course.findOne({
        attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded'],
        include: [{ model: User, as: 'User', attributes: ['id', 'firstName', 'lastName', 'emailAddress']}],
        where: {
            id: id
        }
    })
    .then(course => {
        if(course){
            res.status(200).json(course);
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    })
    .catch(error => console.log(error));
}

exports.createCourse = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        res.status(400).json({ errors: errorMessages });
    } else {
        const course = req.body;
        Course.create({
            title: course.title,
            description: course.description,
            estimatedTime: course.estimatedTime,
            materialsNeeded: course.materialsNeeded,
            userId: course.userId    
        })
        .then((course) => res.status(201).location(`/api/courses/${course.id}`).end())
        .catch((error) => console.log(error));
    }
}

exports.updateCourse = (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        res.status(400).json({ errors: errorMessages });
    } else {
        Course.findOne({
            where: {
                id: id
            }
        })
        .then((course) => {
            if(course){
                if(course.userId == req.currentUser.id){
                    course.update({
                        title: req.body.title,
                        description: req.body.description,
                        estimatedTime: req.body.estimatedTime,
                        materialsNeeded: req.body.materialsNeeded,
                        userId: req.body.userId
                    })
                    .then(() => res.status(204).end())
                    .catch(error => console.log(error));
                } else {
                    res.status(403).end();
                }
            } else {
                res.status(404).json({ error: 'Not Found' });
            }
        })
        .catch((error) => console.log(error));
    }
}

exports.deleteCourse = (req, res) => {
    const id = req.params.id;
    Course.findOne({
        where: {
            id: id
        }
    })
    .then(course => {
        if(course){
            if(course.userId == req.currentUser.id){
                course.destroy();
                res.status(204).end();
            } else {
                res.status(403).end();
            }
        } else {
            res.status(404).json({ error: 'Not Found' });
        }
    })
    .catch(error => console.log(error));
}