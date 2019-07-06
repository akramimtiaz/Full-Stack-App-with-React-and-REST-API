import axios from 'axios'

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