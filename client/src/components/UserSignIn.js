import React, { Component } from 'react'
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

    handleCancel = (e) => { 
        this.props.history.push("/") //returns user to index page
    }

    handleSubmit = (e) => {
        e.preventDefault() //prevent page reload

        const { emailAddress, password } = this.state
        const { actions } = this.context 
        const { from } = this.props.location.state || { from: { pathname: '/' } }

        if(emailAddress && password){
            this.setState({ errors: null })
            
            actions.signIn(emailAddress, password)
            .then(() => this.props.history.push(from))
            .catch((error) => {
                if(error === 401){ // 401 - Authentication Failed
                    this.setState({ errors: 'User Not Found' })
                } else { // 500 - Internal Server Error
                    this.props.history.push("/error")
                }
            })
        } else {
            this.setState({ errors: 'Email Address and Password are Required' }) //if either the password or email fields are empty
        }
    }

    render(){
        const { emailAddress, password, errors } = this.state
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    { errors ? <div className="signInForm--errors">{errors}</div> : null }
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" 
                                    value={emailAddress} onChange={this.handleChange} />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" placeholder="Password"
                                    value={password} onChange={this.handleChange} />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                            </div>
                        </form>
                        
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}
UserSignIn.contextType = AuthContext

export default UserSignIn