import React, { Component } from 'react'
//api request
import { getCourses } from './api'
//components
import CourseItem from './misc/CourseItem'
import AddCourse from './misc/AddCourse'


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
        .then(data => this.setState({ //Courses were Successfully Retrieved
            isLoading: false,
            courses: data
        }))
        .catch(() => this.props.history.push("/error")) //500 - Internal Server Error
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
            <div className="bounds">
                {
                    isLoading ? 
                        <h3>Loading...</h3> : courseItems
                }
                <AddCourse/>
            </div> 
        )
    }
}

export default Courses