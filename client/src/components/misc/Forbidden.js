import React from 'react'
//router
import { Link } from 'react-router-dom'

const Forbidden = () => {
    return (
        <div className="errorPage--wrapper">
            <div className="errorPage">
                <h2>Forbidden</h2>
                <p>Oh oh! You can't access this page.</p>
                <Link to="/">Return</Link>
            </div>
        </div>
    )
}

export default Forbidden