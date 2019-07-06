import React from 'react'
//router
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="errorPage--wrapper">
            <div className="errorPage">
                <h2>Not Found</h2>
                <p>Sorry! We couldn't find the page you're looking for</p>
                <Link to="/">Return</Link>
            </div>
        </div>
    )
}

export default NotFound