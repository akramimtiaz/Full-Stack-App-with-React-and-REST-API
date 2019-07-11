import React from 'react'
//router
import { Route, Redirect } from 'react-router-dom'
//context
import { Consumer } from '../context'

const PrivateRoute = ({ component: Component, ...rest }) => {
    //If the User is Authenticated, Display the Component, Else, Redirect User to Sign-In Page
    return(
        <Consumer>
        {
          ({isAuth}) => {
            return(
              <Route
                {...rest}
                render = {
                  props => 
                      isAuth ? 
                      ( <Component {...props}/> )
                      :
                      ( <Redirect to={{
                          pathname: '/signin',
                          state: { from: props.location }
                        }}/>
                      )
                }
              />
            ) //end of Route
          }
        }
        </Consumer>
    )
  }


export default PrivateRoute