import React, { useContext } from 'react'
//context
import { AuthContext } from './context'
//router
import { Redirect } from 'react-router-dom'

const UserSignOut = () => {
    const context = useContext(AuthContext)
    context.actions.signOut() //Signout User and Redirect User to Index
    return (
        <Redirect to="/"/>
    )
}

export default UserSignOut