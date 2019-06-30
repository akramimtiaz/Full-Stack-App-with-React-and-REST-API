import React from 'react'
import ActionBar from './ActionBar'
import CourseDetailHeader from './CourseDetailHeader'
import CourseDetailStats from './CourseDetailStats'

class CourseDetail extends React.Component {
    constructor() {
        super()
        this.state = {
            courseInfo: {},
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })

        fetch(`http://localhost:5000/api/courses/${this.props.id}`)
        .then(response => response.json())
        .then(data => this.setState({
            courseInfo: data,
            isLoading: false
        }))
    }

    render() {
        return(
            <div>
                {
                    this.state.isLoading ? 
                    null 
                    : 
                    <React.Fragment>
                        <ActionBar />
                        <div className="bounds course--detail">
                            <CourseDetailHeader {...this.state.courseInfo}/>
                            <CourseDetailStats {...this.state.courseInfo} />
                        </div>
                    </React.Fragment>   
                }
            </div>
        )
    }
}


export default CourseDetail