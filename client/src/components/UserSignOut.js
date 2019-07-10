import React, { useContext } from 'react'
//context
import { AuthContext } from './context'
//router
import { Redirect } from 'react-router-dom'

const UserSignOut = () => {
    const context = useContext(AuthContext)
    context.actions.signOut()
    return (
        <Redirect to="/"/>
    )
}

export default UserSignOut