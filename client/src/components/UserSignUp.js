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



    render(){
        return (
            <div className="">

            </div>
        )
    }
}

export default UserSignUp