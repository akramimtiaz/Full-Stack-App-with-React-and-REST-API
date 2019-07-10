import React, { Component } from 'react'
//api request
import { createCourse } from './api'
//components
import CourseForm from './misc/CourseForm'

class CreateCourse extends Component {
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

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCancel = (e) => {
        this.props.history.push("/")
    }

    handleSubmit = (e) => {
        e.preventDefault() //prevent page refresh
        
        const authUser = JSON.parse(localStorage.getItem('authUser'))
        const { title, description, estimatedTime, materialsNeeded } = this.state

        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authUser.id, 
        }
        
        createCourse(newCourse, authUser)
        .then(() => this.props.history.push("/")) // Course Successfully Created, Redirect To Index
        .catch(error => {
            if(error.status === 400){
                this.setState({ errors: error.data.errors })
            } else { // 500 - Internal Server Error 
                this.props.history.push("/error")
            }
        })
    }


    render(){
        const isAuth = localStorage.getItem('isAuth')
        const authUser = JSON.parse(localStorage.getItem('authUser'))
        return (
            <CourseForm 
                page={'Create'}
                isAuth={isAuth}
                authUser={authUser}
                {...this.state}
                handleChange={this.handleChange}
                handleCancel={this.handleCancel}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}


export default CreateCourse