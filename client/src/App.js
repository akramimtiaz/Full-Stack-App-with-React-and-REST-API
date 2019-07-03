import React from 'react';
//router
import { BrowserRouter, Route, Switch } from 'react-router-dom'
//components
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'
import CreateCourse from './components/CreateCourse'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component={Header}/>
        <Switch>
          <Route exact path="/" component={Courses}/>
          <Route exact path="/courses/create" component={CreateCourse}/>
          <Route path="/courses/:id" component={CourseDetail}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
