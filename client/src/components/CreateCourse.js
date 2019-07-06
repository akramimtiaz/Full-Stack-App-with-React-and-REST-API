import React, { Component } from 'react'
//context
import { AuthContext } from './context'
//api request
import { createCourse } from './api'

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