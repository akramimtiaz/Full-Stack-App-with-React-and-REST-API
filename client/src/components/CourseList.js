import React, { Component } from 'react'
import CourseItem  from './CourseItem'
import AddCourse from './AddCourse'

class CourseList extends Component {
    constructor() {
        super()
        this.state = {
            courses: [],
            isLoading: false
        }
    }

    componentDidMount() {
      this.setState({ isLoading: true })

      fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => this.setState({
          courses: data,
          isLoading: false
      }))
    }

    render() {

        let courseItems = this.state.courses.map(course => {
            return (
                <CourseItem key={course.id} title={course.title} /> 
            )
        }) // pass link property to form URL 

        return(
            <div className="bounds">
                { this.state.isLoading ? 
                    <h3>Loading Courses</h3> : 
                    [...courseItems, <AddCourse key={courseItems.length+1}/>] 
                }
            </div>    
        )
    }

}

export default CourseList