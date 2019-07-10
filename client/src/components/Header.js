import React from 'react'
//router
import { Link } from 'react-router-dom'
//context
import { Consumer } from './context'

const Header = () => {
    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>
                    <Consumer>
                        {context => 
                            {
                                return context.isAuth ? 
                                    <React.Fragment>
                                        <span>{`Welcome ${context.authUser.firstName} ${context.authUser.lastName}!`}</span>
                                        <Link className="signout" to="/signout">Sign Out</Link>
                                    </React.Fragment>
                                    : 
                                    <React.Fragment>
                                        <Link className="signup" to="/signup">Sign Up</Link>
                                        <Link className="signin" to="/signin">Sign In</Link>
                                    </React.Fragment>
                            }
                        }
                    </Consumer>
                </nav>
            </div>
        </div>
    )
}

export default Header