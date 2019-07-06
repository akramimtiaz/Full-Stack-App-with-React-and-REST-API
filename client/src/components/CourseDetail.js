/**
 * This component provides the "Course Detail" screen by retrieving 
 * the detail for a course from the REST API's /api/courses/:id route 
 * and rendering the course. The component also renders a "Delete Course" button 
 * that when clicked should send a DELETE request to the REST API's /api/courses/:id route 
 * in order to delete a course. This component also renders an "Update Course" button for 
 * navigating to the "Update Course" screen.
 * STATEFUL COMPONENT
 */

import React, { Component } from 'react'
import { getCourse } from './api'
//context
import { AuthContext } from './context'
//components
import ActionBar from './misc/ActionBar'

class CourseDetail extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: false,
            course: null,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.setState({ isLoading: true })

        getCourse(id)
        .then(data => {
            this.setState({
                isLoading: false,
                course: data,
            })
        })
        .catch(error => { // 404 - Course with Provided ID not Found
            if(error === 404){
                this.props.history.push("/notfound")
            } else { // 500 - Server Error
                this.props.history.push("/error")
            }
        })
    }

    render(){ 
        const { isLoading, course } = this.state
        return (
            <React.Fragment>
                <ActionBar courseOwnerId={course ? course.User.id : null} {...this.props}/>
                <div className="courseDetail--wrapper">
                    <div className="courseDetail">
                        {
                            isLoading || course === null ? 
                            <h3>Loading</h3>
                            :
                            <React.Fragment>
                                <div className="courseDetail--left">
                                    <div>
                                        <h4>Course</h4>
                                        <h3>{course.title}</h3>
                                        <p className="courseDetail--left--author">{`By ${course.User.firstName} ${course.User.lastName}`}</p>
                                    </div>
                                    <div>
                                        {course.description.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                                    </div>
                                </div>
                                <div className="courseDetail--right">
                                    <div>
                                        <h4>Estimated Time</h4>
                                        <h3>
                                        {course.estimatedTime ? course.estimatedTime : 'N/A'}
                                        </h3>
                                    </div>
                                    <div>   
                                        <h4>Materials Needed</h4>
                                        <ul>
                                            { course.materialsNeeded ?
                                                course.materialsNeeded.split('\n').map((material, index) => material ? <li key={index}>{material.slice(1)}</li> : null)
                                                :
                                                <li>N/A</li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
CourseDetail.contextType = AuthContext

export default CourseDetail