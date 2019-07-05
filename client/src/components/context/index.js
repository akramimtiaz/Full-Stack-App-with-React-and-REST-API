import React, { Component, createContext } from 'react'
//import axios from 'axios'
//router
// import { Link, Redirect } from 'react-router-dom'

export const AuthContext = createContext()

export class Provider extends Component {
    constructor() {
        super()
        this.state = {
            isAuth: false,
            authUser: null,
        }
     }

    signIn = (user, password) => {
        this.setState({
            isAuth: true,
            authUser: {...user, password},
        })
    }

    signOut = () => {
         this.setState({
             isAuth: false,
             authUser: null,
         })
     }

    render() {
        return(
            <AuthContext.Provider value={{
                isAuth: this.state.isAuth,
                authUser: this.state.authUser,
                actions: {
                    signIn: this.signIn,
                    signOut: this.signOut,
                }
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export const Consumer = AuthContext.Consumer
