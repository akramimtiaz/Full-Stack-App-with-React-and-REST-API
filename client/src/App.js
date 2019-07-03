import React from 'react';
//router
import { BrowserRouter, Route } from 'react-router-dom'
//components
import Courses from './components/Courses'
import Header from './components/Header'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component={Header}/>
        <Route exact path="/" component={Courses}/>
      </div>
    </BrowserRouter>
  )
}

export default App;
