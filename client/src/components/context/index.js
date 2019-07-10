import React, { Component, createContext } from 'react'
import { getUser } from '../api'

export const AuthContext = createContext()

export class Provider extends Component {

    signIn = (email, password) => {
        return new Promise((resolve, reject) => {
            getUser(email, password)
            .then(data => {
                localStorage.setItem('isAuth', true)
                localStorage.setItem('authUser', JSON.stringify(data))
                resolve(true) 
            })
            .catch(error => reject(error))
        })
    }

    signOut = () => {
        localStorage.setItem('isAuth', false)
        localStorage.setItem('authUser', null)
     }

    render() {
        return(
            <AuthContext.Provider value={{
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
