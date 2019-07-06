/**
 * This component provides the "Sign Up" screen by rendering a form 
 * that allows a user to sign up by creating a new account. The component 
 * also renders a "Sign Up" button that when clicked sends a POST 
 * request to the REST API's /api/users route and signs in the user. 
 * This component also renders a "Cancel" button that returns the user 
 * to the default route (i.e. the list of courses)
 * STATEFUL COMPONENT
 */
import React, { Component } from 'react'
import { createUser } from './api'
//router
import { Link } from 'react-router-dom'
//context
import { AuthContext } from './context'


class UserSignUp extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
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

    handleCancel = (e) => {
        this.props.history.push("/")
    }

    handleSubmit = (e) => {
        e.preventDefault() //Prevent Page Reload

        const { actions } = this.context
        const { firstName, lastName, emailAddress, password } = this.state

        const newUser = {
            firstName,
            lastName,
            emailAddress,
            password,
        }

        createUser(newUser)
        .then(() => {
            actions.signIn(newUser.emailAddress, newUser.password)
            .then(() => this.props.history.push("/"))
            .catch(error => {
                if(error === 401){ // 401 - Authentication Failed
                    console.error('Login Failed')
                } else { // 500 - Internal Server Error
                    this.props.history.push("/error")
                }
            })
        })
        .catch(error => {
            if(error.status === 400){ // 400 - Bad Request
                this.setState({ errors: error.data.errors })
            } else { // 500 - Internal Server Error
                this.props.history.push("/error")
            }
        })
    }


    render(){
        const { firstName, lastName, emailAddress, password, errors } = this.state
        return (
            <div className="signUpForm--wrapper">
                <div className="signUpForm">
                    <h2>Sign Up</h2>
                    { errors ? 
                        <ul className="signUpForm--errors">{errors.map((error, index) => error ? <li key={index}>{error}</li> : null)}</ul>
                        : 
                        null 
                    }
                    <form className="signUpForm--form" onSubmit={this.handleSubmit}>
                        <input type="text" className="signUpForm--input" name="firstName" id="firstName" placeholder="First Name"
                            value={firstName} onChange={this.handleChange} />

                        <input type="text" className="signUpForm--input" name="lastName" id="lastName" placeholder="Last Name"
                            value={lastName} onChange={this.handleChange} />

                        <input type="text" className="signUpForm--input" name="emailAddress" id="emailAddress" placeholder="Email Address"
                            value={emailAddress} onChange={this.handleChange} />

                        <input type="password" className="signUpForm--input" name="password" id="password" placeholder="Password"
                            value={password} onChange={this.handleChange} />
                            
                        <button className="signUpForm--button--submit" type="submit">Sign Up</button>
                    </form>
                    <button className="signUpForm--button--cancel" onClick={this.handleCancel}>Cancel</button>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}
UserSignUp.contextType = AuthContext

export default UserSignUp