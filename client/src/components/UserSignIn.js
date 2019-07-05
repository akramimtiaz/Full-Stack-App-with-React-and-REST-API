/**
 * This component provides the "Sign In" screen by rendering 
 * a form that allows a user to sign using their existing account 
 * information. The component also renders a "Sign In" button that when clicked signs in
 * the user and a "Cancel" button that returns the user to the default route.
 * STATEFUL COMPONENT
 */
import React, { Component } from 'react'
import axios from 'axios'
//router
import { Link } from 'react-router-dom'
//context
import { AuthContext } from './context' 


class UserSignIn extends Component {
    constructor() {
        super()
        this.state = {
            emailAddress: '',
            password: '',
            errors: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (e) => { //this function is used by the cancel button
        this.props.history.push("/")
    }

    handleSubmit = (e) => {
        e.preventDefault() //prevent page reload

        const { emailAddress, password } = this.state
        if(emailAddress && password){
            this.setState({ errors: null })
            axios({
                url: 'http://localhost:5000/api/users',
                method: 'get',
                auth: {
                    username: emailAddress,
                    password: password,
                },
                validateStatus: (status) => status === 200 || status === 401,
                responseType: 'json',
            })
            .then(response => {
                if(response.status === 200){ //sign-in successful
                    this.context.actions.signIn(response.data, password) //persist user data to global state (context)
                } else if (response.status === 401){
                    this.setState({ errors: 'User not Found'})
                    throw new Error('Sign-in Failed')
                }
            })
            .then(() => this.props.history.push("/")) //if sign-in was successful redirect to home-page
            .catch(error => console.error(error))
        } else {
            this.setState({ errors: 'Email Address and Password are Required' }) //if either the password or email fields are empty
        }
    }

    render(){
        const { errors } = this.state
        return (
            <div className="signInForm--wrapper">
                <div className="signInForm">   
                    <h2>Sign In</h2>
                    { errors ? <div className="signInForm--errors">{errors}</div> : null }
                    <form className="signInForm--form" onSubmit={this.handleSubmit}>
                        <input type="text" id="emailAddress" name="emailAddress" placeholder="Email Address" className="signInForm--emailAddress"
                            value={this.state.emailAddress} onChange={this.handleChange} />                  
                        <input type="password" id="password" name="password" placeholder="Password" className="signInForm--password"
                            value={this.state.password} onChange={this.handleChange} />
                        <button type="submit" name="submit" className="signInForm--button--submit">Sign In</button>
                    </form>
                    <button name="cancel" className="signInForm--button--cancel" onClick={this.handleClick}>Cancel</button>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}
UserSignIn.contextType = AuthContext

export default UserSignIn