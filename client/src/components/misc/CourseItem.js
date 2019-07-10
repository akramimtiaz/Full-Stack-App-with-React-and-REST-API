import React from 'react'
//router
import { Link } from 'react-router-dom'

const CourseItem = ({id, title}) => {
    return (
        <div className="grid-33">
            <Link className="course--module course--link" to={`/courses/${id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
            </Link>
        </div>
    )
}

export default CourseItem