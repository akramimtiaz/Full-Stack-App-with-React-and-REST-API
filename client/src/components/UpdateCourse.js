import React, { Component } from 'react'
//api requests
import { getCourse, updateCourse } from './api'
//components
import CourseForm from './misc/CourseForm'

class UpdateCourse extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
            errors: null,
        }
    }

    componentDidMount() {
       const id = this.props.match.params.id
       const isAuth = localStorage.getItem('isAuth')
       const authUser = JSON.parse(localStorage.getItem('authUser'))

       if(isAuth) {
            getCourse(id)
            .then(course => {
                if(course.User.id === authUser.id){
                    this.setState({
                        title: course.title,
                        description: course.description,
                        estimatedTime: course.estimatedTime,
                        materialsNeeded: course.materialsNeeded,
                    })
                } else { // Authenticated User Does NOT Own The Requested Course
                    this.props.history.push("/forbidden")
                }
            })
            .catch(error => {
                if(error === 404){
                    this.props.history.push("/notfound")
                } else {
                    this.props.history.push("/error")
                }
            })
       } else { // User is NOT Authenticated
           this.props.history.push("/forbidden")
       }
    }

    handleCancel = (e) => {
        this.props.history.push("/")
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault() //prevent page reload

        const id = this.props.match.params.id
        const authUser = JSON.parse(localStorage.getItem('authUser'))
        const { title, description, estimatedTime, materialsNeeded } = this.state

        const updatedCourse = {
            id,
            title, 
            description,
            estimatedTime,
            materialsNeeded,
            userId: authUser.id,
        }

        updateCourse(id, updatedCourse, authUser)
        .then(() => this.props.history.push(`/courses/${id}`))
        .catch(error => {
            if(error.status === 400){ // 400 - Bad Request
                this.setState({ errors: error.data.errors })
            } else { // 500 - Internal Server Error
                this.props.history.push("/error")
            }
        })
    }

    render(){
        const authUser = JSON.parse(localStorage.getItem('authUser'))
        const isAuth = localStorage.getItem('isAuth')
        return (
            <CourseForm 
                page={'Update'}
                authUser={authUser}
                isAuth={isAuth}
                {...this.state}
                handleChange={this.handleChange}
                handleCancel={this.handleCancel}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}

export default UpdateCourse