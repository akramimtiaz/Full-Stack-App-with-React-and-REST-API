import React, { useContext } from 'react'
//context
import { Consumer, AuthContext } from './context'
//router
import { Redirect } from 'react-router-dom'

const UserSignOut = () => {
    const auth = useContext(AuthContext)
    console.log(auth)
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