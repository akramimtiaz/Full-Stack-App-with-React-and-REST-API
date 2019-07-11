import React, { Component } from 'react'
//api request
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
            confirmPassword: '',
            errors: null,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCancel = (e) => {
        this.props.history.push("/") //returns user to index page
    }

    handleSubmit = (e) => {
        e.preventDefault() //Prevent Page Reload

        const { actions } = this.context
        const { firstName, lastName, emailAddress, password, confirmPassword } = this.state

        const newUser = {
            firstName,
            lastName,
            emailAddress,
            password,
        }

        if(password === confirmPassword){
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
        } else { //passwords don't match
            this.setState({ errors: ['It appears the passwords do not match'] })
        }
    }


    render(){
        const { firstName, lastName, emailAddress, password, confirmPassword, errors } = this.state
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    { 
                        errors ? 
                            <ul>{errors.map((error, index) => error ? <li key={index}>{error}</li> : null)}</ul>
                            : 
                            null 
                    }
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input id="firstName" name="firstName" type="text" placeholder="First Name"
                                    value={firstName} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input id="lastName" name="lastName" type="text" placeholder="Last Name"
                                    value={lastName} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address"
                                    value={emailAddress} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" placeholder="Password"
                                    value={password} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password"
                                    value={confirmPassword} onChange={this.handleChange} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign Up</button>
                                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </form>                       
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        )
    }
}
UserSignUp.contextType = AuthContext

export default UserSignUp