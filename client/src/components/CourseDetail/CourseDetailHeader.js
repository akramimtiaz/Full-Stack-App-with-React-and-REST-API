import React from 'react'

const CourseDetailHeader = ({ title, description, User }) => {
    return (
        <div className="grid-66">
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
                <p>{User ? `By ${User.firstName} ${User.lastName}` : null}</p>
            </div>
            <div className="course--description">
                {description ? 
                    description.split('\n').map(section => <p>{section}</p>)
                    :
                    <p>No Description Available</p>
                }
            </div>
        </div>
    )
}

export default CourseDetailHeader