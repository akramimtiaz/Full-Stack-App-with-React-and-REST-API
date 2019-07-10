import React from 'react'

const CourseDetailHeader = ({ title, user, description }) => {
    return (
        <div className="grid-66">
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
                <p>{`By ${user.firstName} ${user.lastName}`}</p>
            </div>
            <div className="course--description">
                {description.split('\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
        </div>
    )
}

export default CourseDetailHeader