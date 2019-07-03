import React from 'react'
//router
import { Link } from 'react-router-dom'

const CourseItem = ({id, title}) => {
    return (
        <Link className="courses--courseItem" to={`/courses/${id}`}>
            <h4 className="courses--courseItem--heading">Course</h4>
            <h3 className="courses--courseItem--title">{title}</h3>
        </Link>
    )
}

export default CourseItem