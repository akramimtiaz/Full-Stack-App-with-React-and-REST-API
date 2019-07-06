/**
 * This component is a bit of an oddball as 
 * it doesn't render any visual elements. Instead, 
 * it signs out the authenticated user and redirects 
 * the user to the default route (i.e. the list of courses).
 * FUNCTIONAL COMPONENT
 */
import React from 'react'
//context
import { Consumer } from './context'
//router
import { Redirect } from 'react-router-dom'

const UserSignOut = () => {
    return (
        <Consumer>
            {
                context => {
                    context.actions.signOut()
                    return (<Redirect to="/" />)
                }
            }
        </Consumer>
    )
}

export default UserSignOut