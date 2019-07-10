import React from 'react'
//router
import { Link } from 'react-router-dom'

const Header = () => {
    const isAuth = localStorage.getItem('isAuth')
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    console.log(isAuth, authUser)
    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    {
                        isAuth && authUser ? 
                            <React.Fragment>
                                <span>{`Welcome ${authUser.firstName} ${authUser.lastName}!`}</span>
                                <Link className="signout" to="/signout">Sign Out</Link>
                            </React.Fragment>
                            : 
                            <React.Fragment>
                                <Link className="signup" to="/signup">Sign Up</Link>
                                <Link className="signin" to="/signin">Sign In</Link>
                            </React.Fragment>
                    }
                </nav>
            </div>
        </div>
    )
}

export default Header