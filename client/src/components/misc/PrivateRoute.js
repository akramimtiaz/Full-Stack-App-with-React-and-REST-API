import React from 'react'
//router
import { Route, Redirect } from 'react-router-dom'
//context
import { Consumer } from '../context'

const PrivateRoute = ({ component: Component, ...rest }) => {
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