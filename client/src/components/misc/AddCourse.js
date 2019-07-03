import React from 'react'
//router
import { Link } from 'react-router-dom'

const AddCourse = () => {
    return(
        <Link className="courses--addCourse" to="/courses/create">
            <h4 className="courses--addCourse--title">＋ New Course</h4>
        </Link>
    )
}

export default AddCourse