const express = require('express');
const router = express.Router();

const authenticate = require('./misc/authenticate');
const validate = require('./misc/validation/user');
const controller = require('../../controllers/users');

//GET - 200 - Returns the currently authenticated user
router.get('/', authenticate, controller.getUser);

//POST - 201 - Creates a user, sets the Location header to "/", and returns no content
router.post('/', validate.userInfo, controller.createUser);

module.exports = router;