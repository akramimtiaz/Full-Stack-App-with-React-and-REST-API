import React, { Component, createContext } from 'react'
import axios from 'axios'
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

    signIn = (username, password) => {
        axios({
            url: 'http://localhost:5000/api/users',
            method: 'get',
            auth: {
                username: username,
                password: password,
            },
            responseType: 'json',
        })
        .then(response => {
            if(response.status === 200){ //sign-in successful
                this.setState({
                    isAuth: true,
                    authUser: response.data 
                })
            }
        })
        .catch(error => console.error(error))
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
