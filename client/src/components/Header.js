/**
 * Displays the top menu bar for the application and includes buttons for signing in 
 * and signing up (if there's not an authenticated user) or the user's first and last name 
 * and a button for signing out (if there's an authenticated user).
 * FUNCTIONAL COMPONENT
 */
import React from 'react'
//router
import { Link } from 'react-router-dom'
//context
import { Consumer } from './context'

const Header = () => {
    return (
        <div className="header--wrapper">
            <div className="header">
                <div className="header--left">
                    <h2>Courses</h2>
                </div>
                <Consumer>
                    {context => 
                        {
                            return context.isAuth ? 
                                <div className="header--right"> {/*user signed-in*/}
                                    <span>{`Welcome ${context.authUser.firstName} ${context.authUser.lastName}!`}</span>
                                    <Link to="/signout">Sign Out</Link>
                                </div>
                                : 
                                <div className="header--right"> {/*user not signed-in*/}
                                    <Link to="/signup">Sign Up</Link>
                                    <Link to="/signin">Sign In</Link>
                                </div>
                        }
                    }
                </Consumer>
            </div>
        </div>
    )
}

export default Header