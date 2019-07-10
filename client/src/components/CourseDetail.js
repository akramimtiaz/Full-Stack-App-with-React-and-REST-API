import React, { Component } from 'react'
//api request
import { getCourse } from './api'
//components
import ActionBar from './misc/ActionBar'
import CourseDetailHeader from './misc/CourseDetailHeader'
import CourseDetailStats from './misc/CourseDetailStats'

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
            <div>
                <ActionBar courseOwnerId={course ? course.User.id : null} {...this.props}/>
                {
                    isLoading || course === null ? 
                    null
                    :
                    <div className="bounds course--detail">
                        <CourseDetailHeader 
                            title={course.title} 
                            description={course.description} 
                            user={course.User} 
                        />
                        <CourseDetailStats 
                            estimatedTime={course.estimatedTime} 
                            materialsNeeded={course.materialsNeeded}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default CourseDetail