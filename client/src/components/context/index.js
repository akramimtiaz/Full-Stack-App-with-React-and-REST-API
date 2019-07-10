import React, { Component, createContext } from 'react'
import { getUser } from '../api'

export const AuthContext = createContext()

export class Provider extends Component {

    constructor(){
        super()
        this.state = {
            isAuth: localStorage.getItem('isAuth'),
            authUser: JSON.parse(localStorage.getItem('authUser')),
        }
    }

    signIn = (email, password) => {
        return new Promise((resolve, reject) => {
            getUser(email, password)
            .then(data => {
                this.setState({ isAuth: true, authUser: data })
                localStorage.setItem('isAuth', true)
                localStorage.setItem('authUser', JSON.stringify(data))
                resolve(true) 
            })
            .catch(error => reject(error))
        })
    }

    signOut = () => {
        this.setState({ isAuth: false, authUser: null })
        localStorage.setItem('isAuth', false)
        localStorage.setItem('authUser', null)
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
