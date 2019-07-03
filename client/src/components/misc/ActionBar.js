import React, { Component } from 'react'
import axios from 'axios'
//context
import { AuthContext } from '../context'

class ActionBar extends Component {
    
    delete = (id) => {
        const { authUser } = this.context
        axios({
            url: `http://localhost:5000/api/courses/${id}`,
            method: 'delete',
            auth: {
                username: authUser.emailAddress,
                password: authUser.password,
            },
        })
        .then(response => {
            if(response.status === 204){
                this.props.history.push("/") //NEEDS TO BE CHANGED
            }
        })
        .catch(error => console.log(error))
    }
    
    handleClick = (e) => {
        const button = e.target.name
        const courseId = this.props.match.params.id

        if(button === "update"){
            this.props.history.push(`/courses/${courseId}/update`)
        } else if (button === "return"){
            this.props.history.push("/")
        } else if (button === "delete"){
            this.delete(courseId)
        }
    }

    render() {
        const courseOwnerId = parseInt(this.props.courseOwnerId)
        const { isAuth, authUser } = this.context
        return (
            <div className="actionBar--wrapper">
                <div className="actionBar">
                    {
                        isAuth && authUser.id === courseOwnerId ? 
                            <React.Fragment>
                                <button name="update" className="actionBar--button" onClick={this.handleClick}>Update Course</button>
                                <button name="delete" className="actionBar--button" onClick={this.handleClick}>Delete Course</button>
                            </React.Fragment>
                            :
                            null
                    }
                    <button name="return" className="actionBar--button" onClick={this.handleClick}>Return to List</button>
                </div>
            </div>
        )
    }
}
ActionBar.contextType = AuthContext

export default ActionBar