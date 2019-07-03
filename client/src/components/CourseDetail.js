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
import axios from 'axios'
//context
import { AuthContext } from './context'

class CourseDetail extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: false,
            course: null,
        }
    }

    componentDidMount() {
        const courseId = this.props.match.params.id
        this.setState({ isLoading: true })

        axios({
            url: `http://localhost:5000/api/courses/${courseId}`,
            method: 'get',
            responseType: 'json',
        })
        .then(response => {
            if(response.status === 200){ //request successful
                this.setState({
                    isLoading: false,
                    course: response.data,
                })
                console.log(response.data) //remove
            }
        })
        .catch(error => {
            console.log(error)
            this.props.history.push('/notfound'); 
        }) 
    }

    render(){ 
        const { isLoading, course } = this.state
        return (
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
        )
    }
}
CourseDetail.contextType = AuthContext

export default CourseDetail