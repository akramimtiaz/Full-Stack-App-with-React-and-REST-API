import React from 'react'

const CourseForm = ({title, description, estimatedTime, materialsNeeded, errors, 
                    isAuth, authUser, page,
                    handleChange, handleCancel, handleSubmit}) => {
    return (
        <div className="bounds course--detail">
            <h1>Create Course</h1>
            <div>
                {
                    errors ? 
                        <div>
                            <h2 className="validation--errors--label">Validation errors</h2>
                            <div className="validation-errors">
                                <ul>
                                    {errors.map((error,index) => error ? <li key={index}>{error}</li>: null)} 
                                </ul>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div>
                            <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                                value={title} onChange={handleChange} />
                        </div>
                        <p>By {isAuth ? authUser.firstName : 'N/A'}</p>
                    </div>
                    <div className="course--description">
                        <div>
                            <textarea id="description" name="description" className="" placeholder="Course description..."
                                value={description} onChange={handleChange}></textarea>
                        </div>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <div>
                                    <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" 
                                        value={estimatedTime} onChange={handleChange} />
                                </div>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <div>
                                    <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."
                                        value={materialsNeeded} onChange={handleChange}></textarea>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">{page} Course</button>
                    <button className="button button-secondary" name="cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
 
export default CourseForm