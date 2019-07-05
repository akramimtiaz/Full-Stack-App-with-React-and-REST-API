const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');

const { models } = require('../../../db');
const { User } = models;

const  authenticateUser = async (req, res, next) => {
    let message = null;
    const credentials = auth(req);

    if(credentials){
        const user = await User.findOne({
            attributes: ['id', 'firstName', 'lastName', 'emailAddress', 'password'], //columns to return
            where: {
                emailAddress: credentials.name
            }
        });
        if(user){
            const authenticated = bcryptjs.compareSync(credentials.pass, user.password);
            if(authenticated){ //username exists within db and hashed password matches
                console.log(`Authentication successful for username: ${credentials.name}`);
                req.currentUser = {  //extend request object with 'currentUser' property, can be used elsewhere to obtain authenticated user credentials
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailAddress: user.emailAddress
                }; 
            } else {
                message = `Authentication failure for username: ${credentials.name}`;
            }
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = 'Authentication header not found';
    }

    if (message) { //an error occurred
        console.warn(message);
        res.status(401).json(message);
    } else {
        next();
    }
};

module.exports = authenticateUser;