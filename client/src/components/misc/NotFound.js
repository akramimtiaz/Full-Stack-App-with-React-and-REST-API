import React from 'react'
//router
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="bounds">
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <Link to="/">Return</Link>
        </div>
    )
}

export default NotFound