import React, { Component } from 'react'
//context
import { AuthContext } from './context';
//api requests
import { getCourse, updateCourse } from './api'

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
       const { authUser, isAuth } = this.context

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
        const { authUser } = this.context
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