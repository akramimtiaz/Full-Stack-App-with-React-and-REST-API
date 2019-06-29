const express = require('express');
const router = express.Router();

const authenticate = require('./misc/authenticate');
const validate = require('./misc/validation/course');
const controller = require('../../controllers/courses');

//GET - 200 - Returns a list of courses (including the user that owns each course)
router.get('/', controller.getCourses);

//GET - 200 - Returns the course (including the user that owns the course) for the provided course ID
router.get('/:id', controller.getCourse);

//POST - 201 - Creates a course, sets the Location header to the URI for the course, and returns no content
router.post('/', authenticate, validate.courseInfo, controller.createCourse);

//PUT - 204 - Updates a course and returns no content
router.put('/:id', authenticate, validate.courseInfo, controller.updateCourse);

//DELETE - 204 - Deletes a course and returns no content
router.delete('/:id', authenticate, controller.deleteCourse);

module.exports = router;