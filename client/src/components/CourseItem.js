import React from 'react'

const CourseItem = (props) => {
    return(
        <div className="grid-33">
            <a className="course--module course--link" href="#">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{props.title}</h3>
            </a>
        </div>
    )
}

export default CourseItem