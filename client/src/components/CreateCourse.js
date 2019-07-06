/**
 * The component renders a form allowing a user to create 
 * a new course, a "Create Course" button that when clicked 
 * sends a POST request to the REST API's /api/courses route, 
 * and a "Cancel" button that returns the user to the default route.
 * STATEFUL COMPONENT
 */
import React, { Component } from 'react'
//context
import { AuthContext } from './context'
//validation
import axios from 'axios';

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
        
        const { authUser } = this.context
        const newCourse = {
            title: this.state.title,
            description: this.state.description,
            estimatedTime: this.state.estimatedTime,
            materialsNeeded: this.state.materialsNeeded,
            userId: authUser.id, 
        }
        
        axios.post('http://localhost:5000/api/courses', newCourse, {
            auth: {
                username: authUser.emailAddress,
                password: authUser.password,
            },
            validateStatus: (status) => status === 201 || status === 400,
        })
        .then(response => {
            if(response.status === 201){
                this.props.history.push("/")
            } else if (response.status === 400) { //either invalid/missing info
                this.setState({ errors: response.data.errors })
            }
        })
        .catch(error => console.log(error))
    }


    render(){
        const { isAuth, authUser } = this.context
        const { title, description, estimatedTime, materialsNeeded, errors } = this.state
        return (
            <div className="createCourse--wrapper">
                    <h2>Create Course</h2>
                    <ul className="errors">{errors ? errors.map((error,index) => error ? <li key={index}>{error}</li>: null) : null}</ul>
                    <form onSubmit={this.handleSubmit}>
                        <div className="createCourse">
                            <div className="createCourse--left">
                                <p>Course</p>
                                <input type="text" id="title" name="title" placeholder="Course title..." 
                                    value={title} onChange={this.handleChange}/>

                                <p>By {isAuth ? authUser.firstName : 'N/A'}</p>

                                <textarea type="text" id="description" name="description" placeholder="Course description..." 
                                    value={description} onChange={this.handleChange}></textarea>
                            </div>
                            <div className="createCourse--right">
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
                        <button name="create" type="submit" className="createCourse--button">Create Course</button>
                    </form>
                    <button name="cancel" onClick={this.handleCancel} className="createCourse--button">Cancel</button>
            </div>
        )
    }
}
CreateCourse.contextType = AuthContext

export default CreateCourse