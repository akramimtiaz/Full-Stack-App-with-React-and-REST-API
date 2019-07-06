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