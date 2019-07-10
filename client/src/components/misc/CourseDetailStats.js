import React from 'react'

const CourseDetailStats = ({ estimatedTime, materialsNeeded }) => {
    return (
        <div className="grid-25 grid-right">
            <div className="course--stats">
                <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{estimatedTime ? estimatedTime : 'N/A'}</h3>
                    </li>
                    <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>
                            { materialsNeeded ?
                                materialsNeeded.split('\n').map((material, index) => material ? <li key={index}>{material.slice(1)}</li> : null)
                                :
                                <li>N/A</li>
                            }
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CourseDetailStats