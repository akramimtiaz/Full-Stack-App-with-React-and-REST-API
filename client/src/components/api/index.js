import axios from 'axios'


/** 
     * Retrieves all Courses 
     * @return  {Promise}   a Promise object that is either resolved or rejected dependent on the result of the request.
     *                      In the event the request is successful, the courses are returned, else an error is returned.
*/
export const getCourses = () => {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/api/courses',
            method: 'get',
            responseType: 'json',
            validateStatus: status => status === 200,
        })
        .then(response => {
            if(response.status === 200){ // 200 Courses successfully retrieved
                resolve(response.data)
            }
        })
        .catch(error => { // 500 Internal Server Error
            console.error(error)
            reject(error)
        })
    })
}

/** 
     * Retrieves the course that matches the provided ID
     * @param    integer    indicating the ID of the course to be retrieved
     * @return  {Promise}   a Promise object that is either resolved or rejected dependent on the result of the request.
     *                      In the event the request is successful, the course is returned, else the response status is returned.
*/
export const getCourse = (id) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `http://localhost:5000/api/courses/${id}`,
            method: 'get',
            responseType: 'json',
            validateStatus: status => status === 200 || status === 404 || status === 500,
        })
        .then(response => {
            if(response.status === 200){
                resolve(response.data)
            } else { // 404 - Not Found OR 500 - Internal Server Error
                reject(response.status)
            }
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}

/** 
     * Creates a new course
     * @param   object      course object containing information about the course to be created
     * @param   object      user object containing information about the user creating the course
     * @return  {Promise}   a Promise object that is either resolved or rejected dependent on the result of the request.
     *                      However, irrespective of the result, the response is returned.
*/
export const createCourse = (course, user) => {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/api/courses',
            method: 'post',
            data: course,
            responseType: 'json',
            auth: {
                username: user.emailAddress,
                password: user.password,
            },
            validateStatus: status => status === 201 || status === 400 || status === 500,
        })
        .then(response => {
            if(response.status === 201){
                resolve(response)
            } else { // 400 - Bad Request OR 500 - Internal Server Error
                reject(response)
            }
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}


/** 
     * Updates a course that matches the provided ID
     * @param   integer     indicating the ID of the course to be updated
     * @param   object      course object containing the updated course information
     * @param   object      user object containing information about the user requesting the update
     * @return  {Promise}   a Promise object that is either resolved or rejected dependent on the result of the request.
     *                      However, irrespective of the result, the response is returned.
*/
export const updateCourse = (id, course, user) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `http://localhost:5000/api/courses/${id}`,
            method: 'put',
            data: course,
            responseType: 'json',
            auth: {
                username: user.emailAddress,
                password: user.password,
            },
            validateStatus: status => status === 204 || status === 400 || status === 500,
        })
        .then(response => {
            if(response.status === 204){
                resolve(response)
            } else { // 400 - Bad Request OR 500 - Internal Server Error
                reject(response)
            } 
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}

/** 
     * Deletes a course that matches the provided ID
     * @param   integer     indicating the ID of the course to be deleted
     * @param   object      user object containing information about the user deleting the course
     * @return  {Promise}   a Promise object that is either resolved or rejected dependent on the result of the request.
*/
export const deleteCourse = (id, user) => {
    return new Promise((resolve, reject) => {
        axios({
            url: `http://localhost:5000/api/courses/${id}`,
            method: 'delete',
            responseType: 'json',
            auth: {
                username: user.emailAddress,
                password: user.password,
            },
            validateStatus: status => status === 204 || status >= 400,
        })
        .then(response => {
            if(response.status === 204){
                resolve(true)
            } else {
                reject(response.status)
            }
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}

/** 
     * Retrieves the user that matches the provided email
     * @param    string     email of the user to be authenticated
     * @param    string     email of the associated user account
     * @return  {Promise}   a Promise object that is either resolved or rejected dependent on the result of the request.
     *                      In the event the request is successful, the user data is returned, else the response status is returned.
*/
export const getUser = (email, password) => {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/api/users',
            method: 'get',
            responseType: 'json',
            auth: {
                username: email,
                password: password,
            },
            validateStatus: status => status === 200 || status === 401 || status === 500,
        })
        .then(response => {
            if(response.status === 200){ //User Successfully Authenticated
                resolve({...response.data, password})
            } else { // 401 - Authentication Failed || 500 - Internal Server Error
                reject(response.status)
            }
        })
        .catch(error => {
            console.error(error)
            reject(error) //reject the promise
        })
    })
}

/** 
     * Creates a new user
     * @param   object      user object containing information about the user to be created
     * @return  {Promise}   a Promise object that is either resolved or rejected dependent on the result of the request.
     *                      However, irrespective of the result, the response is always returned.
*/
export const createUser = (user) => {
    return new Promise((resolve, reject) => {
        axios({
            url: 'http://localhost:5000/api/users',
            method: 'post',
            data: user,
            responseType: 'json',
            validateStatus: status => status === 201 || status === 400 || status === 500,
        })
        .then(response => {
            if(response.status === 201){
                resolve(response)
            } else {
                reject(response)
            }
        })
        .catch(error => {
            console.error(error)
            reject(error)
        })
    })
}