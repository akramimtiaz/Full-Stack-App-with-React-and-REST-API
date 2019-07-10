import React, { Component } from 'react'
import { deleteCourse } from '../api'
//context
import { AuthContext } from '../context'

class ActionBar extends Component {
    
    delete = (id) => {
        const { authUser } = this.context
        
        deleteCourse(id, authUser)
        .then(() => this.props.history.push("/")) //Deletion was Successful, Return to Course List
        .catch(error => {
            if(error === 403){ // 403 - Authenticated User Does NOT Own The Course Therefore Access Is Forbidden
                this.props.history.push("/forbidden")
            } else { // 500 - Internal Server Error
                this.props.history.push("/error")
            }
        })
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
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        {
                            isAuth && authUser.id === courseOwnerId ? 
                                <span>
                                    <button name="update" className="button" onClick={this.handleClick}>Update Course</button>
                                    <button name="delete" className="button" onClick={this.handleClick}>Delete Course</button>
                                </span>
                                :
                                null
                        }
                        <button name="return" className="button button-secondary" onClick={this.handleClick}>Return to List</button>
                    </div>
                </div>
            </div>
        )
    }
}
ActionBar.contextType = AuthContext

export default ActionBar