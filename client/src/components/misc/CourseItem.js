import React from 'react'

const CourseItem = (props) => {
    return (
        <div className="courses--courseItem">
            <h4 className="courses--courseItem--heading">Course</h4>
            <h3 className="courses--courseItem--title">{props.title}</h3>
        </div>
    )
}

export default CourseItem