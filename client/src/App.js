import React, { Component } from 'react';

class App extends Component {
  constructor(){
      super()
      this.state = {
          courses: [],
          isLoading: false
      }
  }

  componentDidMount(){
      this.setState({ isLoading: true })

      fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => this.setState({
        courses: data,
        isLoading: false
      }))
  }

  render(){

      const courseItems = this.state.courses.map(course => {
        return (
          <div key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </div>
        )
      })

      return(
          <div>
              { this.state.isLoading ? <h3>Loading</h3> : courseItems }
          </div>
      )
  }
}

/**
 * 
 * 
 * 
 */

export default App;
