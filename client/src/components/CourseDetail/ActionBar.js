import React from 'react'

const ActionBar = () => {
    return(
        <div className="actions--bar">
            <div className="bounds">
                <div className="grid-100">
                    <span>
                        <a className="button" href="#">Update Course</a>
                        <a className="button" href="#">Delete Course</a>
                    </span>
                    <a className="button button-secondary">Return to List</a>
                </div>
            </div>
        </div>
    )
}

export default ActionBar