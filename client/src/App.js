import React from 'react';
//router
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//components
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import UserSignIn from './components/UserSignIn'
import UserSignUp from './components/UserSignUp'
import UserSignOut from './components/UserSignOut'
import UnhandledError from './components/misc/UnhandledError'
import NotFound from './components/misc/NotFound'
import Forbidden from './components/misc/Forbidden'
import PrivateRoute from './components/misc/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component={Header}/>
        <hr/>
        <Switch>
          <Route exact path="/" component={Courses}/>
          <PrivateRoute exact path="/courses/create" component={CreateCourse}/>
          <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse}/>
          <Route exact path="/courses/:id" component={CourseDetail}/>
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut}/>
          <Route path="/error" component={UnhandledError}/>          
          <Route path="/forbidden" component={Forbidden}/>    
          <Route component={NotFound}/>      
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
