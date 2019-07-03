import React from 'react';
//router
import { BrowserRouter, Route } from 'react-router-dom'
//components
import Courses from './components/Courses'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Courses}/>
      </div>
    </BrowserRouter>
  )
}

export default App;
