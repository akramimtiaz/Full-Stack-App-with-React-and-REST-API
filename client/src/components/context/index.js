import React, { Component, createContext } from 'react'
import { getUser } from '../api'

export const AuthContext = createContext()

export class Provider extends Component {
    constructor() {
        super()
        this.state = {
            isAuth: false,
            authUser: null,
        }
     }

    signIn = (email, password) => {
        return new Promise((resolve, reject) => {
            getUser(email, password)
            .then(data => {
                this.setState({
                    isAuth: true,
                    authUser: data,
                })
                resolve(true) 
            })
            .catch(error => reject(error))
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
