import React from 'react'
//router
import { Link } from 'react-router-dom'

const UnhandledError = () => {
    return( 
        <div className="errorPage--wrapper">
            <div className="errorPage">
                <h2>Error</h2>
                <p>Sorry! we just encountered an unexpected error.</p>
                <Link to="/">Return</Link>
            </div>
        </div>
    )
}

export default UnhandledError