import React from 'react';
//router
import { BrowserRouter, Route } from 'react-router-dom'
//components
import Header from './components/Header'
import Courses from './components/Courses'
import CourseDetail from './components/CourseDetail'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component={Header}/>
        <Route exact path="/" component={Courses}/>
        <Route exact path="/courses/:id" component={CourseDetail}/>
      </div>
    </BrowserRouter>
  )
}

export default App;
