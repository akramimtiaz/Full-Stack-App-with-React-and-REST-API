import React from 'react'
//router
import { Link } from 'react-router-dom'

const UnhandledError = () => {
    return( 
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
            <Link to="/">Return</Link>
        </div>
    )
}

export default UnhandledError