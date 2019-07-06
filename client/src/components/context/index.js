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

    // signIn = (username, password) => {
    //     axios({
    //         url: 'http://localhost:5000/api/users',
    //         method: 'get',
    //         auth: {
    //             username: username,
    //             password: password,
    //         },
    //         validateStatus: status => status === 200 || status === 401,
    //         responseType: 'json',
    //     })
    //     .then(response => {
    //         if(response.status === 200){ //sign-in successful
    //             this.setState({
    //                 isAuth: true,
    //                 authUser: {...response.data, password},
    //             })
    //         } else if (response.satus === 401){ //sign-in failed
    //             throw response.data
    //         }
    //     })
    //     .catch(error => console.error(error))
    // }
    signIn = (email, password) => {
        return new Promise((resolve, reject) => {
            axios({
                url: 'http://localhost:5000/api/users',
                method: 'get',
                auth: {
                    username: email,
                    password: password,
                },
                validateStatus: status => status === 200 || status === 401,
                responseType: 'json',
            })
            .then(response => {
                if(response.status === 200){
                    this.setState({
                        isAuth: true,
                        authUser: {...response.data, password},
                    })
                    resolve(true) //resolve the promise
                } else if (response.status === 401){
                    throw response.data
                }
            })
            .catch(error => {
                console.error(error)
                reject(false) //reject the promise
            })
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
