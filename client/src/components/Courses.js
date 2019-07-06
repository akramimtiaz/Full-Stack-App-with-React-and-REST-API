/**
 * This component provides the "Courses" screen by retrieving the list of courses 
 * from the REST API's /api/courses route and rendering a list of courses. 
 * Each course needs to link to its respective "Course Detail" screen. 
 * This component also renders a link to the "Create Course" screen.
 * STATEFUL COMPONENT
 * */

import React, { Component } from 'react'
//context
import { AuthContext } from './context'
//components
import CourseItem from './misc/CourseItem'
import AddCourse from './misc/AddCourse'
import { getCourses } from './api'

class Courses extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            courses: [],
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })

        getCourses()
        .then(data => this.setState({
            isLoading: false,
            courses: data
        }))
        .catch(() => this.props.history.push("/error"))
    }

    render(){
        const {isLoading, courses} = this.state
        let courseItems

        if(courses.length > 0){
            courseItems = courses.map(course => <CourseItem key={course.id} {...course}/>)
        }else{
            courseItems = <h3>No Courses Exist</h3>
        }   
        
        return (
            <div className="courses--wrapper">
                <div className="courses">
                    {
                        isLoading ? 
                            <h3>Loading...</h3> : courseItems
                    }
                    <AddCourse/>
                </div>
            </div>   
        )
    }
}
Courses.contextType = AuthContext

export default Courses