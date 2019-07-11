import React, { Component } from 'react'
//api request
import { createCourse } from './api'
//components
import CourseForm from './misc/CourseForm'
//context
import { AuthContext } from './context'

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
        this.props.history.push("/") //returns user to index page
    }

    handleSubmit = (e) => {
        e.preventDefault() //prevent page refresh
        
        const { authUser } = this.context
        const { title, description, estimatedTime, materialsNeeded } = this.state

        const newCourse = { //Create a New Course Object
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authUser.id, 
        }
        
        createCourse(newCourse, authUser)
        .then(() => this.props.history.push("/")) // Course Successfully Created, Redirect To Index
        .catch(error => {
            if(error.status === 400){ //400 - Bad Request - Essential Data Required in the Course Object was Missing/Invalid
                this.setState({ errors: error.data.errors })
            } else { // 500 - Internal Server Error 
                this.props.history.push("/error")
            }
        })
    }


    render(){
        return (
            <CourseForm 
                page={'Create'}
                {...this.context}
                {...this.state}
                handleChange={this.handleChange}
                handleCancel={this.handleCancel}
                handleSubmit={this.handleSubmit}
            />
        )
    }
}
CreateCourse.contextType = AuthContext

export default CreateCourse