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

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component={Header}/>
        <Switch>
          <Route exact path="/" component={Courses}/>
          <Route exact path="/courses/create" component={CreateCourse}/>
          <Route exact path="/courses/:id/update" component={UpdateCourse}/>
          <Route path="/courses/:id" component={CourseDetail}/>
          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />
          <Route path="/signout" component={UserSignOut}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
