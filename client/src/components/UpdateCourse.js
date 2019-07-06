/**
 * This component provides the "Update Course" screen by rendering 
 * a form that allows a user to update one of their existing courses. 
 * The component also renders an "Update Course" button that when clicked 
 * sends a PUT request to the REST API's /api/courses/:id route. 
 * This component also renders a "Cancel" button that returns the user 
 * to the "Course Detail" screen.
 * STATEFUL COMPONENT
 */
import React, { Component } from 'react'
import axios from 'axios'
//context
import { AuthContext } from './context';

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
       const courseId = this.props.match.params.id
       const { authUser, isAuth } = this.context

       if(isAuth) { //reset to TRUE
            axios.get(`http://localhost:5000/api/courses/${courseId}`, {
                validateStatus: status => status === 200 || status === 404
            })
            .then(response => {
                if(response.status === 200){ //course was found
                    const course  = response.data
                    if(authUser.id === course.User.id){ //the currently signed in user owns the course 
                        this.setState({
                            title: course.title,
                            description: course.description,
                            estimatedTime: course.estimatedTime,
                            materialsNeeded: course.materialsNeeded,
                        })
                    } else { //they are attempting to update a course they don't own
                        this.props.history.push("/forbidden")
                    }
                } else if (response.status === 404){ //course was not found
                    this.props.history.push("/notfound")
                    throw response.data
                }
            })
            .catch(error => console.error(error))
       } else {
           this.props.history.push("/forbidden")
       }
       console.log(this.props.match.params.id)
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

        const courseId = this.props.match.params.id
        const { authUser } = this.context

        const updatedCourse = {
            id: courseId,
            title: this.state.title,
            description: this.state.description,
            estimatedTime: this.state.estimatedTime,
            materialsNeeded: this.state.materialsNeeded,
            userId: authUser.id,
        }

        axios.put(`http://localhost:5000/api/courses/${courseId}`, updatedCourse, {
            auth: {
                username: authUser.emailAddress,
                password: authUser.password,
            },
            validateStatus: status => status === 204 || status === 400,
            responseType: 'json',
        })
        .then(response => {
            if(response.status === 204){
                this.props.history.push(`/courses/${courseId}`)
            } else if (response.status === 400){
                this.setState({ errors: response.data.errors })
                throw response.data
            }
        })
        .catch(error => console.error(error))
    }

    render(){
        const { isAuth, authUser } = this.context
        const { title, description, estimatedTime, materialsNeeded, errors } = this.state
        return (
            <div className="updateCourse--wrapper">
                <h2>Create Course</h2>
                <ul className="errors">{errors ? errors.map((error,index) => error ? <li key={index}>{error}</li>: null) : null}</ul>
                <form onSubmit={this.handleSubmit}>
                    <div className="updateCourse">
                        <div className="updateCourse--left">
                            <p>Course</p>
                            <input type="text" id="title" name="title" placeholder="Course title..." 
                                    value={title} onChange={this.handleChange}/>

                            <p>By {isAuth ? authUser.firstName : 'N/A'}</p>

                            <textarea type="text" id="description" name="description" placeholder="Course description..." 
                                    value={description} onChange={this.handleChange}></textarea>
                        </div>
                        <div className="updateCourse--right">
                            <div>Estimated Time<br/>
                            <textarea type="text" name="estimatedTime" id="estimatedTime" placeholder="Hours..." 
                                    value={estimatedTime} onChange={this.handleChange}></textarea>
                        </div>
                        <div>Materials Needed<br/>
                            <textarea type="text" name="materialsNeeded" id="materialsNeeded" placeholder="List Materials..." 
                                    value={materialsNeeded} onChange={this.handleChange}></textarea>
                        </div>
                        </div>
                    </div>
                    <button name="create" type="submit" className="updateCourse--button">Update Course</button>
                </form>
                <button name="cancel" onClick={this.handleCancel} className="updateCourse--button">Cancel</button>
            </div>
        )
    }
}
UpdateCourse.contextType = AuthContext

export default UpdateCourse