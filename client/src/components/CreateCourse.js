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

class CreateCourse extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: '',
            estimatedTime: '',
            materialsNeeded: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
    }

    handleCancel = (e) => {
        this.props.history.push("/")
    }

    render(){
        const { isAuth, authUser } = this.context
        return (
            <div className="createCourse--wrapper">
                <div className="createCourse">
                    <form onSubmit={this.handleSubmit}>
                        <div className="createCourse--left">
                            <p>Course</p>
                            <input type="text" name="title" placeholder="Course title..." value={this.state.title} onChange={this.handleChange}/>
                            <p>By {isAuth ? authUser.firstName : 'N/A'}</p>
                            <textarea type="text" name="description" placeholder="Course description..." 
                            value={this.state.description} onChange={this.handleChange}></textarea>
                        </div>
                        <div className="createCourse--right">
                            <div>Estimated Time<br/>
                                <textarea type="text" name="estimatedTime" id="estimatedTime" placeholder="Hours..." 
                                 value={this.state.estimatedTime} onChange={this.handleChange}></textarea>
                            </div>
                            <div>Materials Needed<br/>
                                <textarea type="text" name="materialsNeeded" id="materialsNeeded" placeholder="List Materials..." 
                                 value={this.state.materialsNeeded} onChange={this.handleChange}></textarea>
                            </div>
                        </div>
                            <button name="update" type="submit" className="createCourse--button">Update</button>
                    </form>
                    <button name="cancel" onClick={this.handleCancel} className="createCourse--button">Cancel</button>
                </div>
            </div>
        )
    }
}
CreateCourse.contextType = AuthContext

export default CreateCourse